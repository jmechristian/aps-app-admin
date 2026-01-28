import {
  createRegistrant,
  fetchCompaniesByEventId,
} from '../app/actions/registrants';
import { requestGraphQL } from '../lib/appsync';

// Sample first and last names for variety
const FIRST_NAMES = [
  'James',
  'Mary',
  'John',
  'Patricia',
  'Robert',
  'Jennifer',
  'Michael',
  'Linda',
  'William',
  'Elizabeth',
  'David',
  'Barbara',
  'Richard',
  'Susan',
  'Joseph',
  'Jessica',
  'Thomas',
  'Sarah',
  'Christopher',
  'Karen',
  'Charles',
  'Nancy',
  'Daniel',
  'Lisa',
  'Matthew',
  'Betty',
  'Anthony',
  'Margaret',
  'Mark',
  'Sandra',
  'Donald',
  'Ashley',
  'Steven',
  'Kimberly',
  'Paul',
  'Emily',
  'Andrew',
  'Donna',
  'Joshua',
  'Michelle',
  'Kenneth',
  'Carol',
  'Kevin',
  'Amanda',
  'Brian',
  'Dorothy',
  'George',
  'Melissa',
];

const LAST_NAMES = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
  'Thompson',
  'White',
  'Harris',
  'Sanchez',
  'Clark',
  'Ramirez',
  'Lewis',
  'Robinson',
  'Walker',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green',
  'Adams',
  'Nelson',
  'Baker',
  'Hall',
  'Rivera',
  'Campbell',
  'Mitchell',
  'Carter',
  'Roberts',
];

const JOB_TITLES = [
  'CEO',
  'CTO',
  'VP of Engineering',
  'Director of Operations',
  'Senior Manager',
  'Product Manager',
  'Engineering Manager',
  'Sales Director',
  'Marketing Manager',
  'Operations Manager',
  'Business Development Manager',
  'Technical Lead',
  'Senior Engineer',
  'Project Manager',
  'Account Executive',
  'Solutions Architect',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName: string, lastName: string): string {
  const domains = ['example.com', 'test.com', 'demo.org', 'sample.net'];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@${getRandomElement(
    domains
  )}`;
}

function generatePhone(): string {
  const area = Math.floor(Math.random() * 800) + 200;
  const exchange = Math.floor(Math.random() * 800) + 200;
  const number = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `(${area}) ${exchange}-${number}`;
}

const CREATE_EXHIBITOR_PROFILE = /* GraphQL */ `
  mutation CreateApsAppExhibitorProfile(
    $input: CreateApsAppExhibitorProfileInput!
  ) {
    createApsAppExhibitorProfile(input: $input) {
      id
      companyId
      eventId
    }
  }
`;

const CREATE_APS_SPEAKER = /* GraphQL */ `
  mutation CreateAPSSpeaker($input: CreateAPSSpeakerInput!) {
    createAPSSpeaker(input: $input) {
      id
      eventId
      firstName
      lastName
      email
    }
  }
`;

async function createExhibitorProfile(eventId: string, companyId: string) {
  const result = await requestGraphQL<{
    createApsAppExhibitorProfile?: {
      id: string;
      companyId: string;
      eventId: string;
    } | null;
  }>(CREATE_EXHIBITOR_PROFILE, {
    input: {
      eventId,
      companyId,
    },
  });

  if (!result.createApsAppExhibitorProfile?.id) {
    throw new Error('Failed to create exhibitor profile');
  }

  return result.createApsAppExhibitorProfile;
}

async function createApsSpeaker(input: {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  phone?: string;
}) {
  const result = await requestGraphQL<{
    createAPSSpeaker?: { id: string; eventId: string; email: string } | null;
  }>(CREATE_APS_SPEAKER, {
    input: {
      eventId: input.eventId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      company: input.company,
      title: input.title,
      phone: input.phone ?? null,
      bio: `Test speaker bio for ${input.firstName} ${input.lastName}.`,
      headshot: 'https://placehold.co/400x400/png',
    },
  });

  if (!result.createAPSSpeaker?.id) {
    throw new Error('Failed to create APSSpeaker');
  }

  return result.createAPSSpeaker;
}

async function createTestMix(
  eventId: string,
  countSpeakers: number,
  countExhibitors: number
) {
  console.log(`Fetching companies for event ${eventId}...`);
  const companies = await fetchCompaniesByEventId(eventId);

  if (companies.length === 0) {
    throw new Error(
      'No companies found for this event. Please create companies first.'
    );
  }

  if (countExhibitors > 0 && companies.length < countExhibitors) {
    throw new Error(
      `Need at least ${countExhibitors} companies to create ${countExhibitors} exhibitors, but only found ${companies.length}.`
    );
  }

  const total = countSpeakers + countExhibitors;
  console.log(
    `Found ${companies.length} companies. Creating ${total} registrants (${countSpeakers} SPEAKER + ${countExhibitors} EXHIBITOR)...\n`
  );

  const attendeeTypes: Array<'SPEAKER' | 'EXHIBITOR'> = [
    ...Array(countSpeakers).fill('SPEAKER'),
    ...Array(countExhibitors).fill('EXHIBITOR'),
  ];

  // Shuffle the array for randomness
  for (let i = attendeeTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [attendeeTypes[i], attendeeTypes[j]] = [attendeeTypes[j], attendeeTypes[i]];
  }

  const usedNames = new Set<string>();
  let successCount = 0;
  let errorCount = 0;

  const exhibitorCompanies = new Set<string>();

  for (let i = 0; i < total; i++) {
    const attendeeType = attendeeTypes[i];

    // Generate unique name
    let firstName: string;
    let lastName: string;
    let nameKey: string;
    do {
      firstName = getRandomElement(FIRST_NAMES);
      lastName = getRandomElement(LAST_NAMES);
      nameKey = `${firstName} ${lastName}`;
    } while (usedNames.has(nameKey));
    usedNames.add(nameKey);

    const email = generateEmail(firstName, lastName);
    const phone = generatePhone();
    // Ensure EXHIBITORs use unique companies so we can safely create one exhibitor profile per company.
    let company = getRandomElement(companies);
    if (attendeeType === 'EXHIBITOR') {
      let guard = 0;
      while (exhibitorCompanies.has(company.id) && guard < 1000) {
        company = getRandomElement(companies);
        guard++;
      }
      exhibitorCompanies.add(company.id);
    }
    const jobTitle = getRandomElement(JOB_TITLES);

    try {
      console.log(
        `Creating registrant ${i + 1}/${total}: ${nameKey} (${attendeeType})...`
      );

      if (attendeeType === 'EXHIBITOR') {
        console.log(
          `  → Creating exhibitor profile for company ${company.name}...`
        );
        await createExhibitorProfile(eventId, company.id);
      }

      if (attendeeType === 'SPEAKER') {
        console.log(`  → Creating APSSpeaker record...`);
        await createApsSpeaker({
          eventId,
          firstName,
          lastName,
          email,
          company: company.name,
          title: jobTitle,
          phone,
        });
      }

      const result = await createRegistrant({
        apsID: eventId,
        firstName,
        lastName,
        email,
        phone,
        companyId: company.id,
        jobTitle,
        attendeeType,
        status: 'PENDING',
        termsAccepted: true,
      });

      console.log(`  ✓ Created registrant: ${result.email} (ID: ${result.id})`);
      console.log(`  ✓ ApsAppUser created automatically`);

      successCount++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`  ✗ Failed to create registrant ${i + 1}:`, error);
      errorCount++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Successfully created: ${successCount} registrants`);
  console.log(`Errors: ${errorCount}`);
  console.log(`\nDistribution:`);
  const typeCounts = attendeeTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  Object.entries(typeCounts).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
}

async function createTestSpeakers(eventId: string, count: number) {
  console.log(`Fetching companies for event ${eventId}...`);
  const companies = await fetchCompaniesByEventId(eventId);

  if (companies.length === 0) {
    throw new Error(
      'No companies found for this event. Please create companies first.'
    );
  }

  console.log(
    `Found ${companies.length} companies. Creating ${count} registrants (SPEAKER) + ${count} APSSpeaker records...\n`
  );

  const usedNames = new Set<string>();
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < count; i++) {
    // Generate unique name
    let firstName: string;
    let lastName: string;
    let nameKey: string;
    do {
      firstName = getRandomElement(FIRST_NAMES);
      lastName = getRandomElement(LAST_NAMES);
      nameKey = `${firstName} ${lastName}`;
    } while (usedNames.has(nameKey));
    usedNames.add(nameKey);

    const email = generateEmail(firstName, lastName);
    const phone = generatePhone();
    const company = getRandomElement(companies);
    const jobTitle = getRandomElement(JOB_TITLES);

    try {
      console.log(`Creating speaker ${i + 1}/${count}: ${nameKey}...`);

      console.log(`  → Creating APSSpeaker record...`);
      await createApsSpeaker({
        eventId,
        firstName,
        lastName,
        email,
        company: company.name,
        title: jobTitle,
        phone,
      });

      const result = await createRegistrant({
        apsID: eventId,
        firstName,
        lastName,
        email,
        phone,
        companyId: company.id,
        jobTitle,
        attendeeType: 'SPEAKER',
        status: 'PENDING',
        termsAccepted: true,
      });

      console.log(`  ✓ Created registrant: ${result.email} (ID: ${result.id})`);
      console.log(`  ✓ ApsAppUser created automatically`);

      successCount++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`  ✗ Failed to create speaker ${i + 1}:`, error);
      errorCount++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Successfully created: ${successCount} speakers`);
  console.log(`Errors: ${errorCount}`);
}

// CLI
// Usage:
//   npm run create-test-registrants -- <eventId>
//   npm run create-test-registrants -- <eventId> speakers <count>
//   npm run create-test-registrants -- <eventId> mix <countSpeakers> <countExhibitors>
//
// Defaults to: mix 10 10 (20 total)
const eventId = process.argv[2];
const mode = (process.argv[3] || 'mix').toLowerCase();
const arg4 = process.argv[4];
const arg5 = process.argv[5];

if (!eventId) {
  console.error(
    'Usage: tsx scripts/create-test-registrants.ts <eventId> [speakers <count> | mix <countSpeakers> <countExhibitors>]'
  );
  process.exit(1);
}

async function run() {
  if (mode === 'speakers') {
    const count = Math.max(1, Number(arg4 ?? 10) || 10);
    return createTestSpeakers(eventId, count);
  }

  if (mode === 'mix') {
    const countSpeakers = Math.max(0, Number(arg4 ?? 10) || 10);
    const countExhibitors = Math.max(0, Number(arg5 ?? 10) || 10);
    return createTestMix(eventId, countSpeakers, countExhibitors);
  }

  throw new Error(`Unknown mode "${mode}". Use "speakers" or "mix".`);
}

run()
  .then(() => {
    console.log('\n✓ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Error:', error);
    process.exit(1);
  });
