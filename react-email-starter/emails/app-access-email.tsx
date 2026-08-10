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

export type AppAccessEmailProps = {
  firstName: string;
  email: string;
  tempPassword?: string | null;
  eventYear?: string;
  /** Registrant dashboard URL for "View Dashboard" (tours) CTA */
  dashboardUrl?: string | null;
  /** Optional App Store URL — leave empty to hide the button */
  appStoreUrl?: string | null;
  /** Optional Google Play URL — leave empty to hide the button */
  playStoreUrl?: string | null;
};

const APS_BLUE = '#005a94';
const APS_YELLOW = '#E4A800';
const GRAY_BG = '#f3f4f6';
const GRAY_BORDER = '#e5e7eb';
const DARK_TEXT = '#111827';
const MUTED_TEXT = '#6b7280';

const font = {
  fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
};

const APP_GUIDE_URL = 'https://autopacksummit.com/appguide';

const SCREENSHOTS = [
  {
    src: 'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/hub.png',
    alt: 'Automotive Packaging Summit app Hub screen',
  },
  {
    src: 'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/agenda.png',
    alt: 'Automotive Packaging Summit app Agenda screen',
  },
  {
    src: 'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/passport.png',
    alt: 'Automotive Packaging Summit app Passport Challenge screen',
  },
] as const;

const FEATURES = [
  {
    title: 'Your personal Hub',
    body: 'Countdown to Greenville, live and upcoming sessions, and quick shortcuts customized for how you work the show floor.',
  },
  {
    title: 'Agenda that stays with you',
    body: 'Browse the full schedule by day, favorite the sessions that matter, and jump into live presentations when they start.',
  },
  {
    title: 'Network with purpose',
    body: 'Explore the attendee community, scan QR codes to connect, send contact requests, and message people you meet — all in one place.',
  },
  {
    title: 'Never miss an update',
    body: 'Official announcements and notifications keep you current on schedule changes, opportunities, and event news.',
  },
  {
    title: 'Passport Challenge',
    body: 'Visit exhibitors, collect stamps, and track your progress as you make the most of the show floor.',
  },
] as const;

export const AppAccessEmail = ({
  firstName,
  email,
  tempPassword,
  eventYear = '2026',
  dashboardUrl,
  appStoreUrl,
  playStoreUrl,
}: AppAccessEmailProps) => {
  const name = firstName?.trim() || 'there';
  const hasTempPassword = Boolean(tempPassword && tempPassword.trim());
  const hasStoreLinks = Boolean(appStoreUrl || playStoreUrl);
  const toursDashboardUrl =
    dashboardUrl || 'https://www.autopacksummit.com';

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          Your Automotive Packaging Summit {eventYear} event app access is
          ready — sign in and explore.
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
              src="https://packschool.s3.us-east-1.amazonaws.com/2026-email-header.png"
              width="100%"
              alt={`Automotive Packaging Summit ${eventYear}`}
              style={{
                display: 'block',
                maxWidth: '600px',
                height: 'auto',
              }}
            />

            <Section
              style={{ padding: '36px 32px 0', textAlign: 'center' as const }}
            >
              <Text
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: APS_BLUE,
                  margin: '0 0 12px',
                  ...font,
                }}
              >
                Official event app
              </Text>
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
                {name}, your APS {eventYear} app access is ready
              </Text>
              <Text
                style={{
                  fontSize: '15px',
                  color: MUTED_TEXT,
                  margin: '0 0 8px',
                  lineHeight: '1.55',
                  ...font,
                }}
              >
                The Automotive Packaging Summit app is your invite-only
                companion for Greenville — built for attendees to stay on
                schedule, connect with the right people, and get more from
                every session and conversation.
              </Text>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <div
                style={{
                  border: `1px solid ${GRAY_BORDER}`,
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  padding: '24px',
                }}
              >
                <Text
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: DARK_TEXT,
                    margin: '0 0 8px',
                    ...font,
                  }}
                >
                  Your sign-in details
                </Text>
                <Text
                  style={{
                    fontSize: '14px',
                    color: MUTED_TEXT,
                    margin: '0 0 16px',
                    lineHeight: '1.5',
                    ...font,
                  }}
                >
                  Use these credentials the first time you open the app. You’ll
                  be asked to create your own password right away.
                </Text>

                <Text
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: MUTED_TEXT,
                    margin: '0 0 4px',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.06em',
                    ...font,
                  }}
                >
                  Email
                </Text>
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

                <Text
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: MUTED_TEXT,
                    margin: '0 0 4px',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.06em',
                    ...font,
                  }}
                >
                  Temporary password
                </Text>
                {hasTempPassword ? (
                  <Text
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: APS_BLUE,
                      margin: '0 0 12px',
                      letterSpacing: '0.02em',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    }}
                  >
                    {tempPassword}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: '14px',
                      color: MUTED_TEXT,
                      margin: '0 0 12px',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    A temporary password wasn’t available for this account. In
                    the app, tap <strong>Forgot Password?</strong> and reset
                    with your registration email.
                  </Text>
                )}

                <Text
                  style={{
                    fontSize: '12px',
                    color: MUTED_TEXT,
                    margin: 0,
                    lineHeight: '1.5',
                    ...font,
                  }}
                >
                  Tip: after you set your own password, you can always reset it
                  later from the sign-in screen.
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '28px 24px 0' }}>
              <Row>
                {SCREENSHOTS.map((shot) => (
                  <Column
                    key={shot.src}
                    style={{
                      width: '33.33%',
                      padding: '0 6px',
                      verticalAlign: 'top',
                    }}
                  >
                    <Img
                      src={shot.src}
                      width="100%"
                      alt={shot.alt}
                      style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '160px',
                        height: 'auto',
                        margin: '0 auto',
                        borderRadius: '12px',
                        border: `1px solid ${GRAY_BORDER}`,
                        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
                      }}
                    />
                  </Column>
                ))}
              </Row>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <Text
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: MUTED_TEXT,
                  margin: '0 0 8px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  ...font,
                }}
              >
                How to get started
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  color: DARK_TEXT,
                  margin: '0 0 6px',
                  lineHeight: '1.55',
                  ...font,
                }}
              >
                1. Download the Automotive Packaging Summit app
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  color: DARK_TEXT,
                  margin: '0 0 6px',
                  lineHeight: '1.55',
                  ...font,
                }}
              >
                2. Sign in with your email and temporary password
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  color: DARK_TEXT,
                  margin: '0 0 0',
                  lineHeight: '1.55',
                  ...font,
                }}
              >
                3. Create your own password when prompted — then you’re in
              </Text>
            </Section>

            {hasStoreLinks ? (
              <Section
                style={{
                  padding: '24px 32px 0',
                  textAlign: 'center' as const,
                }}
              >
                {appStoreUrl ? (
                  <Button
                    href={appStoreUrl}
                    style={{
                      backgroundColor: APS_BLUE,
                      color: '#ffffff',
                      padding: '12px 20px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      margin: '0 6px 8px',
                      ...font,
                    }}
                  >
                    <Img
                      src="https://packschool.s3.us-east-1.amazonaws.com/email-assets/apple-logo-white.png?v=2"
                      width="18"
                      height="18"
                      alt=""
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        marginRight: '8px',
                        border: 0,
                      }}
                    />
                    <span style={{ verticalAlign: 'middle' }}>
                      Download on the App Store
                    </span>
                  </Button>
                ) : null}
                {playStoreUrl ? (
                  <Button
                    href={playStoreUrl}
                    style={{
                      backgroundColor: DARK_TEXT,
                      color: '#ffffff',
                      padding: '12px 20px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      margin: '0 6px 8px',
                      ...font,
                    }}
                  >
                    <Img
                      src="https://packschool.s3.us-east-1.amazonaws.com/email-assets/android-logo-white.png?v=2"
                      width="18"
                      height="18"
                      alt=""
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        marginRight: '8px',
                        border: 0,
                      }}
                    />
                    <span style={{ verticalAlign: 'middle' }}>
                      Get it on Google Play
                    </span>
                  </Button>
                ) : null}
              </Section>
            ) : (
              <Section style={{ padding: '24px 32px 0' }}>
                <Text
                  style={{
                    fontSize: '14px',
                    color: MUTED_TEXT,
                    margin: 0,
                    lineHeight: '1.5',
                    textAlign: 'center' as const,
                    ...font,
                  }}
                >
                  Search <strong>Automotive Packaging Summit</strong> in the App
                  Store or Google Play, or use the download link from your event
                  communications.
                </Text>
              </Section>
            )}

            <Section style={{ padding: '32px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: 0 }} />
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 8px',
                  ...font,
                }}
              >
                What you can do in the app
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  color: MUTED_TEXT,
                  margin: '0 0 20px',
                  lineHeight: '1.5',
                  ...font,
                }}
              >
                Everything you need on-site — without digging through email
                threads or paper agendas.
              </Text>

              {FEATURES.map((feature) => (
                <div key={feature.title} style={{ marginBottom: '18px' }}>
                  <Text
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: DARK_TEXT,
                      margin: '0 0 4px',
                      ...font,
                    }}
                  >
                    <span style={{ color: APS_YELLOW, marginRight: '8px' }}>
                      ■
                    </span>
                    {feature.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: '14px',
                      color: MUTED_TEXT,
                      margin: 0,
                      lineHeight: '1.55',
                      paddingLeft: '20px',
                      ...font,
                    }}
                  >
                    {feature.body}
                  </Text>
                </div>
              ))}
            </Section>

            <Section
              style={{
                padding: '8px 32px 0',
                textAlign: 'center' as const,
              }}
            >
              <Text
                style={{
                  fontSize: '14px',
                  color: MUTED_TEXT,
                  margin: '0 0 16px',
                  lineHeight: '1.5',
                  ...font,
                }}
              >
                Want the full walkthrough? The official app guide covers sign-in,
                networking, Passport, and more.
              </Text>
              <Button
                href={APP_GUIDE_URL}
                style={{
                  backgroundColor: APS_BLUE,
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  ...font,
                }}
              >
                Open the App Guide
              </Button>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <div
                style={{
                  borderLeft: `4px solid ${APS_BLUE}`,
                  padding: '12px 16px',
                  backgroundColor: '#f0f7fc',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                <Text
                  style={{
                    fontSize: '14px',
                    color: DARK_TEXT,
                    margin: 0,
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  <strong>Pro move before you arrive:</strong> complete your
                  profile, turn on notifications, and favorite the sessions and
                  people you don’t want to miss.
                </Text>
              </div>
            </Section>

            {/* App sponsor callout — Packaging School */}
            <Section style={{ padding: '20px 32px 0' }}>
              <div
                style={{
                  borderRadius: '12px',
                  backgroundColor: '#FFF8E8',
                  border: `1px solid #F0D78C`,
                  padding: '20px 18px',
                }}
              >
                <Row>
                  <Column
                    style={{
                      width: '36%',
                      verticalAlign: 'middle',
                      paddingLeft: '4px',
                      paddingRight: '16px',
                      textAlign: 'center' as const,
                    }}
                  >
                    <Link href="https://www.packagingschool.com">
                      <Img
                        src="https://packschool.s3.us-east-1.amazonaws.com/ps-square150x.png"
                        width={120}
                        height={120}
                        alt="Packaging School"
                        style={{
                          display: 'block',
                          margin: '0 auto',
                          borderRadius: 0,
                        }}
                      />
                    </Link>
                  </Column>
                  <Column
                    style={{
                      width: '64%',
                      verticalAlign: 'middle',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: MUTED_TEXT,
                        margin: '0 0 6px',
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.08em',
                        ...font,
                      }}
                    >
                      App sponsor
                    </Text>
                    <Text
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: DARK_TEXT,
                        margin: '0 0 8px',
                        lineHeight: '1.35',
                        ...font,
                      }}
                    >
                      Thank you to our app sponsor,{' '}
                      <Link
                        href="https://www.packagingschool.com"
                        style={{
                          color: APS_BLUE,
                          textDecoration: 'none',
                        }}
                      >
                        PackagingSchool.com
                      </Link>
                    </Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: MUTED_TEXT,
                        margin: '0 0 14px',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Learn the language of packaging. Make better packaging
                      decisions.
                    </Text>
                    <Button
                      href="https://www.packagingschool.com"
                      style={{
                        backgroundColor: APS_YELLOW,
                        color: DARK_TEXT,
                        padding: '10px 18px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        ...font,
                      }}
                    >
                      Visit them at Booth 33
                    </Button>
                  </Column>
                </Row>
              </div>
            </Section>

            {/* Hotel & Travel / Tours — two columns */}
            <Section style={{ padding: '28px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: '0 0 28px' }} />
              <Row>
                <Column
                  style={{
                    width: '50%',
                    verticalAlign: 'top',
                    paddingRight: '12px',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: DARK_TEXT,
                      margin: '0 0 10px',
                      ...font,
                    }}
                  >
                    Hotel and Travel
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0 0 16px',
                      lineHeight: '1.6',
                      ...font,
                    }}
                  >
                    Please book your accommodation using the discounted AutoPack
                    Summit room block (G-APSU) at the host hotel, Hyatt Regency
                    Downtown Greenville, SC, before the cutoff date of September
                    6, 2026 at 11:59 PM EST. Please plan to arrive on Wednesday,
                    September 30, with the event running through Friday, October
                    2.
                  </Text>
                  <Button
                    href="https://www.hyatt.com/en-US/group-booking/GSPRG/G-APSM"
                    style={{
                      backgroundColor: APS_BLUE,
                      color: '#ffffff',
                      padding: '10px 22px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      ...font,
                    }}
                  >
                    Book Hotel
                  </Button>
                </Column>
                <Column
                  style={{
                    width: '50%',
                    verticalAlign: 'top',
                    paddingLeft: '12px',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: DARK_TEXT,
                      margin: '0 0 10px',
                      ...font,
                    }}
                  >
                    Tours
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0 0 16px',
                      lineHeight: '1.6',
                      ...font,
                    }}
                  >
                    We will be hosting off-site tours on Wednesday, Sep 30th
                    &amp; Friday, October 2nd. Tour registrations might have a
                    separate fee (as indicated). Tour registrations are
                    non-transferable and non-refundable. If you did not add a
                    tour when you registered for the event please click on the
                    link below to modify your registration.
                  </Text>
                  <Button
                    href={toursDashboardUrl}
                    style={{
                      backgroundColor: APS_BLUE,
                      color: '#ffffff',
                      padding: '10px 22px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      ...font,
                    }}
                  >
                    View Dashboard
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* Registration Cancellation */}
            <Section style={{ padding: '28px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: '0 0 24px' }} />
              <Text
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 10px',
                  ...font,
                }}
              >
                Registration Cancellation
              </Text>
              <Text
                style={{
                  fontSize: '13px',
                  color: MUTED_TEXT,
                  margin: '0 0 6px',
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                If your plans change and you can no longer attend the event,
                please contact{' '}
                <Link
                  href="mailto:events@packagingschool.com"
                  style={{ color: APS_BLUE, textDecoration: 'underline' }}
                >
                  events@packagingschool.com
                </Link>{' '}
                to notify us of your cancellation. This will help us plan our
                space more accurately.
              </Text>
              <Text
                style={{
                  fontSize: '13px',
                  color: MUTED_TEXT,
                  margin: '0',
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                <strong style={{ color: DARK_TEXT }}>
                  Registration Close Date:
                </strong>{' '}
                Sunday, October 27th 2026
              </Text>
            </Section>

            {/* Blue "See you in Greenville" banner */}
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
                We&apos;ll see you in Greenville!
              </Text>
              <Text
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.85)',
                  margin: '0 0 4px',
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                For event details, please visit the{' '}
                <Link
                  href="https://www.autopacksummit.com"
                  style={{
                    color: APS_YELLOW,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  AutopackSummit.com
                </Link>
                .
              </Text>
              <Text
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.85)',
                  margin: '0 0 8px',
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                For additional questions, please contact{' '}
                <Link
                  href="mailto:info@packagingschool.com"
                  style={{
                    color: APS_YELLOW,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  info@packagingschool.com
                </Link>
                .
              </Text>
              <Text
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.85)',
                  margin: 0,
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                Need app help?{' '}
                <Link
                  href={APP_GUIDE_URL}
                  style={{
                    color: APS_YELLOW,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  Open the App Guide
                </Link>
                .
              </Text>
            </Section>

            {/* Bottom footer with logos */}
            <Section style={{ padding: '16px 32px' }}>
              <Row>
                <Column style={{ verticalAlign: 'middle' }}>
                  <Img
                    src="https://packschool.s3.amazonaws.com/aps-logo-email.png"
                    width={100}
                    height={26}
                    alt="AutoPack Summit"
                    style={{ display: 'inline-block', marginRight: '12px' }}
                  />
                  <Img
                    src="https://packschool.s3.us-east-1.amazonaws.com/ps-square150x.png"
                    width={26}
                    height={26}
                    alt="Packaging School"
                    style={{ display: 'inline-block' }}
                  />
                </Column>
                <Column
                  style={{
                    textAlign: 'right' as const,
                    verticalAlign: 'middle',
                  }}
                >
                  <Link
                    href="https://www.packagingschool.com"
                    style={{ textDecoration: 'none' }}
                  >
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
                      Powered by PackagingSchool.com&reg;
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

AppAccessEmail.PreviewProps = {
  firstName: 'Jamie',
  email: 'jamie@example.com',
  tempPassword: 'Aps!exampleTemp9Z',
  eventYear: '2026',
  dashboardUrl:
    'https://www.autopacksummit.com/registrants/4e041c79-2aba-4198-a01b-8576cc58a1fd',
  appStoreUrl:
    'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
} satisfies AppAccessEmailProps;

export default AppAccessEmail;
