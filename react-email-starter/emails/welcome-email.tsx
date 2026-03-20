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
  Row,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface WelcomeEmailProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    jobTitle: string;
    phone: string;
    attendeeType: string;
    billingAddress: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    speedNetworking: boolean;
  };
  formDataId: string;
  totalAmount: number;
  addOnsSelected: Array<{ id: string; title: string }>;
}

const APS_BLUE = '#005a94';
const APS_YELLOW = '#E4A800';
const GRAY_BG = '#f3f4f6';
const GRAY_BORDER = '#e5e7eb';
const DARK_TEXT = '#111827';
const MUTED_TEXT = '#6b7280';

const EVENT_TITLE = 'Automotive Packaging Summit 2026';
const EVENT_START_UTC = '20260930T120000Z';
const EVENT_END_UTC = '20261002T210000Z';
const EVENT_LOCATION =
  'Hyatt Regency, 220 North Main Street, Greenville, SC 29601';
const EVENT_DESCRIPTION =
  'Join industry leaders at the Automotive Packaging Summit 2026. Sept 30 – Oct 2, 2026 in Greenville, SC. Visit autopacksummit.com for details.';

const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_TITLE)}&dates=${EVENT_START_UTC}/${EVENT_END_UTC}&location=${encodeURIComponent(EVENT_LOCATION)}&details=${encodeURIComponent(EVENT_DESCRIPTION)}`;

const outlookCalUrl = `https://outlook.live.com/calendar/0/action/compose?subject=${encodeURIComponent(EVENT_TITLE)}&startdt=2026-09-30T08:00:00&enddt=2026-10-02T17:00:00&location=${encodeURIComponent(EVENT_LOCATION)}&body=${encodeURIComponent(EVENT_DESCRIPTION)}`;

const yahooCalUrl = `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(EVENT_TITLE)}&st=${EVENT_START_UTC}&et=${EVENT_END_UTC}&in_loc=${encodeURIComponent(EVENT_LOCATION)}&desc=${encodeURIComponent(EVENT_DESCRIPTION)}`;

const icsDownloadUrl = 'https://www.autopacksummit.com/api/calendar-event';

const font = {
  fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
};

export const WelcomeEmail = ({
  formData,
  formDataId,
  totalAmount,
  addOnsSelected,
}: WelcomeEmailProps) => {
  const dashboardUrl = `https://www.autopacksummit.com/registrants/${formDataId}`;

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          Your registration for the Automotive Packaging Summit 2026 has been
          APPROVED.
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
            {/* Tracking pixel */}
            <Img
              src={`https://autopacksummit.com/api/handle-email-tracking?id=${formDataId}&email=${formData.email}`}
              width='1'
              height='1'
              style={{ display: 'none' }}
              alt=''
            />

            {/* Hero header image */}
            <Img
              src='https://packschool.s3.us-east-1.amazonaws.com/2026-email-header.png'
              width='100%'
              alt='Automotive Packaging Summit 2026 – Greenville, SC – Sept 30 – Oct 2, 2026'
              style={{
                display: 'block',
                maxWidth: '600px',
                height: 'auto',
              }}
            />

            {/* Registration status heading */}
            <Section
              style={{ padding: '36px 32px 0', textAlign: 'center' as const }}
            >
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
                {formData.firstName}, your registration has been received and is
                APPROVED.
              </Text>
              <Text
                style={{
                  fontSize: '15px',
                  color: MUTED_TEXT,
                  margin: '0 0 24px',
                  lineHeight: '1.5',
                  ...font,
                }}
              >
                View your dashboard to check the status of your registration and
                add-ons
              </Text>
              <Button
                href={dashboardUrl}
                style={{
                  backgroundColor: APS_BLUE,
                  color: '#ffffff',
                  padding: '12px 32px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  ...font,
                }}
              >
                View Your Dashboard
              </Button>
            </Section>

            {/* Divider */}
            <Section style={{ padding: '32px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: 0 }} />
            </Section>

            {/* Order summary */}
            <Section style={{ padding: '28px 32px 0' }}>
              <Text
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: MUTED_TEXT,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px',
                  margin: '0 0 16px',
                  ...font,
                }}
              >
                Order Summary
              </Text>
              <Row>
                <Column style={{ width: '50%', verticalAlign: 'top' }}>
                  <Text
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: DARK_TEXT,
                      margin: '0 0 6px',
                      ...font,
                    }}
                  >
                    Registrant
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: DARK_TEXT,
                      margin: '0 0 2px',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    {formData.firstName} {formData.lastName}
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0 0 2px',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    {formData.jobTitle}
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0 0 2px',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    {formData.companyName}
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0 0 2px',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    {formData.email}
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    {formData.phone}
                  </Text>
                </Column>
                <Column style={{ width: '50%', verticalAlign: 'top' }}>
                  <Text
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: DARK_TEXT,
                      margin: '0 0 6px',
                      ...font,
                    }}
                  >
                    Billing Address
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0 0 2px',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    {formData.billingAddress.street}
                  </Text>
                  <Text
                    style={{
                      fontSize: '13px',
                      color: MUTED_TEXT,
                      margin: '0',
                      lineHeight: '1.5',
                      ...font,
                    }}
                  >
                    {formData.billingAddress.city},{' '}
                    {formData.billingAddress.state}{' '}
                    {formData.billingAddress.zip}
                  </Text>
                </Column>
              </Row>

              {/* Ticket table */}
              <Section style={{ marginTop: '20px' }}>
                <Section
                  style={{
                    backgroundColor: GRAY_BG,
                    borderRadius: '6px 6px 0 0',
                    padding: '8px 12px',
                  }}
                >
                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Text
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: MUTED_TEXT,
                          margin: 0,
                          ...font,
                        }}
                      >
                        Item
                      </Text>
                    </Column>
                    <Column
                      style={{ width: '25%', textAlign: 'center' as const }}
                    >
                      <Text
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: MUTED_TEXT,
                          margin: 0,
                          ...font,
                        }}
                      >
                        Qty
                      </Text>
                    </Column>
                    <Column
                      style={{ width: '25%', textAlign: 'right' as const }}
                    >
                      <Text
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: MUTED_TEXT,
                          margin: 0,
                          ...font,
                        }}
                      >
                        Amount
                      </Text>
                    </Column>
                  </Row>
                </Section>
                <Section
                  style={{
                    padding: '10px 12px',
                    borderBottom: `1px solid ${GRAY_BORDER}`,
                  }}
                >
                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Text
                        style={{
                          fontSize: '13px',
                          color: DARK_TEXT,
                          margin: 0,
                          ...font,
                        }}
                      >
                        General Admission ({formData.attendeeType})
                      </Text>
                    </Column>
                    <Column
                      style={{ width: '25%', textAlign: 'center' as const }}
                    >
                      <Text
                        style={{
                          fontSize: '13px',
                          color: DARK_TEXT,
                          margin: 0,
                          ...font,
                        }}
                      >
                        1
                      </Text>
                    </Column>
                    <Column
                      style={{ width: '25%', textAlign: 'right' as const }}
                    >
                      <Text
                        style={{
                          fontSize: '13px',
                          color: DARK_TEXT,
                          margin: 0,
                          ...font,
                        }}
                      >
                        ${totalAmount}
                      </Text>
                    </Column>
                  </Row>
                </Section>
                {addOnsSelected && addOnsSelected.length > 0 && (
                  <Section
                    style={{
                      padding: '10px 12px',
                      borderBottom: `1px solid ${GRAY_BORDER}`,
                    }}
                  >
                    <Row>
                      <Column style={{ width: '50%' }}>
                        <Text
                          style={{
                            fontSize: '13px',
                            color: DARK_TEXT,
                            margin: 0,
                            ...font,
                          }}
                        >
                          Add-ons:{' '}
                          {addOnsSelected.map((a) => a.title).join(', ')}
                        </Text>
                      </Column>
                      <Column
                        style={{ width: '25%', textAlign: 'center' as const }}
                      >
                        <Text
                          style={{
                            fontSize: '13px',
                            color: DARK_TEXT,
                            margin: 0,
                            ...font,
                          }}
                        >
                          —
                        </Text>
                      </Column>
                      <Column
                        style={{ width: '25%', textAlign: 'right' as const }}
                      >
                        <Text
                          style={{
                            fontSize: '13px',
                            color: DARK_TEXT,
                            margin: 0,
                            ...font,
                          }}
                        >
                          Included
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                )}
                {formData.speedNetworking && (
                  <Section
                    style={{
                      padding: '10px 12px',
                      borderBottom: `1px solid ${GRAY_BORDER}`,
                    }}
                  >
                    <Row>
                      <Column style={{ width: '50%' }}>
                        <Text
                          style={{
                            fontSize: '13px',
                            color: DARK_TEXT,
                            margin: 0,
                            ...font,
                          }}
                        >
                          Speed Networking
                        </Text>
                      </Column>
                      <Column
                        style={{ width: '25%', textAlign: 'center' as const }}
                      >
                        <Text
                          style={{
                            fontSize: '13px',
                            color: DARK_TEXT,
                            margin: 0,
                            ...font,
                          }}
                        >
                          1
                        </Text>
                      </Column>
                      <Column
                        style={{ width: '25%', textAlign: 'right' as const }}
                      >
                        <Text
                          style={{
                            fontSize: '13px',
                            color: DARK_TEXT,
                            margin: 0,
                            ...font,
                          }}
                        >
                          Included
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                )}
                <Section
                  style={{
                    backgroundColor: DARK_TEXT,
                    borderRadius: '0 0 6px 6px',
                    padding: '12px',
                  }}
                >
                  <Row>
                    <Column style={{ width: '50%' }}>
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                          ...font,
                        }}
                      >
                        Paid
                      </Text>
                    </Column>
                    <Column
                      style={{ width: '50%', textAlign: 'right' as const }}
                    >
                      <Text
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                          ...font,
                        }}
                      >
                        ${totalAmount}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Section>

              {/* Download receipt button */}
              <Section
                style={{ textAlign: 'center' as const, padding: '20px 0 0' }}
              >
                <Button
                  href={dashboardUrl}
                  style={{
                    backgroundColor: APS_BLUE,
                    color: '#ffffff',
                    padding: '10px 28px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    ...font,
                  }}
                >
                  Download Receipt
                </Button>
              </Section>
            </Section>

            {/* Divider */}
            <Section style={{ padding: '28px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: 0 }} />
            </Section>

            {/* Event snapshot */}
            <Section style={{ padding: '28px 32px 0' }}>
              <Text
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: DARK_TEXT,
                  textAlign: 'center' as const,
                  margin: '0 0 16px',
                  ...font,
                }}
              >
                Event Details &amp; Agenda
              </Text>
              <Section
                style={{
                  backgroundColor: GRAY_BG,
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <Row>
                  <Column
                    style={{
                      width: '33%',
                      verticalAlign: 'top',
                      paddingRight: '8px',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: APS_BLUE,
                        margin: '0 0 6px',
                        textTransform: 'uppercase' as const,
                        ...font,
                      }}
                    >
                      Wednesday
                      <br />
                      Sept 30
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0 0 2px',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Tours
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0 0 2px',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Registration
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Cocktail Hour
                    </Text>
                  </Column>
                  <Column
                    style={{
                      width: '33%',
                      verticalAlign: 'top',
                      paddingLeft: '8px',
                      paddingRight: '8px',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: APS_BLUE,
                        margin: '0 0 6px',
                        textTransform: 'uppercase' as const,
                        ...font,
                      }}
                    >
                      Thursday
                      <br />
                      Oct 1
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0 0 2px',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Doors Open 7:30 AM
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0 0 2px',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Presentations &amp; Workshops
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0 0 2px',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Speed Networking
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0 0 2px',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Exhibitor Hall
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Reception
                    </Text>
                  </Column>
                  <Column
                    style={{
                      width: '33%',
                      verticalAlign: 'top',
                      paddingLeft: '8px',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: APS_BLUE,
                        margin: '0 0 6px',
                        textTransform: 'uppercase' as const,
                        ...font,
                      }}
                    >
                      Friday
                      <br />
                      Oct 2
                    </Text>
                    <Text
                      style={{
                        fontSize: '13px',
                        color: DARK_TEXT,
                        margin: '0',
                        lineHeight: '1.5',
                        ...font,
                      }}
                    >
                      Tours
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Section
                style={{ textAlign: 'center' as const, padding: '16px 0 0' }}
              >
                <Button
                  href='https://www.autopacksummit.com/agenda'
                  style={{
                    backgroundColor: DARK_TEXT,
                    color: '#ffffff',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    ...font,
                  }}
                >
                  View Agenda
                </Button>
              </Section>
            </Section>

            {/* Add to Calendar */}
            <Section
              style={{ padding: '20px 32px 0', textAlign: 'center' as const }}
            >
              <Text
                style={{
                  fontSize: '13px',
                  color: MUTED_TEXT,
                  margin: '0 0 8px',
                  ...font,
                }}
              >
                Add event to calendar:{' '}
                <Link
                  href={googleCalUrl}
                  style={{
                    color: APS_BLUE,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    ...font,
                  }}
                >
                  Google
                </Link>
                {' | '}
                <Link
                  href={icsDownloadUrl}
                  style={{
                    color: APS_BLUE,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    ...font,
                  }}
                >
                  iCal
                </Link>
                {' | '}
                <Link
                  href={yahooCalUrl}
                  style={{
                    color: APS_BLUE,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    ...font,
                  }}
                >
                  Yahoo
                </Link>
                {' | '}
                <Link
                  href={outlookCalUrl}
                  style={{
                    color: APS_BLUE,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    ...font,
                  }}
                >
                  Outlook
                </Link>
              </Text>
            </Section>

            {/* Divider */}
            <Section style={{ padding: '28px 32px 0' }}>
              <Hr style={{ borderColor: GRAY_BORDER, margin: 0 }} />
            </Section>

            {/* Hotel & Travel / Tours — two columns */}
            <Section style={{ padding: '28px 32px 0' }}>
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
                    href='https://www.hyatt.com/en-US/group-booking/GSPRG/G-APSM'
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
                    href={dashboardUrl}
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
                  href='mailto:events@packagingschool.com'
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
                  href='https://www.autopacksummit.com'
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
                  margin: '0',
                  lineHeight: '1.6',
                  ...font,
                }}
              >
                For additional questions, please contact{' '}
                <Link
                  href='mailto:events@packagingschool.com'
                  style={{
                    color: APS_YELLOW,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  events@packagingschool.com
                </Link>
                .
              </Text>
            </Section>

            {/* Bottom footer with logos */}
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
                  <Link
                    href='https://www.packagingschool.com'
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

WelcomeEmail.PreviewProps = {
  formData: {
    firstName: 'Jamie',
    lastName: 'Christian',
    email: 'jmechristian@gmail.com',
    companyName: 'Packaging School',
    jobTitle: 'Director of Technology',
    phone: '(512) 289-3696',
    attendeeType: 'OEM',
    billingAddress: {
      street: '1015 Atlantic Dr',
      city: 'Stafford',
      state: 'VA',
      zip: '22554',
    },
    speedNetworking: true,
  },
  formDataId: '4e041c79-2aba-4198-a01b-8576cc58a1fd',
  totalAmount: 499,
  addOnsSelected: [{ id: '1', title: 'Speed Networking' }],
};

export default WelcomeEmail;
