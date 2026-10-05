const SUMMARY_EVENT_ID = 'd00b35f5-c45b-42eb-b306-fa3dfeee0251';

const SESSIONS: Array<{ title: string; average: string; rated: number }> = [
  { title: 'OEM Panel', average: '4.38', rated: 58 },
  { title: 'Vehicle Forecasting, Joseph McCabe', average: '4.19', rated: 58 },
  { title: 'OEM Packaging Needs, Alex Seger, Nissan', average: '4.16', rated: 63 },
  { title: 'Robotics Integration at GM, Nasser Nasser', average: '4.01', rated: 72 },
  { title: 'OEM Packaging Needs, Carlos Gutierrez, Volvo', average: '3.90', rated: 63 },
  { title: 'Forming the Future, Nate Franck, TriEnda', average: '3.83', rated: 53 },
  { title: 'PakFab and Toyota case study', average: '3.70', rated: 53 },
  { title: 'Extended Producer Responsibility, Nissan', average: '3.67', rated: 52 },
  { title: 'Ask a Buyer', average: '3.61', rated: 54 },
  { title: 'Guardian Breakout Workshop', average: '3.61', rated: 41 },
  { title: "Isuzu's Next Chapter", average: '3.47', rated: 55 },
];

const INVITES: Array<{ name: string; company: string }> = [
  { name: 'Alex Buss', company: 'IPS Packaging & Automation' },
  { name: 'Erica', company: 'Rivian' },
  { name: 'Trae Whitfield', company: 'Honda' },
  { name: 'Rivian', company: 'Scout Motors' },
  { name: 'Mark Carpenter', company: 'Interchange 360 or CAA' },
  { name: 'Ken Perry', company: 'GM Defense' },
  { name: 'Toyota', company: 'TMMK' },
  { name: 'Vedagya Bakshi', company: 'Estare Inc' },
  { name: 'Scott Grooms', company: 'BMW' },
  { name: 'Jim O’Neill', company: 'Green Processing' },
  { name: 'John Onaga', company: 'G2' },
  { name: 'Lowell Huffman', company: 'Repurpose' },
  { name: 'Mike Costello', company: 'Palmetto Racks & Packs' },
  { name: 'Shane', company: 'ORBIS' },
  { name: 'BoxonTech', company: '' },
];

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4'>
      <p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>
        {label}
      </p>
      <p className='mt-1 text-2xl font-bold text-slate-900'>{value}</p>
      <p className='mt-1 text-sm text-slate-600'>{detail}</p>
    </div>
  );
}

export default function SurveySummary({ eventId }: { eventId: string }) {
  if (eventId !== SUMMARY_EVENT_ID) return null;

  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
        2026 summary
      </p>
      <h2 className='mt-2 text-2xl font-bold text-slate-900'>
        80 people finished, and every one of them said the summit was worth it.
      </h2>
      <p className='mt-3 max-w-3xl text-sm leading-6 text-slate-600'>
        Written from the completed surveys. The set is closed. Scores are out of
        5. Session averages only include people who rated that session.
      </p>

      <div className='mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
        <Stat label='Completions' value='80' detail='30 sponsors, 22 OEMs, 15 solution providers, 13 tier ones' />
        <Stat label='Summit rating' value='4.79' detail='63 gave 5 stars, 17 gave 4' />
        <Stat label='Network growth' value='4.51' detail='48 fives, 25 fours, 7 threes' />
        <Stat label='Gained value' value='80 / 80' detail='Yes from every respondent' />
      </div>

      <div className='mt-8 grid gap-8 lg:grid-cols-2'>
        <div>
          <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-500'>
            What landed
          </h3>
          <p className='mt-3 text-sm leading-6 text-slate-700'>
            Networking is the reason people came. Assigned seating, private
            meetings, and having buyers and suppliers in one room show up over
            and over. The sessions people named most often were the OEM panel,
            Joseph McCabe’s vehicle forecast, Alex Seger’s Nissan talk, and
            Nasser Nasser on robotics at GM. PakFab with Toyota, Ask a Buyer,
            and the pack pitch also got named. Sponsors and OEMs rated the day
            slightly higher than tier ones. Solution providers were the least
            satisfied with how much their network grew.
          </p>
        </div>
        <div>
          <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-500'>
            What to change
          </h3>
          <p className='mt-3 text-sm leading-6 text-slate-700'>
            The day is too full. People had to choose between the ballroom and
            the exhibit hall, and several said speakers lost the room because
            attendees stayed at the booths. The clearest request is more
            dedicated networking, including one-to-one time, and a longer show,
            closer to a day and a half or two days. Table games split the room:
            a few loved the opener, and several called them the least useful
            part. A handful said the app was slow, phones died from scanning,
            and QR contacts were less useful than business cards. The exhibit
            hall was too cold for a few people. EPR was polarizing: some named
            it a favorite, others said it did not apply or was not what they
            hoped for.
          </p>
        </div>
      </div>

      <div className='mt-8'>
        <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-500'>
          Session ratings
        </h3>
        <ol className='mt-3 divide-y divide-slate-100'>
          {SESSIONS.map((session) => (
            <li
              key={session.title}
              className='flex items-baseline justify-between gap-4 py-2 text-sm'
            >
              <span className='text-slate-800'>{session.title}</span>
              <span className='shrink-0 font-semibold text-slate-900'>
                {session.average}
                <span className='ml-2 font-normal text-slate-500'>
                  {session.rated} ratings
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className='mt-8'>
        <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-500'>
          Who they want next year
        </h3>
        <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
          {INVITES.map((invite) => (
            <li key={`${invite.name}-${invite.company}`} className='text-sm text-slate-800'>
              <span className='font-semibold'>{invite.name}</span>
              {invite.company ? (
                <span className='text-slate-500'> · {invite.company}</span>
              ) : null}
            </li>
          ))}
        </ul>
        <p className='mt-3 text-sm text-slate-600'>
          One person also asked for more tier-one suppliers in general, without
          naming a company. Full contact details are still on each submission.
        </p>
      </div>
    </section>
  );
}
