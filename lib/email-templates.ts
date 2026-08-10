import { render } from '@react-email/render';
import { WelcomeEmail } from '@/react-email-starter/emails/welcome-email';
import { AppAccessEmail } from '@/react-email-starter/emails/app-access-email';

export type EmailTemplateRecipient = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  jobTitle?: string | null;
  attendeeType?: string | null;
  companyName?: string | null;
  speedNetworking?: boolean | null;
  totalAmount?: number | null;
  billingAddressStreet?: string | null;
  billingAddressCity?: string | null;
  billingAddressState?: string | null;
  billingAddressZip?: string | null;
  /** Decrypted temp password when available (app-access campaigns). */
  tempPassword?: string | null;
};

export type EmailTemplateContext = {
  recipient: EmailTemplateRecipient;
  eventYear: string;
  subject: string;
};

export type EmailTemplateDefinition = {
  key: string;
  label: string;
  description?: string;
  /** When true, send pipeline loads latest stored temp credential. */
  requiresTempPassword?: boolean;
  defaultSubject: (ctx: { eventYear: string }) => string;
  renderHtml: (ctx: EmailTemplateContext) => Promise<string>;
  renderText?: (ctx: EmailTemplateContext) => string;
};

const welcomeTemplate: EmailTemplateDefinition = {
  key: 'welcome-email',
  label: 'Welcome email',
  description: 'Existing APS welcome / dashboard email sent on approval.',
  defaultSubject: ({ eventYear }) =>
    `Automotive Packaging Summit ${eventYear} - Welcome`,
  renderHtml: async ({ recipient }) => {
    return render(
      WelcomeEmail({
        formData: {
          firstName: recipient.firstName ?? '',
          lastName: recipient.lastName ?? '',
          email: recipient.email,
          companyName: recipient.companyName ?? '',
          jobTitle: recipient.jobTitle ?? '',
          phone: recipient.phone ?? '',
          attendeeType: recipient.attendeeType ?? '',
          billingAddress: {
            street: recipient.billingAddressStreet ?? '',
            city: recipient.billingAddressCity ?? '',
            state: recipient.billingAddressState ?? '',
            zip: recipient.billingAddressZip ?? '',
          },
          speedNetworking: Boolean(recipient.speedNetworking),
        },
        formDataId: recipient.id,
        totalAmount: recipient.totalAmount ?? 0,
        addOnsSelected: [],
      }),
    );
  },
  renderText: ({ recipient, eventYear }) =>
    `Welcome to Automotive Packaging Summit ${eventYear}. View your dashboard: https://www.autopacksummit.com/registrants/${recipient.id}`,
};

const appAccessTemplate: EmailTemplateDefinition = {
  key: 'app-access-email',
  label: 'App access + temp password',
  description:
    'Announce the official event app, include sign-in credentials, and highlight key features.',
  requiresTempPassword: true,
  defaultSubject: ({ eventYear }) =>
    `Your Automotive Packaging Summit ${eventYear} app access is ready`,
  renderHtml: async ({ recipient, eventYear }) => {
    return render(
      AppAccessEmail({
        firstName: recipient.firstName ?? '',
        email: recipient.email,
        tempPassword: recipient.tempPassword ?? null,
        eventYear,
        dashboardUrl: `https://www.autopacksummit.com/registrants/${recipient.id}`,
        appStoreUrl:
          process.env.APS_APP_STORE_URL ||
          'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
        playStoreUrl:
          process.env.APS_PLAY_STORE_URL ||
          'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
      }),
    );
  },
  renderText: ({ recipient, eventYear }) => {
    const lines = [
      `${recipient.firstName || 'Hello'}, your APS ${eventYear} app access is ready.`,
      '',
      'Sign in with:',
      `Email: ${recipient.email}`,
      recipient.tempPassword
        ? `Temporary password: ${recipient.tempPassword}`
        : 'Temporary password unavailable — use Forgot Password in the app.',
      '',
      'On first sign-in, create your own password.',
      '',
      'In the app you can: manage your Hub & agenda, network via Community + QR, message connections, get announcements, and complete the Passport Challenge.',
      '',
      'Full app guide: https://autopacksummit.com/appguide',
      'https://www.autopacksummit.com',
    ];
    return lines.join('\n');
  },
};

const TEMPLATES: Record<string, EmailTemplateDefinition> = {
  [welcomeTemplate.key]: welcomeTemplate,
  [appAccessTemplate.key]: appAccessTemplate,
};

export function listEmailTemplates(): EmailTemplateDefinition[] {
  return Object.values(TEMPLATES);
}

export function getEmailTemplate(
  key: string,
): EmailTemplateDefinition | undefined {
  return TEMPLATES[key];
}

export function assertEmailTemplate(key: string): EmailTemplateDefinition {
  const template = getEmailTemplate(key);
  if (!template) {
    throw new Error(`Unknown email template: ${key}`);
  }
  return template;
}
