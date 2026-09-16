import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

export type AttendeeInfoEmailProps = {
  firstName?: string | null;
  email: string;
  tempPassword?: string | null;
  eventYear?: string;
  appStoreUrl?: string | null;
  playStoreUrl?: string | null;
  webAppUrl?: string | null;
};

const APS_BLUE = '#005a94';
const APS_YELLOW = '#E4A800';
const GRAY_BG = '#f3f4f6';
const GRAY_BORDER = '#e5e7eb';
const DARK_TEXT = '#111827';
const MUTED_TEXT = '#6b7280';

const AGENDA_URL = 'https://www.autopacksummit.com/agenda';
const AGENDA_FRIDAY_URL = 'https://www.autopacksummit.com/agenda?day=friday';
const APP_GUIDE_URL = 'https://www.autopacksummit.com/appguide';
const SITE_URL = 'https://www.autopacksummit.com';
const BIANCA_EMAIL = 'bianca@packagingschool.com';
const HYATT_MAPS =
  'https://maps.google.com/?q=Hyatt+Regency+Greenville+220+North+Main+Street+Greenville+SC+29601';
const NEW_REALM_MAPS =
  'https://maps.google.com/?q=New+Realm+Brewing+912+S+Main+Street+Greenville+SC+29601';
const TOUR_MAILTO = `mailto:${BIANCA_EMAIL}?subject=${encodeURIComponent(
  'Add Clemson ICAR / Deep Orange Tour — APS 2026',
)}`;

const font = {
  fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: APS_BLUE,
  lineHeight: '1.35',
  margin: '0 0 8px',
  ...font,
};

const headingStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  color: DARK_TEXT,
  margin: '0 0 10px',
  lineHeight: '1.3',
  ...font,
};

const bodyStyle: React.CSSProperties = {
  fontSize: '14px',
  color: MUTED_TEXT,
  margin: '0 0 12px',
  lineHeight: '1.6',
  ...font,
};

const metaLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: MUTED_TEXT,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  lineHeight: '1.35',
  margin: '0 0 2px',
  ...font,
};

const metaValueStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: DARK_TEXT,
  margin: '0 0 12px',
  lineHeight: '1.45',
  ...font,
};

function StoreButton({
  href,
  backgroundColor,
  color,
  iconSrc,
  border,
  children,
}: {
  href: string;
  backgroundColor: string;
  color: string;
  iconSrc?: string;
  border?: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor,
        color,
        padding: '12px 20px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 700,
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
        margin: '0 0 10px',
        border: border || '0',
        ...font,
      }}
    >
      {iconSrc ? (
        <Img
          src={iconSrc}
          width='16'
          height='16'
          alt=''
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            marginRight: '8px',
            border: 0,
          }}
        />
      ) : null}
      <span style={{ verticalAlign: 'middle' }}>{children}</span>
    </Button>
  );
}

export const AttendeeInfoEmail = ({
  firstName,
  email,
  tempPassword,
  eventYear = '2026',
  appStoreUrl = 'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
  playStoreUrl = 'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
  webAppUrl = 'https://autopacksummit.expo.app/',
}: AttendeeInfoEmailProps) => {
  const greetingName = firstName?.trim() || 'AutoPack Summit Attendee';
  const hasTempPassword = Boolean(tempPassword && tempPassword.trim());

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          AutoPack Summit {eventYear}: dates, cocktail hour, tour spots, and
          your event app sign-in
        </Preview>
        <Body
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: GRAY_BG,
            ...font,
          }}
        >
          <Container
            style={{
              maxWidth: '600px',
              width: '100%',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              ...font,
            }}
          >
            <Img
              src='https://packschool.s3.us-east-1.amazonaws.com/2026-email-header.png'
              width='100%'
              alt={`Automotive Packaging Summit ${eventYear}`}
              style={{
                display: 'block',
                maxWidth: '600px',
                height: 'auto',
              }}
            />

            <Section
              style={{ padding: '32px 32px 0', textAlign: 'center' as const }}
            >
              <Text style={labelStyle}>Attendee briefing</Text>
              <Text
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 12px',
                  lineHeight: '1.3',
                  ...font,
                }}
              >
                Important Information for Attendees
              </Text>
              <Text
                style={{
                  fontSize: '15px',
                  color: MUTED_TEXT,
                  margin: 0,
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                Dear {greetingName}, we&apos;re excited to welcome you to the{' '}
                {eventYear} Automotive Packaging Summit. Here&apos;s everything
                you need to prepare.
              </Text>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <Row>
                <Column
                  style={{
                    width: '33%',
                    padding: '12px 8px',
                    backgroundColor: GRAY_BG,
                    borderRadius: '8px 0 0 8px',
                    textAlign: 'center' as const,
                    verticalAlign: 'top',
                  }}
                >
                  <Text style={{ ...metaLabelStyle, margin: '0 0 4px' }}>
                    Wed 9/30
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: DARK_TEXT,
                      margin: 0,
                      lineHeight: '1.4',
                      ...font,
                    }}
                  >
                    Tour + kickoff
                  </Text>
                </Column>
                <Column
                  style={{
                    width: '34%',
                    padding: '12px 8px',
                    backgroundColor: '#e8f2f8',
                    textAlign: 'center' as const,
                    verticalAlign: 'top',
                  }}
                >
                  <Text
                    style={{
                      ...metaLabelStyle,
                      color: APS_BLUE,
                      margin: '0 0 4px',
                    }}
                  >
                    Thu 10/1
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: DARK_TEXT,
                      margin: 0,
                      lineHeight: '1.4',
                      ...font,
                    }}
                  >
                    Main program
                  </Text>
                </Column>
                <Column
                  style={{
                    width: '33%',
                    padding: '12px 8px',
                    backgroundColor: GRAY_BG,
                    borderRadius: '0 8px 8px 0',
                    textAlign: 'center' as const,
                    verticalAlign: 'top',
                  }}
                >
                  <Text style={{ ...metaLabelStyle, margin: '0 0 4px' }}>
                    Fri 10/2
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: DARK_TEXT,
                      margin: 0,
                      lineHeight: '1.4',
                      ...font,
                    }}
                  >
                    Tours
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <div
                style={{
                  border: `1px solid ${GRAY_BORDER}`,
                  borderRadius: '12px',
                  padding: '22px 20px 22px',
                }}
              >
                <Text style={labelStyle}>Event dates and location</Text>
                <Text style={headingStyle}>
                  September 30–October 2, {eventYear}
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: DARK_TEXT,
                    margin: '0 0 4px',
                    lineHeight: '1.35',
                    ...font,
                  }}
                >
                  Hyatt Regency Greenville
                </Text>
                <Text style={{ ...metaValueStyle, fontWeight: 600, margin: '0 0 16px' }}>
                  <Link
                    href={HYATT_MAPS}
                    style={{ color: APS_BLUE, textDecoration: 'none' }}
                  >
                    220 North Main Street
                    <br />
                    Greenville, SC 29601
                  </Link>
                </Text>
                <Text
                  style={{
                    fontSize: '13px',
                    color: MUTED_TEXT,
                    margin: '0 0 16px',
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  The main conference program is Thursday, October 1.
                  Registration and continental breakfast begin at{' '}
                  <strong style={{ color: DARK_TEXT }}>7:30 AM</strong>,
                  followed by welcome remarks at{' '}
                  <strong style={{ color: DARK_TEXT }}>8:30 AM</strong>.
                </Text>
                <Button
                  href={AGENDA_URL}
                  style={{
                    backgroundColor: APS_BLUE,
                    color: '#ffffff',
                    padding: '11px 22px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    ...font,
                  }}
                >
                  View the {eventYear} Agenda
                </Button>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <div
                style={{
                  borderLeft: `4px solid ${APS_BLUE}`,
                  backgroundColor: '#f0f7fc',
                  borderRadius: '0 12px 12px 0',
                  padding: '22px 20px 10px',
                }}
              >
                <Text style={labelStyle}>Wednesday evening</Text>
                <Text style={headingStyle}>Kickoff Cocktail Hour</Text>
                <Text style={bodyStyle}>
                  All registered attendees are invited to the official kickoff
                  at New Realm Brewing. Enjoy drinks, heavy hors d&apos;oeuvres,
                  and time with fellow attendees, speakers, and industry
                  leaders.
                </Text>
                <Text style={metaLabelStyle}>When</Text>
                <Text style={metaValueStyle}>
                  Wednesday, September 30 · 6:00–8:00 PM
                </Text>
                <Text style={metaLabelStyle}>Where</Text>
                <Text style={{ ...metaValueStyle, margin: '0 0 8px' }}>
                  <Link
                    href={NEW_REALM_MAPS}
                    style={{ color: APS_BLUE, textDecoration: 'none' }}
                  >
                    New Realm Brewing
                    <br />
                    912 S. Main Street, Greenville, SC 29601
                  </Link>
                </Text>
                <Text
                  style={{
                    fontSize: '13px',
                    color: DARK_TEXT,
                    margin: '0 0 8px',
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  Please look for the <strong>EVITE</strong> invitation in your
                  inbox and RSVP.
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <div
                style={{
                  border: `1px solid #F0D78C`,
                  backgroundColor: '#FFF8E8',
                  borderRadius: '12px',
                  padding: '22px 20px 10px',
                }}
              >
                <Text
                  style={{
                    ...labelStyle,
                    color: '#9A7200',
                  }}
                >
                  Spots still available
                </Text>
                <Text style={headingStyle}>Wednesday Clemson ICAR Tour</Text>
                <Text style={bodyStyle}>
                  A limited number of spaces remain for the Clemson University
                  ICAR and Deep Orange Facility Tour — a behind-the-scenes look
                  at automotive research, advanced vehicle development, and the
                  Deep Orange program.
                </Text>
                <Text style={metaLabelStyle}>When</Text>
                <Text style={metaValueStyle}>
                  Wednesday, September 30 · 11:00 AM–12:30 PM
                </Text>
                <Text style={metaLabelStyle}>Transportation</Text>
                <Text style={metaValueStyle}>Provided</Text>
                <Text style={bodyStyle}>
                  To add the tour to your registration, reply to this email as
                  soon as possible. We will confirm your spot based on
                  availability.
                </Text>
                <Button
                  href={TOUR_MAILTO}
                  style={{
                    backgroundColor: APS_YELLOW,
                    color: DARK_TEXT,
                    padding: '11px 22px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    ...font,
                  }}
                >
                  Request a tour spot
                </Button>
                <Text
                  style={{
                    fontSize: '13px',
                    color: MUTED_TEXT,
                    margin: '14px 0 8px',
                    lineHeight: '1.5',
                    ...font,
                  }}
                >
                  More details:{' '}
                  <Link
                    href={SITE_URL}
                    style={{ color: APS_BLUE, fontWeight: 700 }}
                  >
                    AutoPackSummit.com
                  </Link>
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <div
                style={{
                  borderLeft: `4px solid ${APS_BLUE}`,
                  backgroundColor: '#f0f7fc',
                  borderRadius: '0 12px 12px 0',
                  padding: '22px 20px 10px',
                }}
              >
                <Text style={labelStyle}>Just added</Text>
                <Text style={headingStyle}>BMW iFACTORY Tour</Text>
                <Text
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: APS_BLUE,
                    margin: '0 0 12px',
                    lineHeight: '1.4',
                    ...font,
                  }}
                >
                  Heritage meets Innovation at Plant Spartanburg
                </Text>
                <Text style={bodyStyle}>
                  Newly added to Friday&apos;s agenda: an immersive look at the
                  history, innovation, and people behind BMW&apos;s largest
                  production facility. Explore exhibits on the BMW X models
                  built in Spartanburg, the technologies shaping future
                  manufacturing, and the stories connecting BMW with generations
                  of drivers.
                </Text>
                <Text style={metaLabelStyle}>When</Text>
                <Text style={metaValueStyle}>
                  Friday, October 2 · four time slots
                </Text>
                <Row>
                  <Column
                    style={{
                      width: '50%',
                      verticalAlign: 'top',
                      paddingRight: '6px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '12px 12px 4px',
                        textAlign: 'center' as const,
                        marginBottom: '10px',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: APS_BLUE,
                          margin: '0 0 8px',
                          ...font,
                        }}
                      >
                        9:00–10:30 AM
                      </Text>
                    </div>
                  </Column>
                  <Column
                    style={{
                      width: '50%',
                      verticalAlign: 'top',
                      paddingLeft: '6px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '12px 12px 4px',
                        textAlign: 'center' as const,
                        marginBottom: '10px',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: APS_BLUE,
                          margin: '0 0 8px',
                          ...font,
                        }}
                      >
                        11:00 AM–12:30 PM
                      </Text>
                    </div>
                  </Column>
                </Row>
                <Row>
                  <Column
                    style={{
                      width: '50%',
                      verticalAlign: 'top',
                      paddingRight: '6px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '12px 12px 4px',
                        textAlign: 'center' as const,
                        marginBottom: '10px',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: APS_BLUE,
                          margin: '0 0 8px',
                          ...font,
                        }}
                      >
                        12:00–1:30 PM
                      </Text>
                    </div>
                  </Column>
                  <Column
                    style={{
                      width: '50%',
                      verticalAlign: 'top',
                      paddingLeft: '6px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '12px 12px 4px',
                        textAlign: 'center' as const,
                        marginBottom: '10px',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: APS_BLUE,
                          margin: '0 0 8px',
                          ...font,
                        }}
                      >
                        2:00–3:30 PM
                      </Text>
                    </div>
                  </Column>
                </Row>
                <Text style={bodyStyle}>
                  Register for a time slot on the event agenda.
                </Text>
                <Button
                  href={AGENDA_FRIDAY_URL}
                  style={{
                    backgroundColor: APS_BLUE,
                    color: '#ffffff',
                    padding: '11px 22px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    ...font,
                  }}
                >
                  View Agenda to Register
                </Button>
                <Text
                  style={{
                    fontSize: '13px',
                    color: MUTED_TEXT,
                    margin: '14px 0 8px',
                    lineHeight: '1.5',
                    ...font,
                  }}
                >
                  autopacksummit.com/agenda
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '32px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: '0 0 28px' }} />
              <Text
                style={{ ...labelStyle, textAlign: 'center' as const }}
              >
                Official event app
              </Text>
              <Text
                style={{
                  ...headingStyle,
                  textAlign: 'center' as const,
                  fontSize: '22px',
                }}
              >
                Download the AutoPack Summit App
              </Text>
              <Text
                style={{
                  ...bodyStyle,
                  textAlign: 'center' as const,
                  margin: '0 0 20px',
                }}
              >
                Explore the agenda, connect with attendees, learn about speakers
                and exhibitors, get event updates, and join activities
                throughout the Summit.
              </Text>
              <div
                style={{
                  border: `1px solid ${GRAY_BORDER}`,
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  margin: '0 0 20px',
                  textAlign: 'left' as const,
                }}
              >
                <Text
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: DARK_TEXT,
                    margin: '0 0 6px',
                    lineHeight: '1.4',
                    ...font,
                  }}
                >
                  iPhone users: use the link — the app is not in the public App
                  Store
                </Text>
                <Text
                  style={{
                    fontSize: '13px',
                    color: MUTED_TEXT,
                    margin: 0,
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  Searching the App Store will not find it. Tap the iOS button
                  below, or open this install link on your iPhone:
                </Text>
                {appStoreUrl ? (
                  <Text
                    style={{
                      fontSize: '12px',
                      margin: '8px 0 0',
                      lineHeight: '1.5',
                      wordBreak: 'break-all',
                      ...font,
                    }}
                  >
                    <Link
                      href={appStoreUrl}
                      style={{ color: APS_BLUE, fontWeight: 600 }}
                    >
                      {appStoreUrl}
                    </Link>
                  </Text>
                ) : null}
              </div>

              <StoreButton
                href={appStoreUrl || '#'}
                backgroundColor={DARK_TEXT}
                color='#ffffff'
                iconSrc='https://packschool.s3.us-east-1.amazonaws.com/email-assets/apple-logo-white.png?v=2'
              >
                Download on the App Store
              </StoreButton>
              <StoreButton
                href={playStoreUrl || '#'}
                backgroundColor={APS_BLUE}
                color='#ffffff'
                iconSrc='https://packschool.s3.us-east-1.amazonaws.com/email-assets/android-logo-white.png?v=2'
              >
                Get it on Google Play
              </StoreButton>
              <StoreButton
                href={webAppUrl || '#'}
                backgroundColor='#ffffff'
                color={APS_BLUE}
                border={`2px solid ${APS_BLUE}`}
              >
                Open Web App
              </StoreButton>
              <Text
                style={{
                  fontSize: '12px',
                  color: MUTED_TEXT,
                  textAlign: 'center' as const,
                  margin: '4px 0 0',
                  lineHeight: '1.5',
                  ...font,
                }}
              >
                Prefer the browser? Use the web app on any device.
              </Text>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: `2px solid ${APS_BLUE}`,
                }}
              >
                <div
                  style={{
                    backgroundColor: APS_BLUE,
                    padding: '16px 20px',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: APS_YELLOW,
                      margin: '0 0 6px',
                      ...font,
                    }}
                  >
                    Your sign-in
                  </Text>
                  <Text
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: '0 0 6px',
                      lineHeight: '1.3',
                      ...font,
                    }}
                  >
                    If you haven&apos;t signed in yet
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.9)',
                      margin: 0,
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    Use the temporary password below. If you already created
                    your own, ignore this and sign in with that one.
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '20px',
                  }}
                >
                  <Text style={metaLabelStyle}>Email</Text>
                  <Text
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: DARK_TEXT,
                      margin: '0 0 16px',
                      ...font,
                    }}
                  >
                    {email}
                  </Text>
                  <Text style={metaLabelStyle}>Temporary password</Text>
                  {hasTempPassword ? (
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: `1px solid ${GRAY_BORDER}`,
                        borderRadius: '8px',
                        padding: '12px 14px',
                        margin: '0 0 14px',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: '22px',
                          fontWeight: 700,
                          color: APS_BLUE,
                          margin: 0,
                          lineHeight: '1.4',
                          wordBreak: 'break-all',
                          fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                        }}
                      >
                        {tempPassword}
                      </Text>
                    </div>
                  ) : (
                    <Text style={{ ...bodyStyle, margin: '0 0 14px' }}>
                      A temporary password wasn&apos;t on file for this account.
                      In the app, tap <strong>Forgot Password?</strong> and
                      reset with your registration email.
                    </Text>
                  )}
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: 0,
                      lineHeight: '1.55',
                      ...font,
                    }}
                  >
                    Sign in with the credentials associated with your
                    registration. Need a walk-through?{' '}
                    <Link
                      href={APP_GUIDE_URL}
                      style={{ color: APS_BLUE, fontWeight: 700 }}
                    >
                      Open the Event App Guide
                    </Link>
                    .
                  </Text>
                </div>
              </div>
            </Section>

            <Section style={{ padding: '32px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: '0 0 28px' }} />
              <Text style={labelStyle}>Thursday, October 1</Text>
              <Text style={headingStyle}>Meals and Reception</Text>
              <Text style={{ ...bodyStyle, margin: 0 }}>
                Thursday&apos;s program includes a continental breakfast, lunch,
                networking breaks with refreshments, and an evening cocktail
                reception with hors d&apos;oeuvres from{' '}
                <strong style={{ color: DARK_TEXT }}>5:00 to 7:00 PM</strong> at
                the Hyatt.
              </Text>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <Row>
                <Column
                  style={{
                    width: '50%',
                    verticalAlign: 'top',
                    paddingRight: '10px',
                  }}
                >
                  <div
                    style={{
                      border: `1px solid ${GRAY_BORDER}`,
                      borderRadius: '12px',
                      padding: '16px 16px 4px',
                    }}
                  >
                    <Text style={labelStyle}>Attire</Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: MUTED_TEXT,
                        margin: '0 0 8px',
                        lineHeight: '1.55',
                        ...font,
                      }}
                    >
                      Business casual is recommended. If you are participating
                      in a facility tour, wear comfortable clothing and walking
                      shoes.
                    </Text>
                  </div>
                </Column>
                <Column
                  style={{
                    width: '50%',
                    verticalAlign: 'top',
                    paddingLeft: '10px',
                  }}
                >
                  <div
                    style={{
                      border: `1px solid ${GRAY_BORDER}`,
                      borderRadius: '12px',
                      padding: '16px 16px 4px',
                    }}
                  >
                    <Text style={labelStyle}>Parking</Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: MUTED_TEXT,
                        margin: '0 0 8px',
                        lineHeight: '1.55',
                        ...font,
                      }}
                    >
                      Self-parking in the Hyatt garage is{' '}
                      <strong style={{ color: DARK_TEXT }}>$10/day</strong>.
                      Park front-in — reverse parking is not permitted. Rates
                      are subject to change.
                    </Text>
                  </div>
                </Column>
              </Row>
            </Section>

            <Section
              style={{
                backgroundColor: APS_BLUE,
                padding: '32px',
                marginTop: '32px',
                textAlign: 'center' as const,
              }}
            >
              <Text
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 12px',
                  ...font,
                }}
              >
                We look forward to seeing you in Greenville!
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.9)',
                  margin: '0 0 8px',
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                Questions before the event? Contact Bianca at{' '}
                <Link
                  href={`mailto:${BIANCA_EMAIL}`}
                  style={{
                    color: APS_YELLOW,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  Bianca@PackagingSchool.com
                </Link>
                .
              </Text>
              <Text
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0,
                  ...font,
                }}
              >
                The AutoPack Summit Team
              </Text>
            </Section>

            <Section style={{ padding: '16px 32px' }}>
              <Row>
                <Column style={{ verticalAlign: 'middle' }}>
                  <Img
                    src='https://packschool.s3.amazonaws.com/aps-logo-email.png'
                    width={100}
                    height={26}
                    alt='AutoPack Summit'
                    style={{ display: 'inline-block', marginRight: '12px' }}
                  />
                  <Img
                    src='https://packschool.s3.us-east-1.amazonaws.com/ps-square150x.png'
                    width={26}
                    height={26}
                    alt='Packaging School'
                    style={{ display: 'inline-block' }}
                  />
                </Column>
                <Column
                  style={{
                    textAlign: 'right' as const,
                    verticalAlign: 'middle',
                  }}
                >
                  <Link href={SITE_URL} style={{ textDecoration: 'none' }}>
                    <Text
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: APS_BLUE,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.5px',
                        margin: 0,
                        ...font,
                      }}
                    >
                      AutoPackSummit.com
                    </Text>
                  </Link>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

AttendeeInfoEmail.PreviewProps = {
  firstName: 'Jamie',
  email: 'jamie@example.com',
  tempPassword: 'Aps!exampleTemp9Z',
  eventYear: '2026',
  appStoreUrl:
    'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
  webAppUrl: 'https://autopacksummit.expo.app/',
} satisfies AttendeeInfoEmailProps;

export default AttendeeInfoEmail;
