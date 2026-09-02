import fs from 'fs';
import path from 'path';
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Svg,
  Path,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  BADGE_PAGE,
  CLASSIC_SPLIT,
  firstNameFontSizePt,
  formatTableLabel,
  getPackIqVariant,
  getTypeColor,
  getTypeLabel,
  typeLabelFontSizePt,
  type BadgeDesign,
  type BadgePerson,
} from '@/lib/badges';

export type BadgePdfPerson = BadgePerson & { qrDataUrl: string };

const PAGE_W = BADGE_PAGE.pagePt.w;
const PAGE_H = BADGE_PAGE.pagePt.h;
const BLEED = BADGE_PAGE.bleedPt;
const TRIM_H = BADGE_PAGE.trimPt.h;
const SAFE = BLEED + 9;
const PUNCH = BLEED + 36;
const WHITE_H = BLEED + CLASSIC_SPLIT * TRIM_H;
const FOOTER_H = PAGE_H - WHITE_H;
const RAIL_W = BLEED + 46;

const styles = StyleSheet.create({
  page: {
    width: PAGE_W,
    height: PAGE_H,
    fontFamily: 'Helvetica',
    color: '#111111',
  },
  classicWhite: {
    height: WHITE_H,
    paddingTop: PUNCH,
    paddingHorizontal: SAFE,
    backgroundColor: '#ffffff',
  },
  classicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  classicBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  classicFooter: {
    height: FOOTER_H,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: BLEED + 10,
    paddingHorizontal: SAFE,
  },
  firstName: {
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    color: '#111111',
  },
  lastName: {
    fontSize: 13,
    marginTop: 3,
    textAlign: 'center',
    color: '#111111',
  },
  company: {
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
    color: '#222222',
  },
  tableCaption: {
    fontSize: 8,
    marginTop: 8,
    letterSpacing: 1.4,
    textAlign: 'center',
    color: '#555555',
    fontFamily: 'Helvetica-Bold',
  },
  typeLabel: {
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  qr: {
    width: 50,
    height: 50,
  },
  packiq: {
    width: 96,
    height: 40,
    marginTop: 8,
  },
  rail: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: RAIL_W,
    height: PAGE_H,
  },
  railTypeWrap: {
    position: 'absolute',
    left: -(PAGE_H - RAIL_W) / 2,
    top: (PAGE_H - RAIL_W) / 2,
    width: PAGE_H,
    height: RAIL_W,
    transform: 'rotate(-90deg)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  railType: {
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    letterSpacing: 1.6,
  },
  railContent: {
    marginLeft: RAIL_W,
    height: PAGE_H,
    paddingTop: PUNCH,
    paddingRight: SAFE,
    paddingLeft: 14,
    paddingBottom: BLEED + 12,
  },
  railName: {
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
  },
  signalPage: {
    width: PAGE_W,
    height: PAGE_H,
    fontFamily: 'Helvetica',
    paddingTop: PUNCH,
    paddingHorizontal: SAFE,
    paddingBottom: BLEED + 12,
  },
  signalFirst: {
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  signalLast: {
    fontSize: 15,
    marginTop: 4,
    color: '#ffffff',
  },
  signalCompany: {
    fontSize: 11,
    marginTop: 10,
    color: '#ffffff',
  },
  signalType: {
    fontSize: 8,
    marginTop: 12,
    letterSpacing: 2.2,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  qrPlate: {
    backgroundColor: '#ffffff',
    padding: 6,
  },
  tableBox: {
    borderWidth: 1.5,
    borderColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 56,
    alignItems: 'center',
  },
});

let packIqCache: { black: string; white: string } | null = null;
let apsLogoPathCache: Array<{
  d: string;
  fill: string;
  evenodd: boolean;
}> | null = null;

function getPackIqSrc(variant: 'black' | 'white'): string {
  if (!packIqCache) {
    const dir = path.join(process.cwd(), 'public/images');
    packIqCache = {
      black: `data:image/png;base64,${fs
        .readFileSync(path.join(dir, 'PackIQ_black.png'))
        .toString('base64')}`,
      white: `data:image/png;base64,${fs
        .readFileSync(path.join(dir, 'PackIQ_white.png'))
        .toString('base64')}`,
    };
  }
  return packIqCache[variant];
}

function getApsLogoPaths(variant: 'color' | 'light') {
  if (!apsLogoPathCache) {
    const svg = fs.readFileSync(
      path.join(process.cwd(), 'public/images/AutoPackSummit-Color-Vector.svg'),
      'utf8',
    );
    const paths: Array<{ d: string; fill: string; evenodd: boolean }> = [];
    const re = /<path\b([^>]*)>/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(svg))) {
      const attrs = match[1];
      const d = attrs.match(/\bd="([^"]+)"/)?.[1];
      const fill = attrs.match(/\bfill="([^"]+)"/)?.[1];
      if (!d || !fill || fill === 'none') continue;
      paths.push({
        d,
        fill,
        evenodd: /fill-rule="evenodd"/.test(attrs),
      });
    }
    apsLogoPathCache = paths;
  }

  return apsLogoPathCache.map((item) => ({
    ...item,
    fill: variant === 'light' ? '#ffffff' : item.fill,
  }));
}

function ApsLogoPdf({
  variant = 'color',
  width = 118,
}: {
  variant?: 'color' | 'light';
  width?: number;
}) {
  const height = width * (633 / 1800);
  const paths = getApsLogoPaths(variant);
  return (
    <Svg viewBox='0 0 1800 633' style={{ width, height }}>
      {paths.map((item, index) => (
        <Path
          key={index}
          d={item.d}
          fill={item.fill}
          fillRule={item.evenodd ? 'evenodd' : 'nonzero'}
        />
      ))}
    </Svg>
  );
}

function displayName(person: BadgePerson): { first: string; last: string } {
  const first = person.firstName || 'Guest';
  const last = person.lastName;
  return { first, last };
}

function ClassicBadge({
  person,
}: {
  person: BadgePdfPerson;
}) {
  const color = getTypeColor(person.attendeeType);
  const typeLabel = getTypeLabel(person.attendeeType);
  const { first, last } = displayName(person);
  const packiq = getPackIqSrc(getPackIqVariant(person.attendeeType));

  return (
    <Page size={[PAGE_W, PAGE_H]} style={styles.page}>
      <View style={styles.classicWhite}>
        <View style={styles.classicHeader}>
          <ApsLogoPdf />
          <Image src={person.qrDataUrl} style={styles.qr} />
        </View>
        <View style={styles.classicBody}>
          <Text
            style={[styles.firstName, { fontSize: firstNameFontSizePt(first) }]}
          >
            {first}
          </Text>
          {last ? <Text style={styles.lastName}>{last}</Text> : null}
          {person.company ? (
            <Text style={styles.company}>{person.company}</Text>
          ) : null}
          <Text style={styles.tableCaption}>
            TABLE  {formatTableLabel(person.tableNumber)}
          </Text>
        </View>
      </View>
      <View style={[styles.classicFooter, { backgroundColor: color }]}>
        <Text
          style={[styles.typeLabel, { fontSize: typeLabelFontSizePt(typeLabel) }]}
        >
          {typeLabel}
        </Text>
        <Image src={packiq} style={styles.packiq} />
      </View>
    </Page>
  );
}

function RailBadge({ person }: { person: BadgePdfPerson }) {
  const color = getTypeColor(person.attendeeType);
  const typeLabel = getTypeLabel(person.attendeeType).toUpperCase();
  const { first, last } = displayName(person);

  return (
    <Page size={[PAGE_W, PAGE_H]} style={[styles.page, { backgroundColor: '#ffffff' }]}>
      <View style={[styles.rail, { backgroundColor: color }]} />
      <View style={styles.railTypeWrap}>
        <Text style={styles.railType}>{typeLabel}</Text>
      </View>
      <View style={styles.railContent}>
        <View style={{ alignItems: 'flex-start' }}>
          <ApsLogoPdf />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', paddingRight: 8 }}>
          <Text style={[styles.railName, { fontSize: firstNameFontSizePt(first) + 2 }]}>
            {first}
          </Text>
          {last ? (
            <Text style={{ fontSize: 14, marginTop: 4, color: '#111111' }}>{last}</Text>
          ) : null}
          {person.company ? (
            <Text style={{ fontSize: 11, marginTop: 10, color: '#333333' }}>
              {person.company}
            </Text>
          ) : null}
          <Text
            style={{
              fontSize: 8,
              marginTop: 10,
              letterSpacing: 1.4,
              color: '#555555',
              fontFamily: 'Helvetica-Bold',
            }}
          >
            TABLE  {formatTableLabel(person.tableNumber)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Image src={getPackIqSrc('black')} style={{ width: 88, height: 36 }} />
          <Image src={person.qrDataUrl} style={{ width: 58, height: 58 }} />
        </View>
      </View>
    </Page>
  );
}

function SignalBadge({ person }: { person: BadgePdfPerson }) {
  const color = getTypeColor(person.attendeeType);
  const typeLabel = getTypeLabel(person.attendeeType).toUpperCase();
  const { first, last } = displayName(person);
  const packiq = getPackIqSrc(getPackIqVariant(person.attendeeType));

  return (
    <Page size={[PAGE_W, PAGE_H]} style={[styles.signalPage, { backgroundColor: color }]}>
      <ApsLogoPdf variant='light' width={128} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[styles.signalFirst, { fontSize: firstNameFontSizePt(first) + 6 }]}>
          {first}
        </Text>
        {last ? <Text style={styles.signalLast}>{last}</Text> : null}
        {person.company ? (
          <Text style={styles.signalCompany}>{person.company}</Text>
        ) : null}
        <Text style={styles.signalType}>{typeLabel}</Text>
      </View>
      <Image src={packiq} style={{ width: 92, height: 38, marginBottom: 10 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <View style={styles.qrPlate}>
          <Image src={person.qrDataUrl} style={{ width: 62, height: 62 }} />
        </View>
        <View style={styles.tableBox}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 7,
              letterSpacing: 1.6,
              fontFamily: 'Helvetica-Bold',
            }}
          >
            TABLE
          </Text>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              marginTop: 2,
              fontFamily: 'Helvetica-Bold',
            }}
          >
            {formatTableLabel(person.tableNumber)}
          </Text>
        </View>
      </View>
    </Page>
  );
}

function BadgePage({
  person,
  design,
}: {
  person: BadgePdfPerson;
  design: BadgeDesign;
}) {
  if (design === 'rail') return <RailBadge person={person} />;
  if (design === 'signal') return <SignalBadge person={person} />;
  return <ClassicBadge person={person} />;
}

export function BadgeDocument({
  people,
  design,
}: {
  people: BadgePdfPerson[];
  design: BadgeDesign;
}) {
  return (
    <Document>
      {people.map((person) => (
        <BadgePage key={person.id} person={person} design={design} />
      ))}
    </Document>
  );
}

export async function renderBadgePdf(input: {
  people: BadgePdfPerson[];
  design: BadgeDesign;
}): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  return renderToBuffer(
    <BadgeDocument people={input.people} design={input.design} />,
  );
}
