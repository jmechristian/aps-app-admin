import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export function getSesFromAddress() {
  return (
    process.env.APS_WELCOME_EMAIL_FROM ||
    process.env.APS_EMAIL_FROM ||
    'info@packagingschool.com'
  );
}

export function buildSesClient(): SESClient {
  const region =
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    process.env.NEXT_PUBLIC_AWS_REGION ||
    'us-east-1';

  const accessKeyId =
    process.env.AWSACCESSKEYID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.AWSSECRETACCESSKEY || process.env.AWS_SECRET_ACCESS_KEY;

  if (accessKeyId && secretAccessKey) {
    return new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  return new SESClient({ region });
}

export async function sendHtmlEmail(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}): Promise<{ messageId?: string }> {
  const client = buildSesClient();
  const from = params.from || getSesFromAddress();

  const result = await client.send(
    new SendEmailCommand({
      Destination: {
        ToAddresses: [params.to],
      },
      Message: {
        Body: {
          Html: {
            Data: params.html,
            Charset: 'UTF-8',
          },
          ...(params.text
            ? {
                Text: {
                  Charset: 'UTF-8',
                  Data: params.text,
                },
              }
            : {}),
        },
        Subject: {
          Charset: 'UTF-8',
          Data: params.subject,
        },
      },
      Source: from,
      ReplyToAddresses: [],
    }),
  );

  return { messageId: result.MessageId };
}
