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

export type Tour1ConfirmedEmailProps = {
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
const HYATT_MAPS =
  'https://maps.google.com/?q=Hyatt+Regency+Greenville+220+North+Main+Street+Greenville+SC+29601';
const ICAR_MAPS =
  'https://maps.google.com/?q=Carroll+A.+Campbell+Jr.+Graduate+Engineering+Center+4+Research+Drive+Greenville+SC+29607';
const CANCEL_MAILTO = `mailto:${BIANCA_EMAIL}?subject=${encodeURIComponent(
  'Cannot attend CU-ICAR / Deep Orange Tour — APS 2026',
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

export const Tour1ConfirmedEmail = ({
  firstName,
  eventYear = '2026',
}: Tour1ConfirmedEmailProps) => {
  const greetingName = firstName?.trim() || 'Tour Attendee';

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          CU-ICAR and Deep Orange tour: Wednesday, September 30. Bus leaves the
          Hyatt at 10:30 AM.
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
              <Text style={labelStyle}>Confirmed tour</Text>
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
                Important Tour Information
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
                CU-ICAR and Deep Orange
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
                Dear {greetingName}, we look forward to welcoming you to the
                Clemson University ICAR and Deep Orange Facility Tour on
                Wednesday, September 30. Please review the important
                transportation and timing information below.
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
                <Text style={labelStyle}>Tour schedule</Text>
                <Text style={headingStyle}>Wednesday, September 30</Text>
                <Text style={metaLabelStyle}>Time</Text>
                <Text style={metaValueStyle}>11:00 AM–12:30 PM</Text>
                <Text style={metaLabelStyle}>Where</Text>
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
                  Clemson University International Center for Automotive
                  Research
                </Text>
                <Text style={{ ...metaValueStyle, margin: '0 0 4px' }}>
                  Carroll A. Campbell Jr. Graduate Engineering Center
                </Text>
                <Text style={{ ...metaValueStyle, margin: '0 0 8px' }}>
                  <Link
                    href={ICAR_MAPS}
                    style={{ color: APS_BLUE, textDecoration: 'none' }}
                  >
                    4 Research Drive
                    <br />
                    Greenville, SC 29607
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
                <Text style={labelStyle}>Bus transportation</Text>
                <Text style={headingStyle}>Meet at the Hyatt main entrance</Text>
                <Text style={bodyStyle}>
                  Transportation is provided from the{' '}
                  <Link
                    href={HYATT_MAPS}
                    style={{ color: APS_BLUE, fontWeight: 700 }}
                  >
                    Hyatt Regency Greenville
                  </Link>
                  . Please arrive early and be ready to board when the bus
                  arrives. Unfortunately, we will not be able to delay
                  departure for late arrivals.
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
                      }}
                    >
                      <Text style={{ ...metaLabelStyle, margin: '0 0 4px' }}>
                        Bus arrives
                      </Text>
                      <Text
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: APS_BLUE,
                          margin: '0 0 8px',
                          ...font,
                        }}
                      >
                        10:15 AM
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
                      }}
                    >
                      <Text style={{ ...metaLabelStyle, margin: '0 0 4px' }}>
                        Departs promptly
                      </Text>
                      <Text
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: APS_BLUE,
                          margin: '0 0 8px',
                          ...font,
                        }}
                      >
                        10:30 AM
                      </Text>
                    </div>
                  </Column>
                </Row>
                <Text
                  style={{
                    fontSize: '13px',
                    color: DARK_TEXT,
                    margin: '14px 0 8px',
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  Please be ready at the hotel&apos;s main entrance when the bus
                  arrives.
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <Text style={labelStyle}>About the tour</Text>
              <Text style={headingStyle}>
                A behind-the-scenes look at CU-ICAR
              </Text>
              <Text style={bodyStyle}>
                This exclusive tour will provide a behind-the-scenes look at
                Clemson University&apos;s automotive research, advanced vehicle
                development, and renowned Deep Orange program.
              </Text>
              <Text style={bodyStyle}>
                Lunch sandwiches will be served at the conclusion of the tour
                before we return to the Hyatt.
              </Text>
              <Text style={{ ...bodyStyle, margin: 0 }}>
                We recommend wearing comfortable clothing and appropriate
                footwear.
              </Text>
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
                  Plans changed?
                </Text>
                <Text style={headingStyle}>Let us know as soon as possible</Text>
                <Text style={bodyStyle}>
                  If you are no longer able to attend, please tell us so we can
                  offer your spot to another attendee.
                </Text>
                <Button
                  href={CANCEL_MAILTO}
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
                  I can no longer attend
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
                  Or write{' '}
                  <Link
                    href={`mailto:${BIANCA_EMAIL}`}
                    style={{ color: APS_BLUE, fontWeight: 700 }}
                  >
                    Bianca@PackagingSchool.com
                  </Link>
                  .
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
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 12px',
                  ...font,
                }}
              >
                We look forward to seeing you on Wednesday!
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

Tour1ConfirmedEmail.PreviewProps = {
  firstName: 'Jamie',
  eventYear: '2026',
} satisfies Tour1ConfirmedEmailProps;

export default Tour1ConfirmedEmail;
