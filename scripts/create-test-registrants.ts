import { createRegistrant, fetchCompaniesByEventId } from '../app/actions/registrants';

// Sample first and last names for variety
const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
  'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Sanchez',
  'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams',
  'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const JOB_TITLES = [
  'CEO', 'CTO', 'VP of Engineering', 'Director of Operations', 'Senior Manager',
  'Product Manager', 'Engineering Manager', 'Sales Director', 'Marketing Manager',
  'Operations Manager', 'Business Development Manager', 'Technical Lead',
  'Senior Engineer', 'Project Manager', 'Account Executive', 'Solutions Architect'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName: string, lastName: string): string {
  const domains = ['example.com', 'test.com', 'demo.org', 'sample.net'];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@${getRandomElement(domains)}`;
}

function generatePhone(): string {
  const area = Math.floor(Math.random() * 800) + 200;
  const exchange = Math.floor(Math.random() * 800) + 200;
  const number = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `(${area}) ${exchange}-${number}`;
}


async function createTestRegistrants(eventId: string) {
  console.log(`Fetching companies for event ${eventId}...`);
  const companies = await fetchCompaniesByEventId(eventId);
  
  if (companies.length === 0) {
    throw new Error('No companies found for this event. Please create companies first.');
  }

  console.log(`Found ${companies.length} companies. Creating 40 registrants...\n`);

  // Distribution: 1 STAFF, 3 SPEAKER, rest split between OEM, TIER1, SOLUTIONPROVIDER, SPONSOR
  // That's 36 remaining, so 9 each
  const attendeeTypes: Array<'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF'> = [
    'STAFF', // 1
    'SPEAKER', 'SPEAKER', 'SPEAKER', // 3
    ...Array(9).fill('OEM'),
    ...Array(9).fill('TIER1'),
    ...Array(9).fill('SOLUTIONPROVIDER'),
    ...Array(9).fill('SPONSOR'),
  ];

  // Shuffle the array for randomness
  for (let i = attendeeTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [attendeeTypes[i], attendeeTypes[j]] = [attendeeTypes[j], attendeeTypes[i]];
  }

  const usedNames = new Set<string>();
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < 40; i++) {
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
    const company = getRandomElement(companies);
    const jobTitle = getRandomElement(JOB_TITLES);

    try {
      console.log(`Creating registrant ${i + 1}/40: ${nameKey} (${attendeeType})...`);
      
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
      await new Promise(resolve => setTimeout(resolve, 200));
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

// Get event ID from command line argument
const eventId = process.argv[2];

if (!eventId) {
  console.error('Usage: tsx scripts/create-test-registrants.ts <eventId>');
  process.exit(1);
}

createTestRegistrants(eventId)
  .then(() => {
    console.log('\n✓ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Error:', error);
    process.exit(1);
  });

