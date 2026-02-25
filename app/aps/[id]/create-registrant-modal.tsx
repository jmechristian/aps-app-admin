'use client';

import { useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { createRegistrant, type Company } from '@/app/actions/registrants';
import CompanyPicker from './company-picker';
import { ensureAmplifyConfigured, graphqlClient } from '@/src/amplify-client';
import { createAPSCompany } from '@/src/graphql/mutations';
import { CompanyType } from '@/src/API';
import { fetchAllCompanies } from '@/app/actions/companies';

type CreateRegistrantModalProps = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateRegistrantModal({
  eventId,
  isOpen,
  onClose,
  onSuccess,
}: CreateRegistrantModalProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [creatingCompany, setCreatingCompany] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);
  const [createdTempPassword, setCreatedTempPassword] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>(
    'idle'
  );
  const [showNewCompany, setShowNewCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyEmail, setNewCompanyEmail] = useState('');
  const [newCompanyType, setNewCompanyType] = useState<CompanyType | ''>('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyId: '',
    jobTitle: '',
    attendeeType: '' as 'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF' | '',
    status: '' as 'PENDING' | 'APPROVED' | 'REJECTED' | '',
  });

  useEffect(() => {
    if (isOpen && eventId) {
      loadData();
    }
  }, [isOpen, eventId]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const companiesData = await fetchAllCompanies();
      setCompanies(companiesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let jwtForAppSync: string | null = null;

    // #region agent log (debug)
    // Capture whether the client has an Auth session/token at submit time.
    // Do NOT log PII or tokens; only booleans and high-level state.
    fetch('http://127.0.0.1:7243/ingest/8e54769f-f43d-46b6-abd8-6d9007eecefc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'C',
        location: 'app/aps/[id]/create-registrant-modal.tsx:handleSubmit:entry',
        message: 'CreateRegistrantModal submit clicked',
        data: {
          hasEventId: !!eventId,
          hasCompanyId: !!formData.companyId,
          hasAttendeeType: !!formData.attendeeType,
          hasStatus: !!formData.status,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});

    try {
      const { fetchAuthSession } = await import('aws-amplify/auth');
      const session = await fetchAuthSession();
      jwtForAppSync =
        session.tokens?.accessToken?.toString() ??
        session.tokens?.idToken?.toString() ??
        null;
      fetch('http://127.0.0.1:7243/ingest/8e54769f-f43d-46b6-abd8-6d9007eecefc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'debug-session',
          runId: 'pre-fix',
          hypothesisId: 'C',
          location: 'app/aps/[id]/create-registrant-modal.tsx:handleSubmit:authSession',
          message: 'fetchAuthSession result (redacted)',
          data: {
            hasIdentityId: !!session.identityId,
            hasCredentials: !!session.credentials,
            hasTokens: !!session.tokens,
            hasIdToken: !!session.tokens?.idToken,
            hasAccessToken: !!session.tokens?.accessToken,
            hasJwtForAppSync: !!jwtForAppSync,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    } catch {
      fetch('http://127.0.0.1:7243/ingest/8e54769f-f43d-46b6-abd8-6d9007eecefc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'debug-session',
          runId: 'pre-fix',
          hypothesisId: 'C',
          location: 'app/aps/[id]/create-registrant-modal.tsx:handleSubmit:authSessionError',
          message: 'fetchAuthSession threw',
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    }
    // #endregion agent log (debug)

    if (!jwtForAppSync) {
      setError('Not signed in (missing auth token). Please log in again.');
      setSubmitting(false);
      return;
    }

    if (!formData.attendeeType) {
      setError('Please select an attendee type');
      setSubmitting(false);
      return;
    }

    try {
      const result = await createRegistrant({
        apsID: eventId,
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        email: formData.email,
        phone: formData.phone || null,
        companyId: formData.companyId || null,
        jobTitle: formData.jobTitle || null,
        attendeeType: formData.attendeeType as 'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF',
        status: formData.status as 'PENDING' | 'APPROVED' | 'REJECTED',
      }, { jwt: jwtForAppSync });

      setCreatedEmail(result.email);
      setCreatedTempPassword(result.tempPassword ?? null);
      setCopyStatus('idle');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create registrant');
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyId: '',
      jobTitle: '',
      attendeeType:
        '' as 'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF' | '',
      status: '' as 'PENDING' | 'APPROVED' | 'REJECTED' | '',
    });
    setShowNewCompany(false);
    setNewCompanyName('');
    setNewCompanyEmail('');
    setNewCompanyType('');
    setCreatedEmail(null);
    setCreatedTempPassword(null);
    setCopyStatus('idle');
    setError(null);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleCopyPassword() {
    if (!createdTempPassword) return;
    try {
      await navigator.clipboard.writeText(createdTempPassword);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 1500);
    } catch {
      setCopyStatus('failed');
    }
  }

  async function handleCreateCompany(e?: React.SyntheticEvent) {
    e?.preventDefault();
    setCreatingCompany(true);
    setError(null);

    const name = newCompanyName.trim();
    const email = newCompanyEmail.trim();

    if (!name || !email) {
      setError('Company name and email are required');
      setCreatingCompany(false);
      return;
    }

    try {
      ensureAmplifyConfigured();
      await fetchAuthSession();

      const res = await graphqlClient.graphql({
        query: createAPSCompany,
        variables: {
          input: {
            name,
            email,
            type: newCompanyType || null,
          },
        },
        authMode: 'userPool',
      });

      const created = (res as any).data?.createAPSCompany as
        | { id: string; name: string; email: string; type?: CompanyType | null }
        | undefined;

      if (!created?.id) throw new Error('Failed to create company');

      const nextCompany: Company = {
        id: created.id,
        name: created.name,
        email: created.email ?? email,
        type: created.type ?? null,
      };

      setCompanies((prev) => [nextCompany, ...prev]);
      setFormData((prev) => ({ ...prev, companyId: created.id }));
      setShowNewCompany(false);
      setNewCompanyName('');
      setNewCompanyEmail('');
      setNewCompanyType('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create company');
    } finally {
      setCreatingCompany(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative page-container max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-900">Create Registrant</h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
              {error}
            </div>
          )}

          {createdEmail && (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
              <div className="text-sm font-semibold">Registrant created</div>
              <div className="mt-1 text-sm text-emerald-900">
                {createdEmail}
              </div>
              {createdTempPassword ? (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-4">
                  <div className="text-xs font-semibold text-emerald-800">
                    Temporary password
                  </div>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <code className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-900">
                      {createdTempPassword}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                    >
                      {copyStatus === 'copied'
                        ? 'Copied!'
                        : copyStatus === 'failed'
                          ? 'Copy failed'
                          : 'Copy password'}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-emerald-700">
                    Share this in your welcome email.
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-xs text-emerald-700">
                  This user already existed, so no new temporary password was
                  generated.
                </p>
              )}
            </div>
          )}

          {loading ? (
            <div className="py-8 text-center text-slate-500">Loading companies...</div>
          ) : (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                    <CompanyPicker
                      companies={companies.map((c) => ({ id: c.id, name: c.name }))}
                      value={formData.companyId}
                      onChange={(companyId) => setFormData({ ...formData, companyId })}
                      placeholder="Select a company"
                      disabled={loading || submitting || creatingCompany}
                    />
                    {formData.companyId ? (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, companyId: '' })}
                        className="mt-1 text-xs text-slate-600 underline hover:text-slate-900"
                      >
                        Clear selection
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="mt-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
                      onClick={() => setShowNewCompany((v) => !v)}
                      disabled={submitting || creatingCompany}
                    >
                      {showNewCompany ? 'Cancel new company' : 'Add a new company'}
                    </button>
                  </div>
                  {showNewCompany ? (
                    <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            disabled={creatingCompany}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Company Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={newCompanyEmail}
                            onChange={(e) => setNewCompanyEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            disabled={creatingCompany}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Company Type
                          </label>
                          <select
                            value={newCompanyType}
                            onChange={(e) =>
                              setNewCompanyType(e.target.value as CompanyType | '')
                            }
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            disabled={creatingCompany}
                          >
                            <option value="">Select type</option>
                            <option value={CompanyType.OEMTIER1}>OEM/Tier 1</option>
                            <option value={CompanyType.SOLUTIONPROVIDER}>
                              Solution Provider
                            </option>
                            <option value={CompanyType.SPONSOR}>Sponsor</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={handleCreateCompany}
                            disabled={creatingCompany}
                            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:opacity-60"
                          >
                            {creatingCompany ? 'Creating…' : 'Create company'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Attendee Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.attendeeType}
                      onChange={(e) => setFormData({ ...formData, attendeeType: e.target.value as typeof formData.attendeeType })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select attendee type</option>
                      <option value="OEM">OEM</option>
                      <option value="TIER1">Tier 1</option>
                      <option value="SOLUTIONPROVIDER">Solution Provider</option>
                      <option value="SPONSOR">Sponsor</option>
                      <option value="SPEAKER">Speaker</option>
                      <option value="STAFF">Staff</option>
                      <option value="EXHIBITOR">Exhibitor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select status</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          )}

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-6">
            {createdEmail ? (
              <>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Create another
                </button>
                <button
                  type="button"
                  onClick={onSuccess}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Creating...' : 'Create Registrant'}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

