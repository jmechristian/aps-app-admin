export type CsvSeatingRow = {
  line: number;
  attendeeType: string;
  firstName: string;
  lastName: string;
  company: string;
  tableNumber: number | null;
};

export type SeatingImportRegistrant = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  attendeeType?: string | null;
  status?: string | null;
  companyName?: string | null;
  tableNumber?: number | null;
};

export type SeatingImportAssignment = {
  csv: CsvSeatingRow;
  registrant: SeatingImportRegistrant;
  confidence: 'exact' | 'strong' | 'fuzzy';
  reason: string;
};

export type SeatingImportConflict = {
  csv: CsvSeatingRow;
  candidates: Array<{
    registrant: SeatingImportRegistrant;
    score: number;
    reason: string;
  }>;
  reason: string;
};

export type SeatingImportResult = {
  skipped: Array<{ csv: CsvSeatingRow; reason: string }>;
  unmatched: Array<{ csv: CsvSeatingRow; reason: string }>;
  conflicts: SeatingImportConflict[];
  assignments: SeatingImportAssignment[];
};

const NICKNAMES: Record<string, string[]> = {
  alexander: ['alex'],
  alexandra: ['alex'],
  andrew: ['andy', 'drew'],
  anthony: ['tony'],
  benjamin: ['ben'],
  christopher: ['chris'],
  daniel: ['dan', 'danny'],
  david: ['dave'],
  edward: ['ed', 'eddie', 'ted'],
  gabriel: ['gabe'],
  gregory: ['greg'],
  james: ['jim', 'jimmy'],
  jeffrey: ['jeff'],
  jennifer: ['jen', 'jenny'],
  jonathan: ['jon'],
  joseph: ['joe'],
  joshua: ['josh'],
  kenneth: ['ken'],
  matthew: ['matt'],
  michael: ['mike'],
  mitchell: ['mitch'],
  nathan: ['nate'],
  nicholas: ['nick'],
  patrick: ['pat'],
  philip: ['phil'],
  phillip: ['phil'],
  raymond: ['ray'],
  richard: ['rick', 'rich'],
  robert: ['bob', 'rob'],
  samuel: ['sam'],
  stephen: ['steve'],
  steven: ['steve'],
  thomas: ['tom', 'tommy'],
  timothy: ['tim'],
  william: ['will', 'bill'],
  zachary: ['zach'],
};

const COMPANY_ALIASES: Record<string, string> = {
  bmw: 'bmw',
  'bmw manufacturing': 'bmw',
  'general motors': 'gm',
  gm: 'gm',
  'zoox inc': 'zoox',
  zoox: 'zoox',
  'toyota motor north america': 'toyota',
  toyota: 'toyota',
  'american honda motor company': 'honda',
  'american honda motor company inc': 'honda',
  honda: 'honda',
  'honda of canada mfg': 'honda canada',
  'honda development manufacturing of america': 'honda dma',
  'honda trading america': 'honda trading',
  'caterpillar inc': 'caterpillar',
  caterpillar: 'caterpillar',
  'kubota manufacturing of america': 'kubota',
  kubota: 'kubota',
  'ips packaging automation': 'ips',
  'ips packaging and automation': 'ips',
  'robert bosch': 'bosch',
  'robert bosch llc': 'bosch',
  bosch: 'bosch',
  'georg utz': 'utz',
  'georg utz inc': 'utz',
  'denso manufacturing michigan': 'denso',
  'denso south sub region': 'denso',
  denso: 'denso',
  'isuzu north american corporation': 'isuzu',
  'isuzu logistics north america ilna': 'isuzu',
  isuzu: 'isuzu',
  'yamaha motor manufacturing corporation': 'yamaha',
  yamaha: 'yamaha',
  'nissan north america': 'nissan',
  nissan: 'nissan',
  'volvo cars us': 'volvo cars',
  'volvo group': 'volvo group',
  volvo: 'volvo',
  'cummins inc': 'cummins',
  cummins: 'cummins',
  'ferrari s p a': 'ferrari',
  'ferrari spa': 'ferrari',
  ferrari: 'ferrari',
  'hyundai motor group metaplant america': 'hyundai',
  hyundai: 'hyundai',
  'harley davidson motor company': 'harley',
  'mercedes benz': 'mercedes',
  'primex design and fabrication': 'primex',
  'primex design fabrication': 'primex',
  primex: 'primex',
  'the packaging school': 'packaging school',
  'packagingschool com': 'packaging school',
  'ntic zerust': 'zerust',
  zerust: 'zerust',
  'guardian container consulting': 'guardian',
  'guardian container': 'guardian',
  'itb packaging': 'itb',
  'itb packaging llc': 'itb',
  'variotech corporation': 'variotech',
  variotech: 'variotech',
  'decostar georgia magna': 'decostar',
  decostar: 'decostar',
  'doug brown packaging products inc': 'doug brown',
  'forming technologies llc': 'forming technologies',
  'green processing company inc': 'green processing',
  'material systems inc': 'material systems',
  'ten e packaging solutions inc': 'tene',
  'freudenberg performance materials': 'freudenberg',
  'gebhardt logistic solutions gmbh': 'gebhardt',
  'buckhorn inc': 'buckhorn',
  'aeris protective packaging inc': 'aeris',
  'racks and dunnage': 'racks and dunnage',
  'pack studio': 'pack studio',
  'caster connection': 'caster',
  'ktpconteyor': 'ktp',
  'ssi schaefer': 'ssi',
  'big 3 precision': 'big 3',
  'carolina performance': 'carolina performance',
  'wave reaction': 'wave reaction',
  'form packaging': 'form packaging',
  'product movers': 'product movers',
  'repurpose global': 'repurpose',
  'goodpack usa inc': 'goodpack',
  'daubert cromwell': 'daubert',
  'ventek solutions': 'ventek',
  'arplank direct': 'arplank',
  pakfab: 'pakfab',
  chep: 'chep',
  'orbis corporation': 'orbis',
  orbis: 'orbis',
  'mts systems na': 'mts',
  packiq: 'packiq',
  nefab: 'nefab',
  polymos: 'polymos',
  'peninsula plastics': 'peninsula',
  'con pearl na': 'conpearl',
  signode: 'signode',
  trienda: 'trienda',
  'g2 supply': 'g2',
  'crate pros': 'crate pros',
  'ufp packaging': 'ufp',
  'bradford company': 'bradford',
  'amatech inc': 'amatech',
  'monoflo international': 'monoflo',
  'fortus one': 'fortus',
  'anchor bay packaging': 'anchor bay',
  'fca packaging': 'fca',
  'armor protective packaging': 'armor',
  'textron specialized vehicles': 'textron',
  'mercury marine': 'mercury',
  'scout motors': 'scout',
  'stellantis': 'stellantis',
  mopar: 'mopar',
  'paccar corporate': 'paccar',
  rivian: 'rivian',
  tesla: 'tesla',
  magna: 'magna',
  opmobility: 'opmobility',
};

const COMPANY_STOPWORDS = new Set([
  'inc',
  'llc',
  'ltd',
  'corp',
  'corporation',
  'company',
  'co',
  'the',
  'of',
  'and',
  'na',
  'usa',
  'gmbh',
  'lp',
  'plc',
  'group',
  'international',
  'america',
  'american',
  'north',
  'manufacturing',
  'mfg',
  'solutions',
  'packaging',
  'jr',
]);

const PLACEHOLDER_TYPES = new Set([
  'additional oems',
  'exhibitor ticket',
  'tier ones',
  'solution provider',
  'sponsors',
]);

function normalizeText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function nameTokens(value: string) {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token && !['jr', 'sr', 'ii', 'iii', 'iv', 'phd'].includes(token));
}

function nicknameSet(first: string) {
  const key = normalizeText(first);
  const aliases = new Set<string>([key]);
  const mapped = NICKNAMES[key];
  if (mapped) mapped.forEach((alias) => aliases.add(alias));
  for (const [canonical, nicks] of Object.entries(NICKNAMES)) {
    if (nicks.includes(key)) {
      aliases.add(canonical);
      nicks.forEach((alias) => aliases.add(alias));
    }
  }
  return aliases;
}

function firstNamesCompatible(a: string, b: string) {
  const aTokens = nameTokens(a);
  const bTokens = nameTokens(b);
  if (!aTokens.length || !bTokens.length) return false;
  if (aTokens.join(' ') === bTokens.join(' ')) return true;
  const aNicks = nicknameSet(aTokens[0]);
  const bNicks = nicknameSet(bTokens[0]);
  if ([...aNicks].some((nick) => bNicks.has(nick))) return true;
  if (aTokens[0].length >= 3 && bTokens[0].length >= 3) {
    if (aTokens[0].startsWith(bTokens[0]) || bTokens[0].startsWith(aTokens[0])) {
      return true;
    }
  }
  return aTokens.some((token) => bTokens.includes(token) && token.length >= 3);
}

function lastNamesCompatible(a: string, b: string) {
  const aTokens = nameTokens(a);
  const bTokens = nameTokens(b);
  if (!aTokens.length || !bTokens.length) return false;
  if (aTokens.join(' ') === bTokens.join(' ')) return true;
  if (aTokens[aTokens.length - 1] === bTokens[bTokens.length - 1]) return true;
  const aSet = new Set(aTokens);
  return bTokens.some((token) => token.length >= 4 && aSet.has(token));
}

function canonicalizeCompany(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) return '';
  if (COMPANY_ALIASES[normalized]) return COMPANY_ALIASES[normalized];
  const compact = normalized
    .split(' ')
    .filter((token) => !COMPANY_STOPWORDS.has(token))
    .join(' ');
  return COMPANY_ALIASES[compact] ?? compact ?? normalized;
}

function companyScore(a: string, b: string) {
  const aCanon = canonicalizeCompany(a);
  const bCanon = canonicalizeCompany(b);
  if (!aCanon || !bCanon) return 0;
  if (aCanon === bCanon) return 1;
  if (aCanon.includes(bCanon) || bCanon.includes(aCanon)) return 0.86;
  const aTokens = new Set(aCanon.split(' ').filter(Boolean));
  const bTokens = bCanon.split(' ').filter(Boolean);
  if (!aTokens.size || !bTokens.length) return 0;
  const overlap = bTokens.filter((token) => aTokens.has(token));
  if (!overlap.length) return 0;
  const union = new Set([...aTokens, ...bTokens]);
  return overlap.length / union.size;
}

export function parseCsvAttendeeTypes(raw: string): string[] {
  const normalized = normalizeText(raw).replace(/\s+/g, '');
  if (!normalized) return [];
  const types: string[] = [];
  if (normalized.includes('oem')) types.push('OEM');
  if (normalized.includes('tier')) types.push('TIER1');
  if (normalized.includes('solution')) types.push('SOLUTIONPROVIDER');
  if (normalized.includes('sponsor')) types.push('SPONSOR');
  if (normalized.includes('speaker')) types.push('SPEAKER');
  if (normalized.includes('exhibitor')) types.push('EXHIBITOR');
  return types;
}

function typesCompatible(csvType: string, registrantType?: string | null) {
  const csvTypes = parseCsvAttendeeTypes(csvType);
  if (!csvTypes.length || !registrantType) return false;
  return csvTypes.includes(registrantType);
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  fields.push(current.trim());
  return fields;
}

export function parseSeatingCsv(contents: string): CsvSeatingRow[] {
  const lines = contents.replace(/^\uFEFF/, '').split(/\r?\n/);
  const rows: CsvSeatingRow[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    if (!raw.trim()) continue;
    const fields = parseCsvLine(raw);
    if (i === 0 && normalizeText(fields[0] ?? '').includes('attendeetype')) {
      continue;
    }

    const attendeeType = (fields[0] ?? '').trim();
    const firstName = (fields[1] ?? '').trim();
    const lastName = (fields[2] ?? '').trim();
    const company = (fields[3] ?? '').trim();
    const tableRaw = (fields[4] ?? '').trim();
    const tableNumber = tableRaw ? Number(tableRaw) : null;

    rows.push({
      line: i + 1,
      attendeeType,
      firstName,
      lastName,
      company,
      tableNumber: Number.isFinite(tableNumber) ? tableNumber : null,
    });
  }

  return rows;
}

function isPlaceholderRow(row: CsvSeatingRow) {
  const type = normalizeText(row.attendeeType);
  if (!row.firstName && !row.lastName) return true;
  if (PLACEHOLDER_TYPES.has(type)) return true;
  if (!row.firstName || !row.lastName) return true;
  return false;
}

function personKey(firstName: string, lastName: string, company: string) {
  return `${normalizeText(firstName)}|${normalizeText(lastName)}|${canonicalizeCompany(company)}`;
}

function collapseCsvPeople(rows: CsvSeatingRow[]) {
  const grouped = new Map<string, CsvSeatingRow[]>();
  for (const row of rows) {
    if (isPlaceholderRow(row)) continue;
    const key = personKey(row.firstName, row.lastName, row.company);
    const list = grouped.get(key) ?? [];
    list.push(row);
    grouped.set(key, list);
  }

  const collapsed: CsvSeatingRow[] = [];
  const skipped: Array<{ csv: CsvSeatingRow; reason: string }> = [];

  for (const group of grouped.values()) {
    const withTables = group.filter((row) => row.tableNumber != null);
    if (!withTables.length) {
      skipped.push({
        csv: group[0],
        reason: 'No table number in CSV',
      });
      continue;
    }

    const tables = [...new Set(withTables.map((row) => row.tableNumber))];
    if (tables.length === 1) {
      collapsed.push(withTables[0]);
      continue;
    }

    // Same person, different tables — keep the first named assignment and flag later if needed.
    collapsed.push(withTables[0]);
    skipped.push({
      csv: withTables[1],
      reason: `Duplicate CSV person has multiple tables (${tables.join(', ')}); using table ${withTables[0].tableNumber}`,
    });
  }

  return { collapsed, skipped };
}

function scoreCandidate(csv: CsvSeatingRow, registrant: SeatingImportRegistrant) {
  const csvFirst = csv.firstName;
  const csvLast = csv.lastName;
  const regFirst = registrant.firstName ?? '';
  const regLast = registrant.lastName ?? '';
  const csvName = `${normalizeText(csvFirst)} ${normalizeText(csvLast)}`.trim();
  const regName = `${normalizeText(regFirst)} ${normalizeText(regLast)}`.trim();

  if (!firstNamesCompatible(csvFirst, regFirst) || !lastNamesCompatible(csvLast, regLast)) {
    return null;
  }

  let score = 40;
  const reasons: string[] = [];

  if (csvName === regName) {
    score += 70;
    reasons.push('exact name');
  } else if (
    normalizeText(csvFirst) === normalizeText(regFirst) &&
    normalizeText(csvLast) === normalizeText(regLast)
  ) {
    score += 65;
    reasons.push('exact first/last');
  } else {
    score += 20;
    reasons.push('compatible name');
  }

  const company = companyScore(csv.company, registrant.companyName ?? '');
  if (company >= 1) {
    score += 30;
    reasons.push('exact company');
  } else if (company >= 0.7) {
    score += 20;
    reasons.push('strong company');
  } else if (company >= 0.4) {
    score += 8;
    reasons.push('partial company');
  }

  if (typesCompatible(csv.attendeeType, registrant.attendeeType)) {
    score += 15;
    reasons.push('matching attendee type');
  }

  return { score, reason: reasons.join(', ') };
}

function confidenceForScore(score: number, reason: string): SeatingImportAssignment['confidence'] {
  if (reason.includes('exact name') || reason.includes('exact first/last')) {
    return score >= 110 ? 'exact' : 'strong';
  }
  if (score >= 90) return 'strong';
  return 'fuzzy';
}

export function matchSeatingCsvToRegistrants(
  csvRows: CsvSeatingRow[],
  registrants: SeatingImportRegistrant[]
): SeatingImportResult {
  const { collapsed, skipped } = collapseCsvPeople(csvRows);
  const unmatched: SeatingImportResult['unmatched'] = [];
  const conflicts: SeatingImportConflict[] = [];
  const assignments: SeatingImportAssignment[] = [];
  const claimed = new Set<string>();

  for (const csv of collapsed) {
    const scored = registrants
      .map((registrant) => {
        const result = scoreCandidate(csv, registrant);
        if (!result) return null;
        return { registrant, ...result };
      })
      .filter((item): item is NonNullable<typeof item> => item != null)
      .sort((a, b) => b.score - a.score);

    if (!scored.length) {
      unmatched.push({ csv, reason: 'No registrant with a compatible name' });
      continue;
    }

    const available = scored.filter((item) => !claimed.has(item.registrant.id));
    if (!available.length) {
      conflicts.push({
        csv,
        candidates: scored.slice(0, 4),
        reason: 'Best name matches were already claimed by another CSV row',
      });
      continue;
    }

    const best = available[0];
    const second = available[1];
    const uniqueExactName =
      (best.reason.includes('exact name') || best.reason.includes('exact first/last')) &&
      !available.some(
        (item, index) =>
          index > 0 &&
          normalizeText(`${item.registrant.firstName} ${item.registrant.lastName}`) ===
            normalizeText(`${best.registrant.firstName} ${best.registrant.lastName}`)
      );

    const tooClose = second && best.score - second.score < 12 && second.score >= 70;
    const tooWeak = best.score < 70 && !uniqueExactName;

    if (tooClose) {
      conflicts.push({
        csv,
        candidates: available.slice(0, 4),
        reason: 'Multiple registrants scored too closely to auto-assign',
      });
      continue;
    }

    if (tooWeak) {
      unmatched.push({
        csv,
        reason: `Best candidate too weak (${best.registrant.firstName} ${best.registrant.lastName}, score ${best.score})`,
      });
      continue;
    }

    claimed.add(best.registrant.id);
    assignments.push({
      csv,
      registrant: best.registrant,
      confidence: confidenceForScore(best.score, best.reason),
      reason: best.reason,
    });
  }

  return {
    skipped: [
      ...csvRows
        .filter((row) => isPlaceholderRow(row) && (row.attendeeType || row.company || row.tableNumber != null))
        .map((csv) => ({
          csv,
          reason: csv.firstName || csv.lastName ? 'Incomplete name' : 'Placeholder or company-only row',
        })),
      ...skipped,
    ],
    unmatched,
    conflicts,
    assignments,
  };
}
