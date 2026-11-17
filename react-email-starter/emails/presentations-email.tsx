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

export type PresentationsEmailProps = {
  firstName?: string | null;
  eventYear?: string;
};

const APS_BLUE = '#005a94';
const APS_YELLOW = '#E4A800';
const GRAY_BG = '#f3f4f6';
const DARK_TEXT = '#111827';
const MUTED_TEXT = '#6b7280';
const CERTIFICATE_SLATE = '#3E5162';

const SITE_URL = 'https://www.autopacksummit.com';
const BIANCA_EMAIL = 'bianca@packagingschool.com';
const MEDIA_URL = 'https://packagingschool.com/events/aps-2026';
const PRESENTATIONS_URL = `${MEDIA_URL}#presentations`;
const CERTIFICATE_URL = `${MEDIA_URL}#certificate`;
const PRESENTATIONS_SCREENSHOT =
  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/screenshots/aps-presnetation-screenshot.png';

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

const bodyStyle: React.CSSProperties = {
  fontSize: '15px',
  color: MUTED_TEXT,
  margin: '0 0 16px',
  lineHeight: '1.6',
  ...font,
};

export const PresentationsEmail = ({
  firstName,
  eventYear = '2026',
}: PresentationsEmailProps) => {
  const greetingName = firstName?.trim() || 'AutoPack Summit Attendee';
  const yearLabel = /^\d{4}$/.test(eventYear) ? eventYear : '2026';

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          Presentations from AutoPack Summit are in the media library for
          registered attendees.
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
              alt={`Automotive Packaging Summit ${yearLabel}`}
              style={{
                display: 'block',
                maxWidth: '600px',
                height: 'auto',
              }}
            />

            <Section style={{ padding: '32px 32px 0' }}>
              <Text style={{ ...labelStyle, textAlign: 'center' as const }}>
                AutoPack Summit {yearLabel}
              </Text>
              <Text
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 16px',
                  lineHeight: '1.15',
                  textAlign: 'center' as const,
                  ...font,
                }}
              >
                Presentations are here
              </Text>
              <Text style={bodyStyle}>Dear {greetingName},</Text>
              <Text style={bodyStyle}>
                We're excited to announce that presentations from the
                conference are available in our Media Library on the Automotive
                Packaging Summit website for all registered attendees. Whether
                you're looking to revisit a session or catch up on one you
                missed, the content is now at your fingertips.
              </Text>
              <div
                style={{
                  backgroundColor: '#FFF6DE',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  margin: '0 0 16px',
                }}
              >
                <Text
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: DARK_TEXT,
                    margin: 0,
                    lineHeight: '1.5',
                    ...font,
                  }}
                >
                  To access the presentations, use the email address you used
                  to register for the event.
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '8px 32px 0' }}>
              <Link href={PRESENTATIONS_URL} style={{ textDecoration: 'none' }}>
                <Img
                  src={PRESENTATIONS_SCREENSHOT}
                  width='536'
                  alt='AutoPack Summit presentations in the media library'
                  style={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '536px',
                    height: 'auto',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                  }}
                />
              </Link>
              <div style={{ textAlign: 'center' as const, marginTop: '20px' }}>
                <Button
                  href={PRESENTATIONS_URL}
                  style={{
                    backgroundColor: APS_YELLOW,
                    color: DARK_TEXT,
                    padding: '12px 22px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                    ...font,
                  }}
                >
                  VIEW PRESENTATIONS
                </Button>
              </div>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <div
                style={{
                  backgroundColor: CERTIFICATE_SLATE,
                  borderRadius: '16px',
                  padding: '20px 18px 18px',
                }}
              >
                <Text
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.72)',
                    margin: '0 0 6px',
                    lineHeight: '1.35',
                    ...font,
                  }}
                >
                  Automotive Packaging Summit
                </Text>
                <Text
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 10px',
                    lineHeight: '1.25',
                    ...font,
                  }}
                >
                  Certificate of Completion{' '}
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: DARK_TEXT,
                      backgroundColor: APS_YELLOW,
                      borderRadius: '999px',
                      padding: '3px 8px',
                      verticalAlign: 'middle',
                    }}
                  >
                    Free
                  </span>
                </Text>
                <Text
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.92)',
                    margin: '0 0 16px',
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  Complete the free module and receive your {yearLabel}{' '}
                  Certificate of Attendance for professional development,
                  reimbursement, or continuing education.
                </Text>
                <Button
                  href={CERTIFICATE_URL}
                  style={{
                    backgroundColor: APS_YELLOW,
                    color: DARK_TEXT,
                    padding: '12px 22px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    ...font,
                  }}
                >
                  Attendance Certificate
                </Button>
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
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 12px',
                  lineHeight: '1.35',
                  ...font,
                }}
              >
                Thank you for being part of this year's summit.
              </Text>
              <Text
                style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.92)',
                  margin: '0 0 16px',
                  lineHeight: '1.5',
                  ...font,
                }}
              >
                We look forward to seeing you at APS 2027.
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

PresentationsEmail.PreviewProps = {
  firstName: 'Jamie',
  eventYear: '2026',
} satisfies PresentationsEmailProps;

export default PresentationsEmail;
