import {
  Body,
  Button,
  Column,
  Container,
  Head,
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

export type AppSigninEmailProps = {
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

const bodyStyle: React.CSSProperties = {
  fontSize: '15px',
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

export const AppSigninEmail = ({
  firstName,
  email,
  tempPassword,
  eventYear = '2026',
  appStoreUrl = 'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
  playStoreUrl = 'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
  webAppUrl = 'https://autopacksummit.expo.app/',
}: AppSigninEmailProps) => {
  const greetingName = firstName?.trim() || 'AutoPack Summit Attendee';
  const hasTempPassword = Boolean(tempPassword && tempPassword.trim());

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          Your temporary password, app download links, and how to reset from
          the app if sign-in does not work
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
              <Text
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: APS_BLUE,
                  lineHeight: '1.35',
                  margin: '0 0 8px',
                  ...font,
                }}
              >
                Event app sign-in
              </Text>
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
                Your temporary password
              </Text>
              <Text style={bodyStyle}>Dear {greetingName},</Text>
              <Text style={{ ...bodyStyle, margin: 0 }}>
                Here is your temporary password for the AutoPack Summit{' '}
                {eventYear} app, along with the download links. Use it only if
                you have not signed in yet. If you already created your own
                password, keep using that one.
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
                      fontSize: '16px',
                      color: 'rgba(255,255,255,0.92)',
                      margin: 0,
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    Sign in with the email on your registration.
                  </Text>
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '20px' }}>
                  <Text style={metaLabelStyle}>Email</Text>
                  <Text
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: DARK_TEXT,
                      margin: '0 0 16px',
                      lineHeight: '1.4',
                      wordBreak: 'break-all',
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
                        padding: '14px 16px',
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
                      reset with your registration email. Make sure to check
                      your spam folder for the reset message.
                    </Text>
                  )}
                </div>
              </div>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <Text
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 10px',
                  lineHeight: '1.3',
                  ...font,
                }}
              >
                Download the app
              </Text>
              <Text style={bodyStyle}>
                Install the app on your phone, or open the web app in a
                browser. All three links open the same event app.
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
            </Section>

            <Section style={{ padding: '20px 32px 0' }}>
              <div
                style={{
                  borderLeft: `4px solid ${APS_YELLOW}`,
                  backgroundColor: '#fffbeb',
                  borderRadius: '0 10px 10px 0',
                  padding: '16px 18px',
                }}
              >
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
                  If the temporary password does not work
                </Text>
                <Text
                  style={{
                    fontSize: '14px',
                    color: MUTED_TEXT,
                    margin: '0 0 8px',
                    lineHeight: '1.6',
                    ...font,
                  }}
                >
                  Open the app and tap <strong>Forgot Password?</strong> on the
                  sign-in screen. Enter the email on your registration, then
                  follow the reset link to choose a new password.
                </Text>
                <Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: DARK_TEXT,
                    margin: 0,
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  Make sure to check your spam folder. The reset email often
                  lands there.
                </Text>
              </div>
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
                  fontSize: '20px',
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
                Questions? Contact Bianca at{' '}
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

AppSigninEmail.PreviewProps = {
  firstName: 'Jamie',
  email: 'jamie@example.com',
  tempPassword: 'Aps!exampleTemp9Z',
  eventYear: '2026',
  appStoreUrl:
    'https://apps.apple.com/us/app/automotive-packaging-summit/id6761734425',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.packagingschool.autopacksummit',
  webAppUrl: 'https://autopacksummit.expo.app/',
} satisfies AppSigninEmailProps;

export default AppSigninEmail;
