import { requestGraphQL } from '@/lib/appsync';
import {
  generateAndAttachRegistrantReceipt,
  type RegistrantReceiptSource,
} from '@/lib/registrant-receipt';

const LIST_REGISTRANTS_FOR_RECEIPTS = /* GraphQL */ `
  query ListRegistrantsForReceipts(
    $filter: ModelApsRegistrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsRegistrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        firstName
        lastName
        email
        phone
        jobTitle
        attendeeType
        company {
          name
        }
        billingAddressFirstName
        billingAddressLastName
        billingAddressEmail
        billingAddressPhone
        billingAddressStreet
        billingAddressCity
        billingAddressState
        billingAddressZip
        billingAddressCountry
        totalAmount
        discountCode
        paymentConfirmation
      }
      nextToken
    }
  }
`;

async function listRegistrants(eventId: string, registrantId?: string) {
  const rows: RegistrantReceiptSource[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      listApsRegistrants?: {
        items?: RegistrantReceiptSource[];
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(LIST_REGISTRANTS_FOR_RECEIPTS, {
      filter: registrantId
        ? { id: { eq: registrantId } }
        : { apsID: { eq: eventId } },
      limit: 200,
      nextToken: nextToken || undefined,
    });

    rows.push(...(response.listApsRegistrants?.items ?? []).filter(Boolean));
    nextToken = response.listApsRegistrants?.nextToken;
  } while (nextToken);

  return rows;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const registrantIdArg = args.find((arg) => arg.startsWith('--registrant-id='));
  const registrantId = registrantIdArg?.split('=')[1]?.trim() || undefined;
  const eventId = args.find((arg) => !arg.startsWith('--'));

  if (!eventId && !registrantId) {
    throw new Error(
      'Usage: npx tsx scripts/regenerate-registrant-receipts.ts <eventId> [--dry-run] [--registrant-id=<id>]',
    );
  }

  const registrants = await listRegistrants(eventId ?? '', registrantId);
  if (registrants.length === 0) {
    console.log('No registrants found.');
    return;
  }

  console.log(
    `${dryRun ? '[dry run] ' : ''}Regenerating ${registrants.length} receipt(s) using each registrant createdAt...`,
  );

  let ok = 0;
  let failed = 0;

  for (const registrant of registrants) {
    try {
      const result = await generateAndAttachRegistrantReceipt(registrant, {
        dryRun,
      });
      ok += 1;
      console.log(
        `${dryRun ? 'Would regenerate' : 'Regenerated'} ${registrant.email} (${registrant.id}) · created ${result.receiptCreatedAt}`,
      );
    } catch (error) {
      failed += 1;
      console.error(
        `Failed ${registrant.email} (${registrant.id}):`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  console.log(`Done. Success: ${ok}. Failed: ${failed}. Dry run: ${dryRun}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
