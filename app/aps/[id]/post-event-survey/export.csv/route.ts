import {
  fetchPostEventSurveyAdmin,
  type PostEventSurveyCompletion,
} from '@/app/actions/post-event-survey';

const SESSIONS: Array<{ id: string; title: string }> = [
  { id: 'robotics-gm', title: 'Robotics Integration at GM, Nasser Nasser, GM' },
  { id: 'oem-volvo', title: 'OEM Packaging Needs, Carlos Gutierrez, Volvo' },
  { id: 'oem-nissan', title: 'OEM Packaging Needs, Alex Seger, Nissan' },
  {
    id: 'pakfab-toyota',
    title: 'PakFab Case Study: Daniel Castaneda, PakFab & Trevor Franken, Toyota',
  },
  { id: 'vehicle-forecasting', title: 'Vehicle Forecasting, Joseph McCabe, AFS' },
  { id: 'isuzu-next-chapter', title: "Isuzu's Next Chapter, Russell Ferebee, Isuzu" },
  { id: 'guardian-workshop', title: 'Guardian Breakout Workshop, Ben Hesskamp, Guardian' },
  {
    id: 'epr-nissan',
    title: 'Extended Producer Responsibility (EPR), Nathan Kilcoyne, Nissan',
  },
  {
    id: 'ask-a-buyer',
    title: 'Ask a Buyer, Michael Isecke GM & Matthias Stiller, Jonas & Redmann',
  },
  {
    id: 'forming-the-future',
    title: 'Forming the Future of Automotive Packaging, Nate Franck, TriEnda',
  },
  {
    id: 'oem-panel',
    title:
      'OEM Panel, Bridget Grewal, Magna & Nasser Nasser, GM & Todd Chesna, Ford & Kelsey Kester, BMW',
  },
];

function escapeCsv(value: string): string {
  if (value.includes('"')) {
    value = value.replaceAll('"', '""');
  }
  if (/[",\n\r]/.test(value)) {
    return `"${value}"`;
  }
  return value;
}

function cell(value: string | number | boolean | null | undefined): string {
  if (value == null) return '';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return escapeCsv(String(value));
}

function sessionRating(row: PostEventSurveyCompletion, sessionId: string): string {
  const match = row.sessionRatings.find((session) => session.id === sessionId);
  return match ? String(match.rating) : '';
}

const COLUMNS: Array<{
  header: string;
  value: (row: PostEventSurveyCompletion) => string | number | boolean | null | undefined;
}> = [
  { header: 'Name', value: (row) => row.name },
  { header: 'Email', value: (row) => row.email },
  { header: 'Company', value: (row) => row.company },
  { header: 'Identity', value: (row) => row.identityLabel },
  { header: 'Completed At', value: (row) => row.completedAt },
  { header: 'Summit Rating', value: (row) => row.summitRating },
  { header: 'Gained Value', value: (row) => row.gainedValue },
  { header: 'Gained Value Comments', value: (row) => row.gainedValueComments },
  { header: 'Most Beneficial', value: (row) => row.mostBeneficial },
  { header: 'Least Beneficial', value: (row) => row.leastBeneficial },
  { header: 'Favorite Presentation', value: (row) => row.favoritePresentation },
  { header: 'Network Growth', value: (row) => row.networkGrowthRating },
  { header: 'Improvement Suggestions', value: (row) => row.improvementSuggestions },
  { header: 'Recommend Name', value: (row) => row.recommendName },
  { header: 'Recommend Company', value: (row) => row.recommendCompany },
  { header: 'Recommend Email', value: (row) => row.recommendEmail },
  { header: 'Recommend Phone', value: (row) => row.recommendPhone },
  ...SESSIONS.map((session) => ({
    header: session.title,
    value: (row: PostEventSurveyCompletion) => sessionRating(row, session.id),
  })),
];

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id: eventId } = await context.params;
  const { completions } = await fetchPostEventSurveyAdmin(eventId);

  const header = COLUMNS.map((column) => escapeCsv(column.header)).join(',');
  const body = completions
    .map((row) => COLUMNS.map((column) => cell(column.value(row))).join(','))
    .join('\n');
  const csv = [header, body].filter(Boolean).join('\n');

  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="post-event-surveys.csv"',
      'cache-control': 'no-store',
    },
  });
}
