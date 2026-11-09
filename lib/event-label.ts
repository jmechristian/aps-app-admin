/** Label stored on the existing APS.year string. Event id remains the key. */
export function isYearLabel(value: string) {
  return /^\d{4}$/.test(value.trim());
}

/** Four-digit labels stay newest-first. Other titles sort after them. */
export function compareEventLabels(a: string, b: string) {
  const aYear = isYearLabel(a);
  const bYear = isYearLabel(b);
  if (aYear && bYear) return Number(b) - Number(a);
  if (aYear !== bYear) return aYear ? -1 : 1;
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
}
