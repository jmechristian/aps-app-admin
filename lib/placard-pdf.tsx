import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { ApsLogoPdf } from '@/lib/badge-pdf';
import {
  PLACARD_COLORS,
  PLACARD_PAGE,
  companyNameFontSizePt,
  formatBoothLabel,
  type PlacardExhibitor,
} from '@/lib/placards';

export type PlacardPdfExhibitor = PlacardExhibitor & { qrDataUrl: string };

const PAGE_W = PLACARD_PAGE.pagePt.w;
const PAGE_H = PLACARD_PAGE.pagePt.h;
const FACE_H = PLACARD_PAGE.facePt.h;
const PAD = 28;
const QR = 128;
const HEADER_H = 58;

const styles = StyleSheet.create({
  page: {
    width: PAGE_W,
    height: PAGE_H,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  face: {
    width: PAGE_W,
    height: FACE_H,
    backgroundColor: '#ffffff',
  },
  header: {
    height: HEADER_H,
    backgroundColor: PLACARD_COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
  },
  title: {
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    letterSpacing: 2.2,
  },
  accent: {
    height: 6,
    backgroundColor: PLACARD_COLORS.yellow,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PAD,
    paddingVertical: 18,
  },
  copy: {
    flex: 1,
    paddingRight: 18,
  },
  company: {
    fontFamily: 'Helvetica-Bold',
    color: PLACARD_COLORS.ink,
  },
  booth: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: PLACARD_COLORS.navy,
  },
  qrCol: {
    alignItems: 'center',
  },
  qrPlate: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 8,
  },
  scanHint: {
    marginTop: 8,
    fontSize: 8,
    letterSpacing: 1.2,
    color: PLACARD_COLORS.mute,
    fontFamily: 'Helvetica-Bold',
  },
  fold: {
    position: 'absolute',
    left: PAD,
    right: PAD,
    top: FACE_H - 0.5,
    height: 0.75,
    backgroundColor: '#d4d4d8',
  },
});

function QrSlot({ src }: { src?: string | null }) {
  if (src) {
    return <Image src={src} style={{ width: QR, height: QR }} />;
  }
  return (
    <View
      style={{
        width: QR,
        height: QR,
        borderWidth: 1,
        borderColor: '#d4d4d8',
        backgroundColor: '#ffffff',
      }}
    />
  );
}

function PlacardFace({ exhibitor }: { exhibitor: PlacardPdfExhibitor }) {
  const booth = formatBoothLabel(exhibitor.boothNumber);
  const company = exhibitor.companyName.trim() || 'Exhibitor';

  return (
    <View style={styles.face}>
      <View style={styles.header}>
        <ApsLogoPdf variant='light' width={118} />
        <Text style={styles.title}>PASSPORT CHALLENGE</Text>
      </View>
      <View style={styles.accent} />
      <View style={styles.body}>
        <View style={styles.copy}>
          <Text style={[styles.company, { fontSize: companyNameFontSizePt(company) }]}>
            {company}
          </Text>
          {booth ? <Text style={styles.booth}>{booth}</Text> : null}
        </View>
        <View style={styles.qrCol}>
          <View style={styles.qrPlate}>
            <QrSlot src={exhibitor.qrDataUrl} />
          </View>
          <Text style={styles.scanHint}>SCAN TO STAMP</Text>
        </View>
      </View>
    </View>
  );
}

function PlacardPage({ exhibitor }: { exhibitor: PlacardPdfExhibitor }) {
  return (
    <Page size={[PAGE_W, PAGE_H]} style={styles.page}>
      <View
        style={{
          width: PAGE_W,
          height: FACE_H,
          transform: 'rotate(180deg)',
        }}
      >
        <PlacardFace exhibitor={exhibitor} />
      </View>
      <View style={styles.fold} />
      <PlacardFace exhibitor={exhibitor} />
    </Page>
  );
}

export function PlacardDocument({
  exhibitors,
}: {
  exhibitors: PlacardPdfExhibitor[];
}) {
  return (
    <Document>
      {exhibitors.map((exhibitor) => (
        <PlacardPage key={exhibitor.id} exhibitor={exhibitor} />
      ))}
    </Document>
  );
}

export async function renderPlacardPdf(input: {
  exhibitors: PlacardPdfExhibitor[];
}): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  return renderToBuffer(
    <PlacardDocument exhibitors={input.exhibitors} />,
  );
}
