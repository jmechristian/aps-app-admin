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

export type AppGuideEmailProps = {
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

const SITE_URL = 'https://www.autopacksummit.com';
const BIANCA_EMAIL = 'bianca@packagingschool.com';

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

/** iPhone screenshot ratio from the Hub capture (~402×844). */
const PHONE_WIDTH = 248;
const PHONE_HEIGHT = 520;

function ScreenshotSlot({ label, src }: { label: string; src?: string }) {
  if (src) {
    return (
      <Img
        src={src}
        width={PHONE_WIDTH}
        alt={label}
        style={{
          display: 'block',
          width: `${PHONE_WIDTH}px`,
          maxWidth: '100%',
          height: 'auto',
          margin: '0 auto',
          border: 0,
          borderRadius: '22px',
        }}
      />
    );
  }
  return (
    <div style={{ textAlign: 'center' as const }}>
      <div
        style={{
          width: `${PHONE_WIDTH}px`,
          maxWidth: '100%',
          height: `${PHONE_HEIGHT}px`,
          margin: '0 auto',
          backgroundColor: '#0b1f33',
          border: '8px solid #111827',
          borderRadius: '28px',
          overflow: 'hidden',
          boxSizing: 'border-box' as const,
        }}
      >
        <Text
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: '#93c5fd',
            margin: '210px 12px 6px',
            ...font,
          }}
        >
          Screenshot
        </Text>
        <Text
          style={{
            fontSize: '12px',
            color: '#e5e7eb',
            margin: '0 12px',
            lineHeight: '1.45',
            ...font,
          }}
        >
          {label}
        </Text>
      </div>
    </div>
  );
}

function ScreenshotRow({
  left,
  right,
  leftSrc,
  rightSrc,
}: {
  left: string;
  right: string;
  leftSrc?: string;
  rightSrc?: string;
}) {
  return (
    <Row>
      <Column
        style={{
          width: '50%',
          verticalAlign: 'top',
          paddingRight: '6px',
        }}
      >
        <ScreenshotSlot label={left} src={leftSrc} />
      </Column>
      <Column
        style={{
          width: '50%',
          verticalAlign: 'top',
          paddingLeft: '6px',
        }}
      >
        <ScreenshotSlot label={right} src={rightSrc} />
      </Column>
    </Row>
  );
}

function Step({
  number,
  title,
  children,
  screenshots,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  screenshots?: { left: string; right: string; leftSrc?: string; rightSrc?: string };
}) {
  return (
    <Section style={{ padding: '28px 32px 0' }}>
      <Text style={labelStyle}>Step {number}</Text>
      <Text style={headingStyle}>{title}</Text>
      {children}
      {screenshots ? (
        <ScreenshotRow
          left={screenshots.left}
          right={screenshots.right}
          leftSrc={screenshots.leftSrc}
          rightSrc={screenshots.rightSrc}
        />
      ) : null}
    </Section>
  );
}

export const AppGuideEmail = ({
  firstName,
  email,
  tempPassword,
  eventYear = '2026',
  appStoreUrl = 'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
  playStoreUrl = 'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
  webAppUrl = 'https://autopacksummit.expo.app/',
}: AppGuideEmailProps) => {
  const greetingName = firstName?.trim() || 'AutoPack Summit Attendee';
  const hasTempPassword = Boolean(tempPassword && tempPassword.trim());

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          How to use the AutoPack Summit {eventYear} app: sign in, set up your
          profile, connect, and join the Passport Challenge
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

            <Section style={{ padding: '36px 32px 0' }}>
              <Text style={labelStyle}>Event app guide</Text>
              <Text
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 14px',
                  lineHeight: '1.2',
                  ...font,
                }}
              >
                Get set up before you arrive
              </Text>
              <Text style={bodyStyle}>
                Dear {greetingName},
              </Text>
              <Text style={{ ...bodyStyle, margin: 0 }}>
                The AutoPack Summit app is how you sign in, set up your profile,
                connect with other attendees, work the Passport Challenge, and
                follow sessions live, and claim your t-shirt. Walk through these
                steps in order. Each one has a pair of screenshots so you can
                match what you see on your phone.
              </Text>
            </Section>

            <Step number='1' title='Download the app, or open the web app'>
              <Text style={bodyStyle}>
                Install the app on your phone, or use the web app in a browser
                on any device. All three links below open the same event app.
              </Text>
              <div
                style={{
                  border: `1px solid ${GRAY_BORDER}`,
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  margin: '0 0 16px',
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
                  below, or open this install link on your iPhone.
                </Text>
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
            </Step>

            <Step
              number='2'
              title='Sign in with your temporary password'
              screenshots={{
                left: 'Sign in screen',
                right: 'Set a new password',
                leftSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/login1.PNG',
                rightSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/login2.PNG',
              }}
            >
              <Text style={bodyStyle}>
                Sign in with the email on your registration. Use the temporary
                password only if you have not signed in yet. If you already
                created your own password, keep using that one.
              </Text>
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: `2px solid ${APS_BLUE}`,
                  margin: '0 0 16px',
                }}
              >
                <div
                  style={{
                    backgroundColor: APS_BLUE,
                    padding: '14px 16px',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: APS_YELLOW,
                      margin: 0,
                      ...font,
                    }}
                  >
                    Your sign-in
                  </Text>
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
                  <Text style={metaLabelStyle}>Email</Text>
                  <Text
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: DARK_TEXT,
                      margin: '0 0 14px',
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
                    <Text style={{ ...bodyStyle, margin: 0 }}>
                      A temporary password wasn&apos;t on file for this account.
                      In the app, tap <strong>Forgot Password?</strong> and
                      reset with your registration email.
                    </Text>
                  )}
                </div>
              </div>
            </Step>

            <Step
              number='3'
              title='Set up your profile'
              screenshots={{
                left: 'Your profile and area of expertise',
                right: 'Choose areas of expertise',
                leftSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/profile1.PNG',
                rightSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/profile2.PNG',
              }}
            >
              <Text style={bodyStyle}>
                Upload or take a profile photo, then choose your area of
                expertise. Other attendees search the Community tab by
                expertise, so this is how people find you.
              </Text>
              <Text style={{ ...bodyStyle, margin: '0 0 16px' }}>
                Fill out the rest of the profile from there — the screenshots
                show every field that is included. Exhibitors should also
                complete the exhibitor profile so attendees can browse your
                company before they visit the booth.
              </Text>
            </Step>

            <Step
              number='4'
              title='Connect with other attendees'
              screenshots={{
                left: 'Capture Contact from the Hub',
                right: 'Send a contact request',
                leftSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/cap-contact.png',
                rightSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/contact2.png',
              }}
            >
              <Text style={bodyStyle}>
                There are two ways to connect. Send an intro message and a
                contact request from someone&apos;s profile, or scan their
                personal QR code from the Hub with Capture Contact.
              </Text>
              <Text style={{ ...bodyStyle, margin: '0 0 16px' }}>
                Connecting is the fastest way to move up the leaderboard.
                Other attendees can also scan your code from the Hub to
                connect with you.
              </Text>
            </Step>

            <Step
              number='5'
              title='Browse exhibitors and join the Passport Challenge'
              screenshots={{
                left: 'Scan Exhibitor from the Hub',
                right: 'Passport Challenge progress',
                leftSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/scan-exhibitor.png',
                rightSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/passport2.PNG',
              }}
            >
              <Text style={bodyStyle}>
                Open exhibitor profiles, favorite the ones you want to see, and
                visit their booth to scan the passport QR code. That code is
                different from the personal QR codes attendees use to connect.
                The codes you need for the challenge are at the exhibitor
                booths.
              </Text>
              <div
                style={{
                  borderLeft: `4px solid ${APS_YELLOW}`,
                  backgroundColor: '#fffbeb',
                  borderRadius: '0 10px 10px 0',
                  padding: '12px 14px',
                  margin: '0 0 16px',
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
                  Passport Challenge
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
                  Scan with the Scan Exhibitor button on the Hub, or from the
                  Passport Challenge screen. Open that screen from the module
                  on the Hub or from the Engage screen.
                </Text>
              </div>
            </Step>

            <Step
              number='6'
              title='Check the leaderboard'
              screenshots={{
                left: 'Leaderboard',
                right: 'How your points add up',
                leftSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/leadeboard1.PNG',
                rightSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/leaderboard2.PNG',
              }}
            >
              <Text style={{ ...bodyStyle, margin: '0 0 16px' }}>
                The leaderboard shows where you stand, and your own breakdown
                shows how the points add up. Making contacts, using the app,
                and completing the Passport Challenge are the main ways to
                score big.
              </Text>
            </Step>

            <Step
              number='7'
              title='Follow the event live'
              screenshots={{
                left: 'Open a session presentation',
                right: 'Follow the live presentation',
                leftSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/presentation1.png',
                rightSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/presentation2.PNG',
              }}
            >
              <Text style={{ ...bodyStyle, margin: '0 0 16px' }}>
                The countdown on the Hub switches to LIVE once sessions start.
                That opens a link so you can follow along and interact with the
                session in real time. Each session also has a play button that
                opens the live show.
              </Text>
            </Step>

            <Step
              number='8'
              title='Fill out the post-event survey'
              screenshots={{
                left: 'Post Event Survey on the Hub',
                right: 'Survey complete — show this for your t-shirt',
                leftSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/post-event1.png',
                rightSrc:
                  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/post-event2.PNG',
              }}
            >
              <Text style={{ ...bodyStyle, margin: '0 0 16px' }}>
                This unlocks closer to the event. Fill out the survey and tell
                us how it went, then present the confirmation screen at the
                registration desk for a free Automotive Packaging Summit
                t-shirt.
              </Text>
            </Step>

            <Section style={{ padding: '28px 32px 8px' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: '0 0 20px' }} />
              <Text
                style={{
                  fontSize: '13px',
                  color: MUTED_TEXT,
                  margin: 0,
                  lineHeight: '1.55',
                  ...font,
                }}
              >
                Questions? Write{' '}
                <Link
                  href={`mailto:${BIANCA_EMAIL}`}
                  style={{ color: APS_BLUE, fontWeight: 700 }}
                >
                  {BIANCA_EMAIL}
                </Link>
                .
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '16px 0 0',
                  ...font,
                }}
              >
                The AutoPack Summit Team
              </Text>
            </Section>

            <Section style={{ padding: '16px 32px 24px' }}>
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

AppGuideEmail.PreviewProps = {
  firstName: 'Jamie',
  email: 'jamie@example.com',
  tempPassword: 'Aps!exampleTemp9Z',
  eventYear: '2026',
  appStoreUrl:
    'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
  webAppUrl: 'https://autopacksummit.expo.app/',
} satisfies AppGuideEmailProps;

export default AppGuideEmail;
