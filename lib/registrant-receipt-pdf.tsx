import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

export type ReceiptLineItem =
  | { type: 'section'; description: string }
  | { description: string; quantity?: number | string; amount: number };

export type ReceiptRegistrant = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  companyName?: string | null;
  jobTitle?: string | null;
  phone?: string | null;
  attendeeType?: string | null;
  billingAddressFirstName?: string | null;
  billingAddressLastName?: string | null;
  billingAddressEmail?: string | null;
  billingAddressPhone?: string | null;
  billingAddressStreet?: string | null;
  billingAddressCity?: string | null;
  billingAddressState?: string | null;
  billingAddressZip?: string | null;
  billingAddressCountry?: string | null;
};

export type ReceiptPdfInput = {
  registrant: ReceiptRegistrant;
  invoiceId: string;
  lineItems: ReceiptLineItem[];
  subtotal: number;
  discountAmount?: number;
  totalDue: number;
  discountCode?: string | null;
  paymentConfirmation?: string | null;
  receiptCreatedAt: string;
};

function formatReceiptDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1f2937',
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  companyName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  companyLine: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  companyLogo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
  },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 14,
  },
  logo: {
    width: 92,
    height: 28,
    objectFit: 'contain',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 9,
    color: '#555555',
  },
  invoiceMetaBlock: {
    alignItems: 'flex-end',
    gap: 3,
  },
  invoiceNo: {
    fontSize: 9,
    color: '#6b7280',
    fontFamily: 'Helvetica-Bold',
  },
  invoiceDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  body: {
    padding: 14,
  },
  sectionTitle: {
    fontSize: 11,
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  twoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
  },
  colLeft: {
    width: '36%',
  },
  colRight: {
    width: '64%',
  },
  detailLine: {
    marginBottom: 3,
    fontSize: 10,
    lineHeight: 1.35,
  },
  label: {
    fontFamily: 'Helvetica-Bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 2,
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableHeadText: {
    fontSize: 9,
    color: '#6b7280',
    fontFamily: 'Helvetica-Bold',
  },
  rowDesc: { width: '66%' },
  rowQty: { width: '10%', textAlign: 'right' },
  rowAmt: { width: '24%', textAlign: 'right' },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    fontSize: 10,
  },
  sectionRow: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    fontSize: 9,
    color: '#6b7280',
    fontFamily: 'Helvetica-Bold',
  },
  totals: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 3,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  totalDue: {
    marginTop: 4,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    fontFamily: 'Helvetica-Bold',
  },
});

function InvoiceDocument({
  registrant,
  invoiceId,
  lineItems,
  subtotal,
  discountAmount = 0,
  totalDue,
  discountCode,
  paymentConfirmation,
  receiptCreatedAt,
}: ReceiptPdfInput) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.companyHeader}>
          <View>
            <Text style={styles.companyName}>Packaging School, LLC</Text>
            <Text style={styles.companyLine}>3620 Pelham Road #294</Text>
            <Text style={styles.companyLine}>Greenville, SC  29615 US</Text>
            <Text style={styles.companyLine}>(864) 704-2968</Text>
            <Text style={styles.companyLine}>drew@packagingschool.com</Text>
            <Text style={styles.companyLine}>www.packagingschool.com</Text>
          </View>
          <Image
            style={styles.companyLogo}
            src='https://packschool.s3.us-east-1.amazonaws.com/ps-square150x.png'
          />
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <View>
              <Image
                style={styles.logo}
                src='https://apsmedia.s3.amazonaws.com/images/AutoPackSummit-RGB-digital_color_stacked.png'
              />
              <Text style={styles.title}>Registration Receipt</Text>
              <Text style={styles.subtitle}>
                Automotive Packaging Summit 2026 · Sept 30 - Oct 2, 2026
              </Text>
            </View>
            <View style={styles.invoiceMetaBlock}>
              <Text style={styles.invoiceNo}>#{invoiceId}</Text>
              <Text style={styles.invoiceDate}>
                Created: {formatReceiptDate(receiptCreatedAt)}
              </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.twoCol}>
              <View style={styles.colLeft}>
                <Text style={styles.sectionTitle}>Registrant</Text>
                <Text style={styles.detailLine}>
                  {registrant.firstName} {registrant.lastName}
                </Text>
                <Text style={styles.detailLine}>{registrant.email}</Text>
                <Text style={styles.detailLine}>{registrant.companyName || ''}</Text>
                <Text style={styles.detailLine}>{registrant.jobTitle || ''}</Text>
                <Text style={styles.detailLine}>{registrant.phone || ''}</Text>
                <Text style={styles.detailLine}>
                  <Text style={styles.label}>Type: </Text>
                  {registrant.attendeeType}
                </Text>

                {registrant.billingAddressFirstName ||
                registrant.billingAddressLastName ||
                registrant.billingAddressEmail ? (
                  <>
                    <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
                      Billing
                    </Text>
                    <Text style={styles.detailLine}>
                      {registrant.billingAddressFirstName}{' '}
                      {registrant.billingAddressLastName}
                    </Text>
                    <Text style={styles.detailLine}>
                      {registrant.billingAddressEmail}
                    </Text>
                    <Text style={styles.detailLine}>
                      {registrant.billingAddressPhone}
                    </Text>
                    <Text style={styles.detailLine}>{registrant.companyName}</Text>
                    <Text style={styles.detailLine}>
                      {registrant.billingAddressStreet}
                    </Text>
                    <Text style={styles.detailLine}>
                      {registrant.billingAddressCity},{' '}
                      {registrant.billingAddressState}{' '}
                      {registrant.billingAddressZip}
                    </Text>
                    {registrant.billingAddressCountry ? (
                      <Text style={styles.detailLine}>
                        {registrant.billingAddressCountry}
                      </Text>
                    ) : null}
                  </>
                ) : null}

                {paymentConfirmation ? (
                  <Text style={[styles.detailLine, { marginTop: 8, fontSize: 9 }]}>
                    <Text style={styles.label}>Payment confirmation: </Text>
                    {paymentConfirmation}
                  </Text>
                ) : null}
              </View>

              <View style={styles.colRight}>
                <Text style={styles.sectionTitle}>Itemized charges</Text>
                <View style={styles.table}>
                  <View style={styles.tableHead}>
                    <Text style={[styles.tableHeadText, styles.rowDesc]}>
                      Description
                    </Text>
                    <Text style={[styles.tableHeadText, styles.rowQty]}>Qty</Text>
                    <Text style={[styles.tableHeadText, styles.rowAmt]}>Amount</Text>
                  </View>

                  {lineItems.map((item, idx) =>
                    'type' in item && item.type === 'section' ? (
                      <Text key={`s-${idx}`} style={styles.sectionRow}>
                        {item.description}
                      </Text>
                    ) : (
                      <View key={`r-${idx}`} style={styles.tableRow}>
                        <Text style={styles.rowDesc}>{item.description}</Text>
                        <Text style={styles.rowQty}>
                          {'quantity' in item ? item.quantity || '' : ''}
                        </Text>
                        <Text style={styles.rowAmt}>
                          ${Number('amount' in item ? item.amount || 0 : 0).toLocaleString()}
                        </Text>
                      </View>
                    ),
                  )}

                  <View style={styles.totals}>
                    <View style={styles.totalsRow}>
                      <Text>Subtotal</Text>
                      <Text>${Number(subtotal || 0).toLocaleString()}</Text>
                    </View>
                    {discountCode ? (
                      <View style={styles.totalsRow}>
                        <Text>Discount ({discountCode})</Text>
                        <Text>- ${Number(discountAmount || 0).toLocaleString()}</Text>
                      </View>
                    ) : null}
                    <View style={[styles.totalsRow, styles.totalDue]}>
                      <Text>Total paid</Text>
                      <Text>${Number(totalDue || 0).toLocaleString()}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function renderRegistrantReceiptPdf(
  input: ReceiptPdfInput,
): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  return renderToBuffer(<InvoiceDocument {...input} />);
}
