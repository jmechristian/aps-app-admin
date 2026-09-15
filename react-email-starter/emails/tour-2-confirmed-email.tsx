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

export type Tour2ConfirmedEmailProps = {
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
const HENDRIX_MAPS =
  'https://maps.google.com/?q=Hendrix+Student+Center+Clemson+University+Clemson+SC';
const NEWMAN_MAPS =
  'https://maps.google.com/?q=Newman+Hall+Clemson+University+Clemson+SC';
const PARKING_MAP = 'https://www.tigerscommute.com/Public/Home.aspx';
const CANCEL_MAILTO = `mailto:${BIANCA_EMAIL}?subject=${encodeURIComponent(
  'Cannot attend Clemson Packaging Science Tour — APS 2026',
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

const buttonStyle: React.CSSProperties = {
  backgroundColor: APS_BLUE,
  color: '#ffffff',
  padding: '11px 22px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 700,
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center' as const,
  margin: '0 0 10px',
  ...font,
};

export const Tour2ConfirmedEmail = ({
  firstName,
  eventYear = '2026',
}: Tour2ConfirmedEmailProps) => {
  const greetingName = firstName?.trim() || 'Tour Attendee';

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          Clemson Packaging Science tour: Friday, October 2. Meet at Hendrix
          Student Center by 10:40 AM.
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
                Clemson Packaging Science Facilities
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
                Clemson University Packaging Science Facilities Tour on Friday,
                October 2. Please review the important arrival and parking
                information below.
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
                <Text style={headingStyle}>Friday, October 2</Text>
                <Text style={metaLabelStyle}>Time</Text>
                <Text style={metaValueStyle}>11:00 AM–12:00 PM</Text>
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
                  Newman Hall and Sonoco Institute (Harris A. Smith Building)
                </Text>
                <Text style={{ ...metaValueStyle, margin: '0 0 8px' }}>
                  <Link
                    href={NEWMAN_MAPS}
                    style={{ color: APS_BLUE, textDecoration: 'none' }}
                  >
                    Clemson University
                    <br />
                    Clemson, SC 29634
                  </Link>
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <Text style={labelStyle}>Tour plan</Text>
              <div
                style={{
                  border: `1px solid ${GRAY_BORDER}`,
                  borderRadius: '12px',
                  padding: '18px 18px 8px',
                  marginBottom: '10px',
                }}
              >
                <Text
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: APS_BLUE,
                    margin: '0 0 4px',
                    ...font,
                  }}
                >
                  11:00 AM — Newman Hall
                </Text>
                <Text style={{ ...bodyStyle, margin: '0 0 4px' }}>
                  Guided walk-through of CEFPACK and Distribution Lab, with an
                  opportunity to meet Don and Brennan, if available.
                </Text>
              </div>
              <div
                style={{
                  border: `1px solid ${GRAY_BORDER}`,
                  borderRadius: '12px',
                  padding: '18px 18px 8px',
                }}
              >
                <Text
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: APS_BLUE,
                    margin: '0 0 4px',
                    ...font,
                  }}
                >
                  11:30 AM — Sonoco Institute (Harris A. Smith Building)
                </Text>
                <Text style={{ ...bodyStyle, margin: '0 0 4px' }}>
                  Guided walk-through of the building.
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
                <Text style={labelStyle}>Transportation and parking</Text>
                <Text style={headingStyle}>Drive and park on campus</Text>
                <Text style={bodyStyle}>
                  Transportation is not provided for this tour. Attendees will
                  need to drive to Clemson University and park in a metered
                  visitor space.
                </Text>
                <Text style={bodyStyle}>
                  We recommend using the metered parking spaces in{' '}
                  <strong style={{ color: DARK_TEXT }}>Lot E-1</strong>,
                  directly across from the Hendrix Student Center.
                </Text>
                <Button href={HENDRIX_MAPS} style={buttonStyle}>
                  View Hendrix Student Center on Google Maps
                </Button>
                <Button
                  href={PARKING_MAP}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#ffffff',
                    color: APS_BLUE,
                    border: `2px solid ${APS_BLUE}`,
                  }}
                >
                  View Clemson&apos;s Interactive Parking Map
                </Button>
                <Text
                  style={{
                    fontSize: '13px',
                    color: DARK_TEXT,
                    margin: '8px 0 8px',
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  On the parking map, select <strong>Metered</strong> and then
                  click the eye icon to display available metered parking
                  locations. Limited metered parking may also be available along
                  Fernow Street near the Harris A. Smith Building.
                </Text>
                <Text
                  style={{
                    fontSize: '13px',
                    color: MUTED_TEXT,
                    margin: '0 0 8px',
                    lineHeight: '1.55',
                    ...font,
                  }}
                >
                  If you have never visited Clemson&apos;s campus, we strongly
                  recommend arriving up to one hour early so you have time to
                  navigate campus, find a metered space, and walk to the meeting
                  location.
                </Text>
              </div>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <Text style={labelStyle}>Meeting location</Text>
              <Text style={headingStyle}>Hendrix Student Center</Text>
              <Text style={bodyStyle}>
                An AutoPack Summit staff member will be waiting outside the
                Hendrix Student Center with an AutoPack Summit sign to help
                guide attendees to Newman Hall. You can also meet us directly at
                Newman Hall (the covered door between Newman Hall and Poole
                Building).
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
                      backgroundColor: GRAY_BG,
                      borderRadius: '8px',
                      padding: '12px 12px 4px',
                      textAlign: 'center' as const,
                    }}
                  >
                    <Text style={{ ...metaLabelStyle, margin: '0 0 4px' }}>
                      Meet no later than
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
                      10:40 AM
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
                      backgroundColor: GRAY_BG,
                      borderRadius: '8px',
                      padding: '12px 12px 4px',
                      textAlign: 'center' as const,
                    }}
                  >
                    <Text style={{ ...metaLabelStyle, margin: '0 0 4px' }}>
                      Group walks at
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
                      10:45 AM
                    </Text>
                  </div>
                </Column>
              </Row>
              <Text
                style={{
                  fontSize: '13px',
                  color: DARK_TEXT,
                  margin: '14px 0 0',
                  lineHeight: '1.55',
                  ...font,
                }}
              >
                Please meet the group at the Hendrix Student Center no later
                than 10:40 AM. The group will begin walking to the tour location
                promptly at 10:45 AM.
              </Text>
            </Section>

            <Section style={{ padding: '24px 32px 0' }}>
              <Text style={labelStyle}>About the tour</Text>
              <Text style={headingStyle}>
                Packaging science labs at Clemson
              </Text>
              <Text style={bodyStyle}>
                The tour will explore Clemson University&apos;s Packaging
                Science facilities, including material testing laboratories and
                state-of-the-art packaging design laboratories.
              </Text>
              <Text style={{ ...bodyStyle, margin: 0 }}>
                The tour involves a significant amount of fast-paced walking
                across campus. Please wear comfortable clothing and appropriate
                walking shoes.
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
                  Waitlist
                </Text>
                <Text style={headingStyle}>Let us know as soon as possible</Text>
                <Text style={bodyStyle}>
                  Because space is limited and we currently have a waitlist,
                  please tell us if you are no longer able to attend so we can
                  offer your spot to the next person on the list.
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
                We look forward to seeing you on Friday!
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

Tour2ConfirmedEmail.PreviewProps = {
  firstName: 'Jamie',
  eventYear: '2026',
} satisfies Tour2ConfirmedEmailProps;

export default Tour2ConfirmedEmail;
