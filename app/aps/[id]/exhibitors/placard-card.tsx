import { APS_LOGO_SVG } from '@/lib/badges';
import {
  PLACARD_COLORS,
  companyNameFontSizePt,
  formatBoothLabel,
  previewPx,
  type PlacardExhibitor,
} from '@/lib/placards';

const DEFAULT_WIDTH = 280;

function PlacardFace({
  exhibitor,
  cardWidth,
  inverted,
}: {
  exhibitor: PlacardExhibitor;
  cardWidth: number;
  inverted?: boolean;
}) {
  const px = (pt: number) => previewPx(pt, cardWidth);
  const company = exhibitor.companyName.trim() || 'Exhibitor';
  const booth = formatBoothLabel(exhibitor.boothNumber);
  const qr = px(128);

  return (
    <div
      className='flex h-1/2 flex-col overflow-hidden bg-white'
      style={inverted ? { transform: 'rotate(180deg)' } : undefined}
    >
      <div
        className='flex items-center justify-between px-[4.5%]'
        style={{
          height: px(58),
          backgroundColor: PLACARD_COLORS.navy,
        }}
      >
        <img
          src={APS_LOGO_SVG}
          alt='Automotive Packaging Summit'
          width={px(118)}
          height={px(118) * (633 / 1800)}
          className='object-contain object-left brightness-0 invert'
        />
        <p
          className='font-bold tracking-[0.22em] text-white'
          style={{ fontSize: px(12) }}
        >
          PASSPORT CHALLENGE
        </p>
      </div>
      <div
        style={{ height: px(6), backgroundColor: PLACARD_COLORS.yellow }}
      />
      <div className='flex flex-1 items-center gap-3 px-[4.5%] py-3'>
        <div className='min-w-0 flex-1'>
          <p
            className='font-bold leading-[1.1] text-slate-900'
            style={{ fontSize: px(companyNameFontSizePt(company)) }}
          >
            {company}
          </p>
          {booth ? (
            <p
              className='mt-1.5 font-bold'
              style={{ fontSize: px(16), color: PLACARD_COLORS.navy }}
            >
              {booth}
            </p>
          ) : null}
        </div>
        <div className='flex shrink-0 flex-col items-center'>
          <div className='border border-slate-200 bg-white p-1'>
            {exhibitor.qrCodeUrl ? (
              <img
                src={exhibitor.qrCodeUrl}
                alt=''
                width={qr}
                height={qr}
                className='bg-white object-contain'
              />
            ) : (
              <div
                className='grid place-items-center bg-slate-100 text-[8px] font-semibold uppercase tracking-wide text-slate-500'
                style={{ width: qr, height: qr }}
              >
                QR
              </div>
            )}
          </div>
          <p
            className='mt-1 font-bold tracking-[0.16em] text-slate-500'
            style={{ fontSize: px(8) }}
          >
            SCAN TO STAMP
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PlacardCard({
  exhibitor,
  width = DEFAULT_WIDTH,
}: {
  exhibitor: PlacardExhibitor;
  width?: number;
}) {
  return (
    <div
      className='relative overflow-hidden bg-white shadow-md'
      style={{ width, aspectRatio: '8.5 / 11' }}
    >
      <PlacardFace exhibitor={exhibitor} cardWidth={width} inverted />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-[4.5%] border-t border-dashed border-slate-300'
        style={{ top: '50%' }}
      />
      <PlacardFace exhibitor={exhibitor} cardWidth={width} />
    </div>
  );
}
