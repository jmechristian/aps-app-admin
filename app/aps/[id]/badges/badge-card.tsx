import {
  APS_LOGO_SVG,
  BADGE_PAGE,
  CLASSIC_SPLIT,
  firstNameFontSizePt,
  formatTableLabel,
  getPackIqVariant,
  getTypeColor,
  getTypeLabel,
  previewPx,
  typeLabelFontSizePt,
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

function PunchGuide({
  onDark,
  cardWidth,
}: {
  onDark?: boolean;
  cardWidth: number;
}) {
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
        borderColor: onDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,23,42,0.28)',
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

function ClassicCard({
  person,
  cardWidth,
}: {
  person: BadgePerson;
  cardWidth: number;
}) {
  const color = getTypeColor(person.attendeeType);
  const typeLabel = getTypeLabel(person.attendeeType);
  const first = person.firstName || 'Guest';
  const packiq =
    getPackIqVariant(person.attendeeType) === 'white'
      ? '/images/PackIQ_white.png'
      : '/images/PackIQ_black.png';
  const whitePct =
    ((BADGE_PAGE.bleedPt + CLASSIC_SPLIT * BADGE_PAGE.trimPt.h) /
      BADGE_PAGE.pagePt.h) *
    100;
  const px = (pt: number) => previewPx(pt, cardWidth);

  return (
    <div
      className='relative overflow-hidden bg-white text-slate-900 shadow-md'
      style={{ width: cardWidth, aspectRatio: '4.25 / 5.25' }}
    >
      <div
        className='flex flex-col px-[7.5%] pt-[12%]'
        style={{ height: `${whitePct}%` }}
      >
        <div className='flex items-start justify-between gap-2'>
          <ApsLogo width={px(118)} />
          <QrImage url={person.qrCodeUrl} size={px(50)} />
        </div>
        <div className='flex flex-1 flex-col items-center justify-center pb-2 text-center'>
          <p
            className='font-bold leading-none'
            style={{ fontSize: px(firstNameFontSizePt(first)) }}
          >
            {first}
          </p>
          {person.lastName ? (
            <p className='mt-1 leading-tight' style={{ fontSize: px(13) }}>
              {person.lastName}
            </p>
          ) : null}
          {person.company ? (
            <p
              className='mt-2 leading-tight text-slate-800'
              style={{ fontSize: px(11) }}
            >
              {person.company}
            </p>
          ) : null}
          <p
            className='mt-2 font-bold tracking-[0.16em] text-slate-500'
            style={{ fontSize: px(8) }}
          >
            TABLE  {formatTableLabel(person.tableNumber)}
          </p>
        </div>
      </div>
      <div
        className='flex flex-col items-center justify-center px-3 pb-3 text-center text-white'
        style={{ height: `${100 - whitePct}%`, backgroundColor: color }}
      >
        <p
          className='font-bold leading-tight'
          style={{ fontSize: px(typeLabelFontSizePt(typeLabel)) }}
        >
          {typeLabel}
        </p>
        <img
          src={packiq}
          alt='PackIQ'
          className='mt-1.5 object-contain'
          style={{ height: px(28) }}
        />
      </div>
      <PunchGuide cardWidth={cardWidth} />
      <TrimGuide />
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
  const railPct = ((BADGE_PAGE.bleedPt + 46) / BADGE_PAGE.pagePt.w) * 100;
  const px = (pt: number) => previewPx(pt, cardWidth);

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
            fontSize: px(16),
          }}
        >
          {typeLabel}
        </p>
      </div>
      <div
        className='flex h-full flex-col pt-[12%] pr-[7%] pb-[6%]'
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
            <p className='mt-1 leading-tight' style={{ fontSize: px(14) }}>
              {person.lastName}
            </p>
          ) : null}
          {person.company ? (
            <p
              className='mt-2 leading-tight text-slate-700'
              style={{ fontSize: px(11) }}
            >
              {person.company}
            </p>
          ) : null}
          <p
            className='mt-2 font-bold tracking-[0.16em] text-slate-500'
            style={{ fontSize: px(8) }}
          >
            TABLE  {formatTableLabel(person.tableNumber)}
          </p>
        </div>
        <div className='flex items-end justify-between gap-2'>
          <img
            src='/images/PackIQ_black.png'
            alt='PackIQ'
            className='object-contain'
            style={{ height: px(28) }}
          />
          <QrImage url={person.qrCodeUrl} size={px(58)} />
        </div>
      </div>
      <PunchGuide cardWidth={cardWidth} />
      <TrimGuide />
    </div>
  );
}

function SignalCard({
  person,
  cardWidth,
}: {
  person: BadgePerson;
  cardWidth: number;
}) {
  const color = getTypeColor(person.attendeeType);
  const typeLabel = getTypeLabel(person.attendeeType).toUpperCase();
  const first = person.firstName || 'Guest';
  const packiq =
    getPackIqVariant(person.attendeeType) === 'white'
      ? '/images/PackIQ_white.png'
      : '/images/PackIQ_black.png';
  const px = (pt: number) => previewPx(pt, cardWidth);

  return (
    <div
      className='relative overflow-hidden text-white shadow-md'
      style={{
        width: cardWidth,
        aspectRatio: '4.25 / 5.25',
        backgroundColor: color,
      }}
    >
      <div className='flex h-full flex-col px-[7.5%] pt-[12%] pb-[6%]'>
        <ApsLogo variant='light' width={px(128)} />
        <div className='flex flex-1 flex-col justify-center'>
          <p
            className='font-bold leading-none'
            style={{ fontSize: px(firstNameFontSizePt(first) + 6) }}
          >
            {first}
          </p>
          {person.lastName ? (
            <p className='mt-1 leading-tight' style={{ fontSize: px(15) }}>
              {person.lastName}
            </p>
          ) : null}
          {person.company ? (
            <p
              className='mt-2 leading-tight text-white/90'
              style={{ fontSize: px(11) }}
            >
              {person.company}
            </p>
          ) : null}
          <p
            className='mt-3 font-bold tracking-[0.22em]'
            style={{ fontSize: px(8) }}
          >
            {typeLabel}
          </p>
        </div>
        <img
          src={packiq}
          alt='PackIQ'
          className='mb-2.5 self-start object-contain'
          style={{ height: px(30) }}
        />
        <div className='flex items-end justify-between gap-2'>
          <div className='bg-white p-1.5'>
            <QrImage url={person.qrCodeUrl} size={px(62)} />
          </div>
          <div className='min-w-[3.2rem] border-[1.5px] border-white px-2.5 py-1.5 text-center'>
            <p className='font-bold tracking-[0.18em]' style={{ fontSize: px(7) }}>
              TABLE
            </p>
            <p className='font-bold leading-none' style={{ fontSize: px(20) }}>
              {formatTableLabel(person.tableNumber)}
            </p>
          </div>
        </div>
      </div>
      <PunchGuide onDark cardWidth={cardWidth} />
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
  if (design === 'signal') {
    return <SignalCard person={person} cardWidth={width} />;
  }
  return <ClassicCard person={person} cardWidth={width} />;
}
