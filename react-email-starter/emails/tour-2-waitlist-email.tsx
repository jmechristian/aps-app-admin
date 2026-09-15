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

export type Tour2WaitlistEmailProps = {
  firstName?: string | null;
  eventYear?: string;
};

const APS_BLUE = '#005a94';
const APS_YELLOW = '#E4A800';
const GRAY_BG = '#f3f4f6';
const GRAY_BORDER = '#e5e7eb';
const DARK_TEXT = '#111827';
const MUTED_TEXT = '#6b7280';

const SITE_URL = 'https://www.autopacksummit.com';
const BIANCA_EMAIL = 'bianca@packagingschool.com';
const REMOVE_MAILTO = `mailto:${BIANCA_EMAIL}?subject=${encodeURIComponent(
  'Please remove me from the Clemson Packaging Science Tour waitlist — APS 2026',
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

export const Tour2WaitlistEmail = ({
  firstName,
  eventYear = '2026',
}: Tour2WaitlistEmailProps) => {
  const greetingName = firstName?.trim() || 'AutoPack Summit Attendee';

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          The Clemson Packaging Science tour is at capacity. If a spot opens, we
          will email you with full instructions.
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
              <Text style={labelStyle}>Waitlist update</Text>
              <Text
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 8px',
                  lineHeight: '1.3',
                  ...font,
                }}
              >
                Clemson University Tour Waitlist Update
              </Text>
              <Text
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: APS_BLUE,
                  margin: '0 0 16px',
                  lineHeight: '1.4',
                  ...font,
                }}
              >
                Packaging Science Facilities
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
                Dear {greetingName}, thank you for your interest in the Clemson
                University Packaging Science Facilities Tour.
              </Text>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <div
                style={{
                  border: `1px solid ${GRAY_BORDER}`,
                  borderRadius: '12px',
                  padding: '22px 20px 10px',
                }}
              >
                <Text style={labelStyle}>Tour</Text>
                <Text style={headingStyle}>Friday, October 2</Text>
                <Text style={metaLabelStyle}>Time</Text>
                <Text style={metaValueStyle}>11:00 AM–12:00 PM</Text>
                <Text style={metaLabelStyle}>Status</Text>
                <Text style={{ ...metaValueStyle, margin: '0 0 8px' }}>
                  At capacity — you remain on the waitlist
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <div
                style={{
                  borderLeft: `4px solid ${APS_YELLOW}`,
                  backgroundColor: '#FFF8E8',
                  borderRadius: '0 12px 12px 0',
                  padding: '22px 20px 10px',
                }}
              >
                <Text
                  style={{
                    ...labelStyle,
                    color: '#9A7200',
                  }}
                >
                  Tour add-on
                </Text>
                <Text style={headingStyle}>
                  Wait for a separate confirmation email
                </Text>
                <Text style={bodyStyle}>
                  Please do not go to the Clemson campus for this tour unless
                  you receive a separate email confirming that a spot has become
                  available for you. This does not affect your AutoPack Summit
                  registration.
                </Text>
                <Text style={{ ...bodyStyle, margin: 0 }}>
                  If a space opens, we will contact attendees in waitlist order
                  and send the complete tour, parking, and meeting instructions.
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <Text style={bodyStyle}>
                If you are no longer interested in this tour, please reply so we
                can remove your name from the waitlist.
              </Text>
              <Button
                href={REMOVE_MAILTO}
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
                Remove me from the waitlist
              </Button>
              <Text
                style={{
                  fontSize: '13px',
                  color: MUTED_TEXT,
                  margin: '14px 0 0',
                  lineHeight: '1.5',
                  ...font,
                }}
              >
                Or write{' '}
                <Link
                  href={`mailto:${BIANCA_EMAIL}`}
                  style={{ color: APS_BLUE, fontWeight: 700 }}
                >
                  Bianca@PackagingSchool.com
                </Link>
                .
              </Text>
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
                Thank you for your understanding.
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
                We hope to be able to accommodate you! Questions? Contact Bianca
                at{' '}
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
                Best regards,
                <br />
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

Tour2WaitlistEmail.PreviewProps = {
  firstName: 'Jamie',
  eventYear: '2026',
} satisfies Tour2WaitlistEmailProps;

export default Tour2WaitlistEmail;
