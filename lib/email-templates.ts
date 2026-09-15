import { render } from '@react-email/render';
import { WelcomeEmail } from '@/react-email-starter/emails/welcome-email';
import { AppAccessEmail } from '@/react-email-starter/emails/app-access-email';
import { AttendeeInfoEmail } from '@/react-email-starter/emails/attendee-info-email';
import { Tour1ConfirmedEmail } from '@/react-email-starter/emails/tour-1-confirmed-email';
import { Tour2ConfirmedEmail } from '@/react-email-starter/emails/tour-2-confirmed-email';
import { Tour2WaitlistEmail } from '@/react-email-starter/emails/tour-2-waitlist-email';

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

const APP_STORE_URL =
  process.env.APS_APP_STORE_URL ||
  'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425';
const PLAY_STORE_URL =
  process.env.APS_PLAY_STORE_URL ||
  'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit';
const WEB_APP_URL =
  process.env.APS_WEB_APP_URL || 'https://autopacksummit.expo.app/';

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
        appStoreUrl: APP_STORE_URL,
        playStoreUrl: PLAY_STORE_URL,
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

const attendeeInfoTemplate: EmailTemplateDefinition = {
  key: 'attendee-info-email',
  label: 'Attendee info (pre-event)',
  description:
    'Dates, cocktail hour, Clemson and BMW tour spots, app download (iOS, Android, web), temp password, meals, attire, and parking.',
  requiresTempPassword: true,
  defaultSubject: ({ eventYear }) =>
    `AutoPack Summit ${eventYear}: Important Information for Attendees`,
  renderHtml: async ({ recipient, eventYear }) => {
    return render(
      AttendeeInfoEmail({
        firstName: recipient.firstName ?? '',
        email: recipient.email,
        tempPassword: recipient.tempPassword ?? null,
        eventYear,
        appStoreUrl: APP_STORE_URL,
        playStoreUrl: PLAY_STORE_URL,
        webAppUrl: WEB_APP_URL,
      }),
    );
  },
  renderText: ({ recipient, eventYear }) => {
    const lines = [
      `Dear ${recipient.firstName?.trim() || 'AutoPack Summit Attendee'},`,
      '',
      `We're excited to welcome you to Greenville for the ${eventYear} Automotive Packaging Summit.`,
      '',
      'EVENT DATES AND LOCATION',
      `September 30–October 2, ${eventYear}`,
      'Hyatt Regency Greenville',
      '220 North Main Street, Greenville, SC 29601',
      '',
      'The main conference program is Thursday, October 1. Registration and continental breakfast begin at 7:30 AM, followed by welcome remarks at 8:30 AM.',
      'Agenda: https://www.autopacksummit.com/agenda',
      '',
      'KICKOFF COCKTAIL HOUR',
      'Wednesday, September 30 · 6:00–8:00 PM',
      'New Realm Brewing, 912 S. Main Street, Greenville, SC 29601',
      'Please look for the EVITE invitation and RSVP.',
      '',
      'WEDNESDAY TOUR — SPOTS STILL AVAILABLE',
      'Clemson University ICAR and Deep Orange Facility Tour',
      'Wednesday, September 30 · 11:00 AM–12:30 PM · Transportation provided',
      'To add the tour, reply to this email or write bianca@packagingschool.com as soon as possible.',
      '',
      'FRIDAY TOUR — JUST ADDED',
      'BMW iFACTORY Tour: Heritage meets Innovation at Plant Spartanburg',
      'Newly added to Friday’s agenda. Friday, October 2 · four time slots: 9:00–10:30 AM, 11:00 AM–12:30 PM, 12:00–1:30 PM, 2:00–3:30 PM',
      "An immersive look at the history, innovation, and people behind BMW's largest production facility — exhibits on BMW X models built in Spartanburg, advanced manufacturing technology, and the stories connecting BMW with generations of drivers.",
      'View Agenda to Register: https://www.autopacksummit.com/agenda',
      '',
      'DOWNLOAD THE EVENT APP',
      'iPhone: the app is not listed in the public App Store. Do not search for it — use this install link:',
      `iOS: ${APP_STORE_URL}`,
      `Android: ${PLAY_STORE_URL}`,
      `Web app: ${WEB_APP_URL}`,
      '',
      'Sign in with the email associated with your registration.',
      `Email: ${recipient.email}`,
      recipient.tempPassword
        ? `Temporary password: ${recipient.tempPassword}`
        : 'Temporary password unavailable — use Forgot Password in the app.',
      '',
      'Use the temporary password only if you have not signed in yet and created your own password. If you already set a password, keep using that one.',
      'App guide: https://www.autopacksummit.com/appguide',
      '',
      'THURSDAY MEALS AND RECEPTION',
      "Thursday's program includes continental breakfast, lunch, networking breaks, and an evening cocktail reception with hors d'oeuvres from 5:00 to 7:00 PM at the Hyatt.",
      '',
      'ATTIRE',
      'Business casual is recommended. If you are participating in a facility tour, wear comfortable clothing and walking shoes.',
      '',
      'TRAVEL AND PARKING',
      'Self-parking in the Hyatt garage is $10 per day. Park front-in; reverse parking is not permitted. Rates are subject to change.',
      '',
      'We look forward to seeing you in Greenville!',
      '',
      'Questions: bianca@packagingschool.com',
      '',
      'The AutoPack Summit Team',
      'https://www.autopacksummit.com',
    ];
    return lines.join('\n');
  },
};

const tour1ConfirmedTemplate: EmailTemplateDefinition = {
  key: 'tour-1-confirmed-email',
  label: 'Tour 1 confirmed (CU-ICAR)',
  description:
    'Confirmed CU-ICAR / Deep Orange attendees: Wednesday schedule, Hyatt bus times, attire, and how to release a spot.',
  defaultSubject: () =>
    'Important Tour Information: CU-ICAR and Deep Orange',
  renderHtml: async ({ recipient, eventYear }) => {
    return render(
      Tour1ConfirmedEmail({
        firstName: recipient.firstName ?? '',
        eventYear,
      }),
    );
  },
  renderText: ({ recipient }) => {
    const greetingName = recipient.firstName?.trim() || 'Tour Attendee';
    return [
      `Dear ${greetingName},`,
      '',
      'We look forward to welcoming you to the Clemson University ICAR and Deep Orange Facility Tour on Wednesday, September 30!',
      '',
      'Please review the important transportation and timing information below.',
      '',
      'TOUR SCHEDULE',
      'Wednesday, September 30',
      '11:00 AM–12:30 PM',
      '',
      'Clemson University International Center for Automotive Research',
      'Carroll A. Campbell Jr. Graduate Engineering Center',
      '4 Research Drive',
      'Greenville, SC 29607',
      '',
      'BUS TRANSPORTATION',
      'Transportation is provided from the Hyatt Regency Greenville. The bus will arrive at the hotel’s main entrance at 10:15 AM and depart promptly at 10:30 AM.',
      '',
      'Please arrive early and be ready to board when the bus arrives. Unfortunately, we will not be able to delay departure for late arrivals.',
      '',
      'ABOUT THE TOUR',
      'This exclusive tour will provide a behind-the-scenes look at Clemson University’s automotive research, advanced vehicle development, and renowned Deep Orange program.',
      '',
      'Lunch sandwiches will be served at the conclusion of the tour before we return to the Hyatt.',
      '',
      'We recommend wearing comfortable clothing and appropriate footwear.',
      '',
      'We look forward to seeing you on Wednesday! If your plans have changed and you are no longer able to attend, please let us know as soon as possible so we can offer your spot to another attendee.',
      '',
      'The AutoPack Summit Team',
      'bianca@packagingschool.com',
      'https://www.autopacksummit.com',
    ].join('\n');
  },
};

const tour2ConfirmedTemplate: EmailTemplateDefinition = {
  key: 'tour-2-confirmed-email',
  label: 'Tour 2 confirmed (Clemson Packaging Science)',
  description:
    'Confirmed Clemson Packaging Science attendees: Friday schedule, self-drive parking, Hendrix meeting point, and waitlist release.',
  defaultSubject: () =>
    'Important Tour Information: Clemson Packaging Science Facilities',
  renderHtml: async ({ recipient, eventYear }) => {
    return render(
      Tour2ConfirmedEmail({
        firstName: recipient.firstName ?? '',
        eventYear,
      }),
    );
  },
  renderText: ({ recipient }) => {
    const greetingName = recipient.firstName?.trim() || 'Tour Attendee';
    return [
      `Dear ${greetingName},`,
      '',
      'We look forward to welcoming you to the Clemson University Packaging Science Facilities Tour on Friday, October 2!',
      '',
      'Please review the important arrival and parking information below.',
      '',
      'TOUR SCHEDULE',
      'Friday, October 2',
      '11:00 AM–12:00 PM',
      '',
      'Newman Hall and Sonoco Institute (Harris A. Smith Building)',
      'Clemson University',
      'Clemson, SC 29634',
      '',
      'TOUR PLAN',
      '11:00 AM — Newman Hall',
      'Guided walk-through of CEFPACK and Distribution Lab, with an opportunity to meet Don and Brennan, if available.',
      '11:30 AM — Sonoco Institute (Harris A. Smith Building)',
      'Guided walk-through of the building.',
      '',
      'TRANSPORTATION AND PARKING',
      'Transportation is not provided for this tour. Attendees will need to drive to Clemson University and park in a metered visitor space.',
      'We recommend using the metered parking spaces in Lot E-1, directly across from the Hendrix Student Center.',
      `Hendrix Student Center: https://maps.google.com/?q=Hendrix+Student+Center+Clemson+University+Clemson+SC`,
      'Clemson interactive parking map: https://www.tigerscommute.com/Public/Home.aspx',
      'On the parking map, select Metered and then click the eye icon to display available metered parking locations. Limited metered parking may also be available along Fernow Street near the Harris A. Smith Building.',
      "If you have never visited Clemson's campus, we strongly recommend arriving up to one hour early.",
      '',
      'MEETING LOCATION',
      'An AutoPack Summit staff member will be waiting outside the Hendrix Student Center with an AutoPack Summit sign to help guide attendees to the Newman Hall Building. You might also meet us directly at Newman Hall (the covered door in between Newman Hall and Poole Building).',
      'Please meet the group at the Hendrix Student Center no later than 10:40 AM. The group will begin walking to the tour location promptly at 10:45 AM.',
      '',
      'ABOUT THE TOUR',
      "The tour will explore Clemson University's Packaging Science facilities, including material testing laboratories and state-of-the-art packaging design laboratories.",
      'The tour involves a significant amount of fast-paced walking across campus. Please wear comfortable clothing and appropriate walking shoes.',
      '',
      'Because space is limited and we currently have a waitlist, please let us know as soon as possible if you are no longer able to attend.',
      '',
      'We look forward to seeing you!',
      '',
      'The AutoPack Summit Team',
      'bianca@packagingschool.com',
      'https://www.autopacksummit.com',
    ].join('\n');
  },
};

const tour2WaitlistTemplate: EmailTemplateDefinition = {
  key: 'tour-2-waitlist-email',
  label: 'Tour 2 waitlist (Clemson Packaging Science)',
  description:
    'Requested but not approved Clemson Packaging Science attendees: at capacity, waitlist order, wait for a separate confirmation before going to campus for the tour.',
  defaultSubject: () => 'Clemson University Tour Waitlist Update',
  renderHtml: async ({ recipient, eventYear }) => {
    return render(
      Tour2WaitlistEmail({
        firstName: recipient.firstName ?? '',
        eventYear,
      }),
    );
  },
  renderText: ({ recipient }) => {
    const greetingName =
      recipient.firstName?.trim() || 'AutoPack Summit Attendee';
    return [
      `Dear ${greetingName},`,
      '',
      'Thank you for your interest in the Clemson University Packaging Science Facilities Tour, scheduled for Friday, October 2, from 11:00 AM to 12:00 PM.',
      '',
      'The tour is currently at capacity, and your name remains on the waitlist. If a space becomes available, we will contact attendees in waitlist order and provide the complete tour, parking, and meeting instructions.',
      '',
      'Please do not go to the Clemson campus for this tour unless you receive a separate email confirming that a spot has become available for you. This does not affect your AutoPack Summit registration.',
      '',
      'If you are no longer interested in this tour, please reply to this email so we can remove your name from the waitlist.',
      '',
      'Thank you for your understanding. We hope to be able to accommodate you!',
      '',
      'Best regards,',
      '',
      'The AutoPack Summit Team',
      'bianca@packagingschool.com',
      'https://www.autopacksummit.com',
    ].join('\n');
  },
};

const TEMPLATES: Record<string, EmailTemplateDefinition> = {
  [welcomeTemplate.key]: welcomeTemplate,
  [appAccessTemplate.key]: appAccessTemplate,
  [attendeeInfoTemplate.key]: attendeeInfoTemplate,
  [tour1ConfirmedTemplate.key]: tour1ConfirmedTemplate,
  [tour2ConfirmedTemplate.key]: tour2ConfirmedTemplate,
  [tour2WaitlistTemplate.key]: tour2WaitlistTemplate,
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
