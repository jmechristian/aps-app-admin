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

export type ThankYouEmailProps = {
  firstName?: string | null;
  eventYear?: string;
};

const APS_BLUE = '#005a94';
const APS_YELLOW = '#E4A800';
const GRAY_BG = '#f3f4f6';
const DARK_TEXT = '#111827';
const MUTED_TEXT = '#6b7280';

const SITE_URL = 'https://www.autopacksummit.com';
const BIANCA_EMAIL = 'bianca@packagingschool.com';
const VIDEO_URL = 'https://www.youtube.com/watch?v=7yDlnQcywng';
const VIDEO_THUMBNAIL =
  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/images/thank-you-screenshot.png';
const HYATT_MAPS =
  'https://maps.google.com/?q=Hyatt+Regency+Greenville+220+North+Main+Street+Greenville+SC+29601';
const MEDIA_URL = 'https://packagingschool.com/events/aps-2026';
const MEDIA_PHOTO_BASE =
  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/2026/';
const MEDIA_PHOTOS = [
  {
    src: `${MEDIA_PHOTO_BASE}Bella%20Luna%20Photos%20Greenville%20SC-73-1280.jpg`,
    alt: 'Speaker at the AutoPack Summit podium',
    wide: true,
  },
  {
    src: `${MEDIA_PHOTO_BASE}Bella%20Luna%20Photos%20Greenville%20SC-141-1280.jpg`,
    alt: 'General session in the ballroom',
    wide: true,
  },
  {
    src: `${MEDIA_PHOTO_BASE}Bella%20Luna%20Photos%20Greenville%20SC-193-1280.jpg`,
    alt: 'Conversation on the show floor',
    wide: true,
  },
  {
    src: `${MEDIA_PHOTO_BASE}Bella%20Luna%20Photos%20Greenville%20SC-345-1280.jpg`,
    alt: 'Rising Star Award recipient',
    wide: false,
  },
] as const;

const MEDIA_SQUARE = 236;

function mediaPhotoGridHtml() {
  const cells = MEDIA_PHOTOS.map((photo) => {
    const alt = photo.alt.replace(/"/g, '&quot;');
    const side = MEDIA_SQUARE;
    const long = Math.round(side * (1279 / 853));
    const offset = Math.round((side - long) / 2);
    const frame = photo.wide
      ? `<div style="width:${long}px;max-width:${long}px;margin-left:${offset}px;"><img src="${photo.src}" width="${long}" height="${side}" alt="${alt}" style="display:block;width:${long}px;max-width:${long}px;height:${side}px;border:0;" /></div>`
      : `<div style="width:${side}px;max-width:${side}px;"><img src="${photo.src}" width="${side}" height="${long}" alt="${alt}" style="display:block;width:${side}px;max-width:${side}px;height:${long}px;border:0;" /></div>`;

    return `<td width="50%" valign="top" style="width:50%;padding:3px;vertical-align:top;">
      <!--[if mso]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" href="${MEDIA_URL}" style="width:${side}px;height:${side}px;">
        <v:fill type="frame" aspect="atleast" src="${photo.src}" color="#e5e7eb" />
        <v:textbox inset="0,0,0,0"><div style="font-size:0;line-height:${side}px;">&#8202;</div></v:textbox>
      </v:rect>
      <![endif]-->
      <!--[if !mso]><!-->
      <a href="${MEDIA_URL}" style="display:block;text-decoration:none;width:${side}px;margin:0 auto;">
        <div style="width:${side}px;height:${side}px;overflow:hidden;border-radius:8px;">${frame}</div>
      </a>
      <!--<![endif]-->
    </td>`;
  });

  const row = (pair: string[]) =>
    `<tr>${pair.join('')}</tr>`;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">${row(
    cells.slice(0, 2),
  )}${row(cells.slice(2, 4))}</table>`;
}

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

const SAVE_THE_DATE_DAYS = [
  { weekday: 'Monday', date: 'October 18' },
  { weekday: 'Tuesday', date: 'October 19' },
  { weekday: 'Wednesday', date: 'October 20' },
] as const;

const CERTIFICATE_SLATE = '#3E5162';

function IconBadge({
  backgroundColor,
  children,
}: {
  backgroundColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        backgroundColor,
        textAlign: 'center' as const,
        lineHeight: '40px',
        fontSize: '20px',
      }}
    >
      {children}
    </div>
  );
}

export const ThankYouEmail = ({
  firstName,
  eventYear = '2026',
}: ThankYouEmailProps) => {
  const greetingName = firstName?.trim() || 'AutoPack Summit Attendee';

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          Thank you for the connections made in Greenville. Save the date:
          Monday–Wednesday, October 18–20, 2027.
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
              <Text style={labelStyle}>AutoPack Summit {eventYear}</Text>
              <Text
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  margin: '0 0 8px',
                  lineHeight: '1.15',
                  ...font,
                }}
              >
                Thank you
              </Text>
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: APS_BLUE,
                  margin: '0 0 16px',
                  lineHeight: '1.4',
                  ...font,
                }}
              >
                For the connections made in Greenville
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
                Dear {greetingName}, thank you for joining us for the{' '}
                {eventYear} Automotive Packaging Summit. The introductions on
                the show floor, the conversations between sessions, and the
                people you will follow up with are what this summit is for.
              </Text>
            </Section>

            <Section
              style={{ padding: '28px 32px 0', textAlign: 'center' as const }}
            >
              <Text style={labelStyle}>Thank you video</Text>
              <Text style={headingStyle}>A note from the team</Text>
              <Text style={bodyStyle}>
                Watch a short thank-you from the team.
              </Text>
              <Link href={VIDEO_URL} style={{ textDecoration: 'none' }}>
                <Img
                  src={VIDEO_THUMBNAIL}
                  width='536'
                  alt='Play the AutoPack Summit thank you video'
                  style={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '536px',
                    height: 'auto',
                    margin: '0 auto',
                    borderRadius: '12px',
                  }}
                />
              </Link>
              <Button
                href={VIDEO_URL}
                style={{
                  backgroundColor: APS_YELLOW,
                  color: DARK_TEXT,
                  padding: '12px 22px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  marginTop: '14px',
                  ...font,
                }}
              >
                Watch the video
              </Button>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <div
                style={{
                  backgroundColor: APS_BLUE,
                  borderRadius: '12px',
                  padding: '24px 20px 8px',
                  textAlign: 'center' as const,
                }}
              >
                <Text
                  style={{
                    ...labelStyle,
                    color: APS_YELLOW,
                    margin: '0 0 8px',
                  }}
                >
                  Save the date
                </Text>
                <Text
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 6px',
                    lineHeight: '1.3',
                    ...font,
                  }}
                >
                  AutoPack Summit 2027
                </Text>
                <Text
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 16px',
                    lineHeight: '1.4',
                    ...font,
                  }}
                >
                  Monday–Wednesday
                </Text>
                <Row>
                  {SAVE_THE_DATE_DAYS.map((day, index) => (
                    <Column
                      key={day.weekday}
                      style={{
                        width: '33.33%',
                        verticalAlign: 'top',
                        paddingLeft: index === 0 ? 0 : '4px',
                        paddingRight: index === 2 ? 0 : '4px',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          padding: '12px 6px 4px',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: APS_BLUE,
                            margin: '0 0 4px',
                            lineHeight: '1.3',
                            ...font,
                          }}
                        >
                          {day.weekday}
                        </Text>
                        <Text
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: DARK_TEXT,
                            margin: '0 0 8px',
                            lineHeight: '1.35',
                            ...font,
                          }}
                        >
                          {day.date}
                        </Text>
                      </div>
                    </Column>
                  ))}
                </Row>
                <Text
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '16px 0 4px',
                    lineHeight: '1.4',
                    ...font,
                  }}
                >
                  <Link
                    href={HYATT_MAPS}
                    style={{ color: '#ffffff', textDecoration: 'underline' }}
                  >
                    Hyatt Regency
                  </Link>
                </Text>
                <Text
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.9)',
                    margin: '0 0 16px',
                    lineHeight: '1.5',
                    ...font,
                  }}
                >
                  Greenville, South Carolina
                </Text>
              </div>
              <Text
                style={{
                  ...bodyStyle,
                  margin: '12px 0 0',
                  textAlign: 'center' as const,
                }}
              >
                Next year runs Monday through Wednesday, October 18–20, 2027.
                Plan travel with that schedule in mind.
              </Text>
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '22px 16px 18px',
                }}
              >
                <Text style={{ ...labelStyle, textAlign: 'center' as const }}>
                  Media
                </Text>
                <Text
                  style={{
                    ...headingStyle,
                    fontSize: '26px',
                    textAlign: 'center' as const,
                    margin: '0 0 16px',
                  }}
                >
                  Relive the summit
                </Text>
                <div dangerouslySetInnerHTML={{ __html: mediaPhotoGridHtml() }} />

                <div
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px 12px 2px',
                    marginTop: '14px',
                  }}
                >
                  <Row>
                    <Column
                      style={{ width: '52px', verticalAlign: 'top' }}
                    >
                      <IconBadge backgroundColor='#E7F1F8'>📷</IconBadge>
                    </Column>
                    <Column style={{ verticalAlign: 'top' }}>
                      <Text
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: DARK_TEXT,
                          margin: '0 0 2px',
                          lineHeight: '1.3',
                          ...font,
                        }}
                      >
                        Photos{' '}
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: APS_BLUE,
                            backgroundColor: '#E7F1F8',
                            borderRadius: '999px',
                            padding: '3px 8px',
                            verticalAlign: 'middle',
                          }}
                        >
                          Now
                        </span>
                      </Text>
                      <Text style={{ ...bodyStyle, margin: '0 0 8px' }}>
                        From the floor, ready to browse.
                      </Text>
                    </Column>
                  </Row>
                </div>

                <div
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px 12px 2px',
                    marginTop: '8px',
                  }}
                >
                  <Row>
                    <Column
                      style={{ width: '52px', verticalAlign: 'top' }}
                    >
                      <IconBadge backgroundColor='#FFF6DE'>📊</IconBadge>
                    </Column>
                    <Column style={{ verticalAlign: 'top' }}>
                      <Text
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: DARK_TEXT,
                          margin: '0 0 2px',
                          lineHeight: '1.3',
                          ...font,
                        }}
                      >
                        Presentations{' '}
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#9A7200',
                            backgroundColor: '#FFF6DE',
                            borderRadius: '999px',
                            padding: '3px 8px',
                            verticalAlign: 'middle',
                          }}
                        >
                          Coming soon
                        </span>
                      </Text>
                      <Text style={{ ...bodyStyle, margin: '0 0 8px' }}>
                        Video of the presentations is on the way.
                      </Text>
                    </Column>
                  </Row>
                </div>

                <div
                  style={{
                    backgroundColor: CERTIFICATE_SLATE,
                    borderRadius: '16px',
                    padding: '16px 14px 6px',
                    marginTop: '8px',
                  }}
                >
                  <Row>
                    <Column
                      style={{ width: '52px', verticalAlign: 'top' }}
                    >
                      <IconBadge backgroundColor='#4E6274'>🎓</IconBadge>
                    </Column>
                    <Column style={{ verticalAlign: 'top' }}>
                      <Text
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.72)',
                          margin: '0 0 2px',
                          lineHeight: '1.35',
                          ...font,
                        }}
                      >
                        Automotive Packaging Summit
                      </Text>
                      <Text
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: '0 0 8px',
                          lineHeight: '1.25',
                          ...font,
                        }}
                      >
                        <Link
                          href={MEDIA_URL}
                          style={{ color: '#ffffff', textDecoration: 'none' }}
                        >
                          Certificate of Completion
                        </Link>{' '}
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
                    </Column>
                  </Row>
                  <Text
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.9)',
                      margin: '4px 0 10px',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    Attendees who meet the participation requirements receive a
                    2026 Certificate of Attendance for professional development,
                    reimbursement, or continuing education.
                  </Text>
                </div>

                <div style={{ textAlign: 'center' as const, marginTop: '16px' }}>
                  <Button
                    href={MEDIA_URL}
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
                    View the media page
                  </Button>
                </div>
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
                Until next year in Greenville.
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

ThankYouEmail.PreviewProps = {
  firstName: 'Jamie',
  eventYear: '2026',
} satisfies ThankYouEmailProps;

export default ThankYouEmail;
