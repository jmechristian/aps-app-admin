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
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  BADGE_PAGE,
  STICKER_PAGE,
  firstNameFontSizePt,
  formatTableLabel,
  getTypeColor,
  getTypeLabel,
  isBlankBadge,
  stickerLockupScale,
  type BadgeDesign,
  type BadgePerson,
} from '@/lib/badges';

export type BadgePdfPerson = BadgePerson & { qrDataUrl: string };

// Match browser wrapping: don't hyphenate names or company names mid-word.
Font.registerHyphenationCallback((word) => [word]);

const PAGE_W = BADGE_PAGE.pagePt.w;
const PAGE_H = BADGE_PAGE.pagePt.h;
const BLEED = BADGE_PAGE.bleedPt;
const SAFE = BLEED + 9;
const PUNCH = BLEED + 36;
const STICKER_W = STICKER_PAGE.pagePt.w;
const STICKER_H = STICKER_PAGE.pagePt.h;
const RAIL_W = BLEED + 52;

const styles = StyleSheet.create({
  stickerPage: {
    width: STICKER_W,
    height: STICKER_H,
    fontFamily: 'Helvetica',
    color: '#111111',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  page: {
    width: PAGE_W,
    height: PAGE_H,
    fontFamily: 'Helvetica',
    color: '#111111',
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
    fontSize: 20,
    letterSpacing: 1.4,
  },
  railContent: {
    marginLeft: RAIL_W,
    height: PAGE_H,
    paddingTop: PUNCH,
    paddingRight: SAFE,
    paddingLeft: 14,
    paddingBottom: BLEED + 26,
  },
  railName: {
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    lineHeight: 1,
  },
});

let apsLogoPathCache: Array<{
  d: string;
  fill: string;
  evenodd: boolean;
}> | null = null;

let packIqCache: { black: string; white: string } | null = null;

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

export function ApsLogoPdf({
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
  const first = person.firstName || (person.email ? 'Guest' : '');
  const last = person.lastName;
  return { first, last };
}

function QrSlot({
  src,
  width,
  height,
}: {
  src?: string | null;
  width: number;
  height: number;
}) {
  if (src) {
    return <Image src={src} style={{ width, height }} />;
  }
  return (
    <View
      style={{
        width,
        height,
        borderWidth: 1,
        borderColor: '#d4d4d8',
        backgroundColor: '#ffffff',
      }}
    />
  );
}

function StickerBadge({ person }: { person: BadgePdfPerson }) {
  const { first, last } = displayName(person);
  const blank = isBlankBadge(person);
  const s = stickerLockupScale();

  return (
    <Page size={[STICKER_W, STICKER_H]} style={styles.stickerPage}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {first ? (
          <Text
            style={{
              fontFamily: 'Helvetica-Bold',
              fontSize: (firstNameFontSizePt(first) + 2) * s,
              color: '#111111',
              lineHeight: 1,
            }}
          >
            {first}
          </Text>
        ) : null}
        {last ? (
          <Text
            style={{
              fontFamily: 'Helvetica-Bold',
              fontSize: 22 * s,
              marginTop: first ? 6 * s : 0,
              color: '#111111',
              lineHeight: 1.25,
            }}
          >
            {last}
          </Text>
        ) : null}
        {person.company ? (
          <Text
            style={{
              fontSize: 20 * s,
              marginTop: 8 * s,
              color: '#1e293b',
              lineHeight: 1.25,
            }}
          >
            {person.company}
          </Text>
        ) : null}
        {person.tableNumber == null ? null : (
          <Text
            style={{
              fontSize: 12 * s,
              marginTop: 24 * s,
              letterSpacing: 1.4 * s,
              color: '#555555',
              fontFamily: 'Helvetica-Bold',
            }}
          >
            TABLE  {formatTableLabel(person.tableNumber)}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingRight: 12 * s,
        }}
      >
        <Image src={getPackIqSrc('black')} style={{ width: 88 * s, height: 36 * s }} />
        {blank ? null : (
          <QrSlot src={person.qrDataUrl} width={72 * s} height={72 * s} />
        )}
      </View>
    </Page>
  );
}

function RailBadge({ person }: { person: BadgePdfPerson }) {
  const color = getTypeColor(person.attendeeType);
  const typeLabel = getTypeLabel(person.attendeeType).toUpperCase();
  const { first, last } = displayName(person);
  const blank = isBlankBadge(person);

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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {first ? (
            <Text style={[styles.railName, { fontSize: firstNameFontSizePt(first) + 2 }]}>
              {first}
            </Text>
          ) : null}
          {last ? (
            <Text
              style={{
                fontSize: 22,
                marginTop: first ? 6 : 0,
                color: '#111111',
                fontFamily: 'Helvetica-Bold',
                lineHeight: 1.25,
                width: '100%',
              }}
            >
              {last}
            </Text>
          ) : null}
          {person.company ? (
            <Text
              style={{
                fontSize: 20,
                lineHeight: 1.25,
                width: '100%',
              }}
            >
              {person.company}
            </Text>
          ) : null}
          {person.tableNumber == null ? null : (
            <Text
              style={{
                fontSize: 12,
                marginTop: 24,
                letterSpacing: 1.4,
                color: '#555555',
                fontFamily: 'Helvetica-Bold',
              }}
            >
              TABLE  {formatTableLabel(person.tableNumber)}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingRight: 12,
          }}
        >
          <Image src={getPackIqSrc('black')} style={{ width: 88, height: 36 }} />
          {blank ? null : (
            <QrSlot src={person.qrDataUrl} width={72} height={72} />
          )}
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
  return <StickerBadge person={person} />;
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
