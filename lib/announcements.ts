export type AnnouncementStatus = 'published' | 'scheduled' | 'ready';

export type AnnouncementRecord = {
  scheduledAt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
};

export function getAnnouncementStatus(record: AnnouncementRecord): {
  status: AnnouncementStatus;
  statusLabel: string;
} {
  const now = Date.now();
  const publishedAt = record.publishedAt ? Date.parse(record.publishedAt) : null;
  const scheduledAt = record.scheduledAt ? Date.parse(record.scheduledAt) : null;

  if (publishedAt != null && !Number.isNaN(publishedAt)) {
    return { status: 'published', statusLabel: 'Published' };
  }
  if (scheduledAt != null && !Number.isNaN(scheduledAt)) {
    if (scheduledAt > now) {
      return { status: 'scheduled', statusLabel: 'Scheduled' };
    }
    return { status: 'ready', statusLabel: 'Ready to publish' };
  }
  return { status: 'published', statusLabel: 'Published' };
}

export function formatAnnouncementDateTime(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function formatAnnouncementListMeta(record: {
  status: AnnouncementStatus;
  scheduledAt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
}) {
  if (record.status === 'scheduled') {
    return `Scheduled for ${formatAnnouncementDateTime(record.scheduledAt)}`;
  }
  if (record.status === 'ready') {
    return `Due since ${formatAnnouncementDateTime(record.scheduledAt)}`;
  }
  return `Published ${formatAnnouncementDateTime(record.publishedAt || record.createdAt)}`;
}
