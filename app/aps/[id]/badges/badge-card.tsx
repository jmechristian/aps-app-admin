import {
  APS_LOGO_SVG,
  BADGE_PAGE,
  STICKER_PAGE,
  firstNameFontSizePt,
  formatTableLabel,
  getTypeColor,
  getTypeLabel,
  isBlankBadge,
  previewPx,
  stickerLockupScale,
  type BadgeDesign,
  type BadgePerson,
} from '@/lib/badges';

const DEFAULT_WIDTH = 252;

function ApsLogo({
  variant = 'color',
  width,
}: {
  variant?: 'color' | 'light';
  width: number;
}) {
  const height = width * (633 / 1800);
  return (
    <img
      src={APS_LOGO_SVG}
      alt='Automotive Packaging Summit'
      width={width}
      height={height}
      className={
        variant === 'light'
          ? 'object-contain object-left brightness-0 invert'
          : 'object-contain object-left'
      }
    />
  );
}

function PunchGuide({ cardWidth }: { cardWidth: number }) {
  const size = previewPx(16, cardWidth);
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute left-1/2 rounded-full border border-dashed'
      style={{
        width: size,
        height: size,
        top: previewPx(BADGE_PAGE.bleedPt + 10, cardWidth),
        transform: 'translateX(-50%)',
        borderColor: 'rgba(15,23,42,0.28)',
      }}
    />
  );
}

function TrimGuide() {
  const insetX = `${(BADGE_PAGE.bleedIn / BADGE_PAGE.pageIn.w) * 100}%`;
  const insetY = `${(BADGE_PAGE.bleedIn / BADGE_PAGE.pageIn.h) * 100}%`;
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute border border-dashed border-black/15'
      style={{
        top: insetY,
        right: insetX,
        bottom: insetY,
        left: insetX,
      }}
    />
  );
}

function QrImage({ url, size }: { url: string | null; size: number }) {
  if (url) {
    return (
      <img
        src={url}
        alt=''
        width={size}
        height={size}
        className='bg-white object-contain'
      />
    );
  }
  return (
    <div
      className='grid place-items-center bg-slate-200 text-[8px] font-semibold uppercase tracking-wide text-slate-500'
      style={{ width: size, height: size }}
    >
      QR
    </div>
  );
}

function stickerPx(pt: number, cardWidth: number) {
  return (pt / STICKER_PAGE.pagePt.w) * cardWidth;
}

function StickerCard({
  person,
  cardWidth,
}: {
  person: BadgePerson;
  cardWidth: number;
}) {
  const first = person.firstName || 'Guest';
  const scale = stickerLockupScale();
  const px = (pt: number) => stickerPx(pt * scale, cardWidth);
  const blank = isBlankBadge(person);

  return (
    <div
      className='relative overflow-hidden bg-white text-slate-900 shadow-md'
      style={{
        width: cardWidth,
        aspectRatio: `${STICKER_PAGE.pageIn.w} / ${STICKER_PAGE.pageIn.h}`,
      }}
    >
      <div
        className='flex h-full flex-col'
        style={{
          paddingTop: px(16),
          paddingRight: px(18),
          paddingBottom: px(16),
          paddingLeft: px(14),
        }}
      >
        <div className='flex flex-1 flex-col justify-center'>
          <p
            className='font-bold leading-none'
            style={{ fontSize: px(firstNameFontSizePt(first) + 2) }}
          >
            {first}
          </p>
          {person.lastName ? (
            <p
              className='font-bold leading-tight'
              style={{ fontSize: px(22), marginTop: px(6) }}
            >
              {person.lastName}
            </p>
          ) : null}
          {person.company ? (
            <p
              className='leading-tight text-slate-800'
              style={{ fontSize: px(20), marginTop: px(8) }}
            >
              {person.company}
            </p>
          ) : null}
          {person.tableNumber == null ? null : (
            <p
              className='font-bold tracking-[0.16em] text-slate-500'
              style={{ fontSize: px(12), marginTop: px(24) }}
            >
              TABLE  {formatTableLabel(person.tableNumber)}
            </p>
          )}
        </div>
        <div
          className='flex items-end justify-between gap-2'
          style={{ paddingRight: px(12) }}
        >
          <img
            src='/images/PackIQ_black.png'
            alt='PackIQ'
            className='object-contain object-left'
            style={{ width: px(88), height: px(36) }}
          />
          {blank ? <span /> : <QrImage url={person.qrCodeUrl} size={px(72)} />}
        </div>
      </div>
    </div>
  );
}

function RailCard({
  person,
  cardWidth,
}: {
  person: BadgePerson;
  cardWidth: number;
}) {
  const color = getTypeColor(person.attendeeType);
  const typeLabel = getTypeLabel(person.attendeeType).toUpperCase();
  const first = person.firstName || 'Guest';
  const railPct = ((BADGE_PAGE.bleedPt + 52) / BADGE_PAGE.pagePt.w) * 100;
  const px = (pt: number) => previewPx(pt, cardWidth);
  const blank = isBlankBadge(person);

  return (
    <div
      className='relative overflow-hidden bg-white text-slate-900 shadow-md'
      style={{ width: cardWidth, aspectRatio: '4.25 / 5.25' }}
    >
      <div
        className='absolute inset-y-0 left-0 flex items-center justify-center'
        style={{ width: `${railPct}%`, backgroundColor: color }}
      >
        <p
          className='whitespace-nowrap font-bold tracking-[0.16em] text-white'
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: px(20),
          }}
        >
          {typeLabel}
        </p>
      </div>
      <div
        className='flex h-full flex-col pt-[12%] pr-[7%] pb-[10%]'
        style={{ paddingLeft: `${railPct + 4}%` }}
      >
        <ApsLogo width={px(118)} />
        <div className='flex flex-1 flex-col justify-center'>
          <p
            className='font-bold leading-none'
            style={{ fontSize: px(firstNameFontSizePt(first) + 2) }}
          >
            {first}
          </p>
          {person.lastName ? (
            <p
              className='mt-1.5 font-bold leading-tight'
              style={{ fontSize: px(22) }}
            >
              {person.lastName}
            </p>
          ) : null}
          {person.company ? (
            <p
              className='mt-2.5 leading-tight text-slate-800'
              style={{ fontSize: px(20) }}
            >
              {person.company}
            </p>
          ) : null}
          {person.tableNumber == null ? null : (
            <p
              className='font-bold tracking-[0.16em] text-slate-500'
              style={{ fontSize: px(12), marginTop: px(24) }}
            >
              TABLE  {formatTableLabel(person.tableNumber)}
            </p>
          )}
        </div>
        <div className='flex items-end justify-between gap-2' style={{ paddingRight: px(12) }}>
          <img
            src='/images/PackIQ_black.png'
            alt='PackIQ'
            className='object-contain'
            style={{ height: px(28) }}
          />
          {blank ? null : <QrImage url={person.qrCodeUrl} size={px(72)} />}
        </div>
      </div>
      <PunchGuide cardWidth={cardWidth} />
      <TrimGuide />
    </div>
  );
}

export default function BadgeCard({
  person,
  design,
  width = DEFAULT_WIDTH,
}: {
  person: BadgePerson;
  design: BadgeDesign;
  width?: number;
}) {
  if (design === 'rail') {
    return <RailCard person={person} cardWidth={width} />;
  }
  return <StickerCard person={person} cardWidth={width} />;
}
