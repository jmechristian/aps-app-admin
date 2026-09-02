export function generateVCard(data: {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  website?: string | null;
}): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  const fullName =
    [data.firstName, data.lastName].filter(Boolean).join(' ') || data.email;
  lines.push(`FN:${fullName}`);
  if (data.firstName || data.lastName) {
    lines.push(`N:${data.lastName || ''};${data.firstName || ''};;;`);
  }

  lines.push(`EMAIL:${data.email}`);

  if (data.phone) {
    lines.push(`TEL:${data.phone}`);
  }

  if (data.company) {
    lines.push(`ORG:${data.company}`);
  }

  if (data.jobTitle) {
    lines.push(`TITLE:${data.jobTitle}`);
  }

  if (data.website) {
    lines.push(`URL:${data.website}`);
  }

  lines.push('END:VCARD');
  return lines.join('\n');
}
