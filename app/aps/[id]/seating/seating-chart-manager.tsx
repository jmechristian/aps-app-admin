'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  assignRegistrantToTable,
  clearRegistrantTableAssignment,
} from '@/app/actions/seating';
import RegistrantPicker from '../registrant-picker';
import {
  APS_SEATING_CHART_ID,
  type SeatingAssignment,
  type SeatingRegistrantOption,
} from '@/lib/seating-chart';

type SeatingChartManagerProps = {
  eventId: string;
  initialAssignments: SeatingAssignment[];
  registrants: SeatingRegistrantOption[];
};

function fullName(input: {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}) {
  return `${input.firstName ?? ''} ${input.lastName ?? ''}`.trim() || input.email || 'Unknown';
}

export default function SeatingChartManager({
  eventId,
  initialAssignments,
  registrants,
}: SeatingChartManagerProps) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newTableRegistrantId, setNewTableRegistrantId] = useState('');
  const [draftTables, setDraftTables] = useState<number[]>([]);
  const [tableSelections, setTableSelections] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const assignmentByRegistrant = useMemo(() => {
    const map = new Map<string, SeatingAssignment>();
    for (const assignment of assignments) {
      map.set(assignment.registrantId, assignment);
    }
    return map;
  }, [assignments]);

  const tableNumbers = useMemo(() => {
    const fromAssignments = new Set(
      assignments.map((assignment) => assignment.tableNumber).filter((v): v is number => v != null)
    );
    for (const table of draftTables) fromAssignments.add(table);
    return Array.from(fromAssignments).sort((a, b) => a - b);
  }, [assignments, draftTables]);

  const grouped = useMemo(() => {
    const map = new Map<number, SeatingAssignment[]>();
    for (const tableNumber of tableNumbers) {
      map.set(tableNumber, []);
    }
    for (const assignment of assignments) {
      if (assignment.tableNumber == null) continue;
      const tableRows = map.get(assignment.tableNumber) ?? [];
      tableRows.push(assignment);
      map.set(assignment.tableNumber, tableRows);
    }
    for (const [tableNumber, rows] of map) {
      rows.sort((a, b) =>
        fullName(a).localeCompare(fullName(b), undefined, { sensitivity: 'base' })
      );
      map.set(tableNumber, rows);
    }
    return map;
  }, [assignments, tableNumbers]);

  const unassignedRegistrants = useMemo(
    () => registrants.filter((registrant) => !assignmentByRegistrant.has(registrant.id)),
    [registrants, assignmentByRegistrant]
  );

  function parseTableNumber(input: string) {
    const parsed = Number(input);
    if (!Number.isFinite(parsed) || parsed < 1) return null;
    return Math.floor(parsed);
  }

  function upsertLocalAssignment(params: {
    registrantId: string;
    tableNumber: number;
  }) {
    const registrant = registrants.find((item) => item.id === params.registrantId);
    if (!registrant) return;

    setAssignments((prev) => {
      const existing = prev.find((item) => item.registrantId === params.registrantId);
      const next: SeatingAssignment = {
        id: existing?.id ?? `local-${params.registrantId}`,
        registrantId: params.registrantId,
        firstName: registrant.firstName ?? null,
        lastName: registrant.lastName ?? null,
        company: registrant.companyName ?? null,
        email: registrant.email,
        role: registrant.attendeeType ?? null,
        tableNumber: params.tableNumber,
        seatingChartId: existing?.seatingChartId ?? APS_SEATING_CHART_ID,
      };

      const withoutRegistrant = prev.filter(
        (item) => item.registrantId !== params.registrantId
      );
      return [...withoutRegistrant, next].sort((a, b) => {
        const tableA = a.tableNumber ?? Number.MAX_SAFE_INTEGER;
        const tableB = b.tableNumber ?? Number.MAX_SAFE_INTEGER;
        if (tableA !== tableB) return tableA - tableB;
        return fullName(a).localeCompare(fullName(b), undefined, {
          sensitivity: 'base',
        });
      });
    });
  }

  function removeLocalAssignment(registrantId: string) {
    setAssignments((prev) => prev.filter((item) => item.registrantId !== registrantId));
  }

  function handleCreateTableAndAssign() {
    const parsedTable = parseTableNumber(newTableNumber);
    if (!parsedTable) {
      setError('Enter a valid table number.');
      return;
    }
    if (!newTableRegistrantId) {
      setError('Pick a registrant to assign.');
      return;
    }

    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await assignRegistrantToTable({
          eventId,
          registrantId: newTableRegistrantId,
          tableNumber: parsedTable,
        });
        upsertLocalAssignment({
          registrantId: newTableRegistrantId,
          tableNumber: parsedTable,
        });
        setDraftTables((prev) => prev.filter((table) => table !== parsedTable));
        setNewTableNumber('');
        setNewTableRegistrantId('');
        setMessage(`Assigned registrant to table ${parsedTable}.`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to assign registrant.');
      }
    });
  }

  function handleCreateEmptyTable() {
    const parsedTable = parseTableNumber(newTableNumber);
    if (!parsedTable) {
      setError('Enter a valid table number.');
      return;
    }
    setDraftTables((prev) =>
      prev.includes(parsedTable) ? prev : [...prev, parsedTable].sort((a, b) => a - b)
    );
    setNewTableNumber('');
    setError(null);
    setMessage(`Created table ${parsedTable}.`);
  }

  function handleAssignToExistingTable(tableNumber: number) {
    const registrantId = tableSelections[tableNumber];
    if (!registrantId) return;

    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await assignRegistrantToTable({ eventId, registrantId, tableNumber });
        upsertLocalAssignment({ registrantId, tableNumber });
        setDraftTables((prev) => prev.filter((table) => table !== tableNumber));
        setTableSelections((prev) => ({ ...prev, [tableNumber]: '' }));
        setMessage(`Assigned registrant to table ${tableNumber}.`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to assign registrant.');
      }
    });
  }

  function handleUnassign(registrantId: string) {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await clearRegistrantTableAssignment({ eventId, registrantId });
        removeLocalAssignment(registrantId);
        setMessage('Registrant removed from seating chart.');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to unassign registrant.');
      }
    });
  }

  return (
    <div className='space-y-6'>
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <h2 className='text-xl font-bold text-slate-900'>Create Table</h2>
        <p className='mt-1 text-sm text-slate-600'>
          Add a table number, then assign registrants using search.
        </p>

        <div className='mt-5 grid gap-4 lg:grid-cols-[180px_1fr_auto]'>
          <input
            type='number'
            min={1}
            value={newTableNumber}
            onChange={(e) => setNewTableNumber(e.target.value)}
            placeholder='Table #'
            className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
          />
          <RegistrantPicker
            registrants={unassignedRegistrants}
            value={newTableRegistrantId}
            onChange={setNewTableRegistrantId}
            placeholder='Search and select registrant'
            disabled={isPending || unassignedRegistrants.length === 0}
          />
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={handleCreateEmptyTable}
              disabled={isPending}
              className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50'
            >
              Create table
            </button>
            <button
              type='button'
              onClick={handleCreateTableAndAssign}
              disabled={isPending}
              className='rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
            >
              Assign
            </button>
          </div>
        </div>

        {message ? <p className='mt-3 text-sm text-emerald-700'>{message}</p> : null}
        {error ? <p className='mt-3 text-sm text-rose-700'>{error}</p> : null}
      </section>

      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <h2 className='text-xl font-bold text-slate-900'>Tables ({tableNumbers.length})</h2>
          <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
            Assigned: {assignments.length}
          </span>
        </div>

        {tableNumbers.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No tables yet. Create one above.
          </div>
        ) : (
          <div className='mt-6 grid gap-4 lg:grid-cols-2'>
            {tableNumbers.map((tableNumber) => {
              const rows = grouped.get(tableNumber) ?? [];
              const selectable = registrants.filter(
                (registrant) => assignmentByRegistrant.get(registrant.id)?.tableNumber !== tableNumber
              );
              return (
                <div
                  key={tableNumber}
                  className='rounded-2xl border border-slate-200 bg-slate-50 p-4'
                >
                  <div className='mb-3 flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-slate-900'>Table {tableNumber}</h3>
                    <span className='text-xs font-semibold text-slate-600'>
                      {rows.length} assigned
                    </span>
                  </div>

                  <div className='mb-4 space-y-2'>
                    <RegistrantPicker
                      registrants={selectable}
                      value={tableSelections[tableNumber] ?? ''}
                      onChange={(registrantId) =>
                        setTableSelections((prev) => ({
                          ...prev,
                          [tableNumber]: registrantId,
                        }))
                      }
                      placeholder='Assign registrant to this table'
                      disabled={isPending || selectable.length === 0}
                    />
                    <button
                      type='button'
                      onClick={() => handleAssignToExistingTable(tableNumber)}
                      disabled={isPending || !tableSelections[tableNumber]}
                      className='rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
                    >
                      Assign to table
                    </button>
                  </div>

                  {rows.length === 0 ? (
                    <p className='text-sm text-slate-600'>No registrants assigned yet.</p>
                  ) : (
                    <ul className='space-y-2'>
                      {rows.map((row) => (
                        <li
                          key={row.registrantId}
                          className='flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2'
                        >
                          <div className='min-w-0'>
                            <p className='truncate text-sm font-semibold text-slate-900'>
                              {fullName(row)}
                            </p>
                            <p className='truncate text-xs text-slate-600'>
                              {row.email}
                              {row.company ? ` · ${row.company}` : ''}
                            </p>
                          </div>
                          <button
                            type='button'
                            onClick={() => handleUnassign(row.registrantId)}
                            disabled={isPending}
                            className='rounded-lg border border-red-300 px-2 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50'
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
