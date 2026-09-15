import {
  CreateScheduleCommand,
  DeleteScheduleCommand,
  GetScheduleCommand,
  SchedulerClient,
  UpdateScheduleCommand,
} from '@aws-sdk/client-scheduler';

function buildSchedulerClient() {
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
    return new SchedulerClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  return new SchedulerClient({ region });
}

function campaignScheduleName(campaignId: string) {
  // EventBridge schedule names: 1-64 chars, alphanumeric, hyphens, underscores.
  const safe = campaignId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
  return `aps-email-${safe}`.slice(0, 64);
}

function formatSchedulerAt(iso: string): string | null {
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return null;
  // at(yyyy-mm-ddThh:mm:ss)
  return new Date(ms).toISOString().replace(/\.\d{3}Z$/, '');
}

function schedulerErrorMessage(error: unknown): string {
  const err = error as { name?: string; message?: string } | null;
  const name = err?.name?.trim();
  const message = err?.message?.trim();
  if (name && message) return `${name}: ${message}`;
  return message || name || 'EventBridge schedule failed';
}

function schedulerConfigured() {
  return Boolean(
    process.env.APS_EMAIL_SCHEDULER_ROLE_ARN &&
      process.env.APS_EMAIL_SCHEDULE_TARGET_ARN,
  );
}

/**
 * Creates/updates a one-shot EventBridge schedule that invokes the email
 * campaign target (API Destination or Lambda ARN) with { campaignId }.
 *
 * Env:
 * - APS_EMAIL_SCHEDULER_ROLE_ARN
 * - APS_EMAIL_SCHEDULE_TARGET_ARN
 * - APS_EMAIL_SCHEDULER_GROUP (optional, default "default")
 * - APS_EMAIL_CRON_SECRET (included in schedule input for HTTP targets)
 */
export async function upsertEmailCampaignSchedule(params: {
  campaignId: string;
  scheduledAt: string;
}): Promise<{ ok: boolean; configured: boolean; message: string }> {
  if (!schedulerConfigured()) {
    return {
      ok: true,
      configured: false,
      message: 'Scheduled. Production will send it at the chosen time.',
    };
  }

  const atExpression = formatSchedulerAt(params.scheduledAt);
  if (!atExpression) {
    return {
      ok: false,
      configured: true,
      message: `Campaign saved as scheduled, but EventBridge did not create the fire time. Invalid scheduledAt: ${params.scheduledAt}`,
    };
  }

  const scheduledMs = Date.parse(params.scheduledAt);
  if (scheduledMs <= Date.now()) {
    return {
      ok: true,
      configured: true,
      message: 'Schedule time is in the past; send should run immediately.',
    };
  }

  const client = buildSchedulerClient();
  const groupName = process.env.APS_EMAIL_SCHEDULER_GROUP || 'default';
  const scheduleName = campaignScheduleName(params.campaignId);
  const secret =
    process.env.APS_EMAIL_CRON_SECRET ||
    process.env.CRON_SECRET ||
    process.env.APS_EMAIL_TRACKING_SECRET ||
    '';

  const commandInput = {
    Name: scheduleName,
    GroupName: groupName,
    ScheduleExpression: `at(${atExpression})`,
    FlexibleTimeWindow: { Mode: 'OFF' as const },
    ActionAfterCompletion: 'DELETE' as const,
    Target: {
      Arn: process.env.APS_EMAIL_SCHEDULE_TARGET_ARN!,
      RoleArn: process.env.APS_EMAIL_SCHEDULER_ROLE_ARN!,
      Input: JSON.stringify({
        campaignId: params.campaignId,
        secret,
      }),
      RetryPolicy: {
        MaximumEventAgeInSeconds: 3600,
        MaximumRetryAttempts: 2,
      },
    },
  };

  try {
    try {
      await client.send(
        new GetScheduleCommand({
          Name: scheduleName,
          GroupName: groupName,
        }),
      );
      await client.send(new UpdateScheduleCommand(commandInput));
    } catch (error) {
      const name = (error as { name?: string } | null)?.name;
      if (name === 'ResourceNotFoundException') {
        await client.send(new CreateScheduleCommand(commandInput));
      } else {
        throw error;
      }
    }

    return {
      ok: true,
      configured: true,
      message: 'EventBridge schedule created.',
    };
  } catch (error) {
    console.error('EventBridge email schedule failed:', error);
    return {
      ok: false,
      configured: true,
      message: `Campaign saved as scheduled, but EventBridge did not create the fire time. ${schedulerErrorMessage(error)}`,
    };
  }
}

export async function deleteEmailCampaignSchedule(
  campaignId: string,
): Promise<void> {
  if (!schedulerConfigured()) return;

  const client = buildSchedulerClient();
  const groupName = process.env.APS_EMAIL_SCHEDULER_GROUP || 'default';
  const scheduleName = campaignScheduleName(campaignId);

  try {
    await client.send(
      new DeleteScheduleCommand({
        Name: scheduleName,
        GroupName: groupName,
      }),
    );
  } catch (error) {
    const name = (error as { name?: string } | null)?.name;
    if (name !== 'ResourceNotFoundException') {
      console.error('EventBridge email schedule delete failed:', error);
    }
  }
}
