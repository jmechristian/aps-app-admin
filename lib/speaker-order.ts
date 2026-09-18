export function graphqlErrorText(error: unknown): string {
  const err = error as { message?: string; errors?: Array<{ message?: string } | null> | null };
  const nested = (err.errors || []).map((item) => item?.message || '');
  return [err.message || '', ...nested].join(' ');
}

export function isUnknownSpeakerOrderError(error: unknown): boolean {
  const text = graphqlErrorText(error).toLowerCase();
  if (!text.includes('speakerorder')) return false;
  return (
    text.includes('cannot query field') ||
    text.includes('is not defined') ||
    text.includes('unknown field') ||
    text.includes('undefined field') ||
    text.includes('not defined on type') ||
    text.includes('not defined on input')
  );
}

export function queryWithoutSpeakerOrder(query: string) {
  return query.replace(/^[ \t]*speakerOrder[ \t]*\n?/gm, '');
}

export function orderIds(ids: string[], order?: Array<string | null> | null): string[] {
  const uniqueIds = ids.filter(Boolean);
  const normalizedOrder = (order || []).map((id) => (id || '').trim()).filter(Boolean);
  if (!uniqueIds.length || !normalizedOrder.length) return uniqueIds;

  const remaining = new Set(uniqueIds);
  const ordered: string[] = [];
  for (const id of normalizedOrder) {
    if (!remaining.has(id)) continue;
    ordered.push(id);
    remaining.delete(id);
  }
  for (const id of uniqueIds) {
    if (remaining.has(id)) ordered.push(id);
  }
  return ordered;
}

export function moveId(ids: string[], id: string, direction: -1 | 1): string[] {
  const index = ids.indexOf(id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= ids.length) return ids;
  const next = [...ids];
  const [item] = next.splice(index, 1);
  next.splice(nextIndex, 0, item);
  return next;
}
