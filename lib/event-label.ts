/** Automotive Packaging Summit. Email templates for that event use this id. */
export const APS_EVENT_ID =
  process.env.APS_EVENT_ID?.trim() ||
  'd00b35f5-c45b-42eb-b306-fa3dfeee0251';

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
