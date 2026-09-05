import fs from 'node:fs';
import path from 'node:path';
import type {
  InstitutionRecord,
  InstitutionSearchResponse,
} from '../../shared/institutions.js';

const FULL_PATH = path.resolve(
  process.cwd(),
  'data/institutions/us-postsecondary.ipeds.json'
);
const SEED_PATH = path.resolve(
  process.cwd(),
  'data/institutions/us-postsecondary.seed.json'
);

let cache: {
  mode: InstitutionSearchResponse['catalogMode'];
  records: InstitutionRecord[];
} | null = null;

function readRecords(file: string): InstitutionRecord[] {
  const value = JSON.parse(fs.readFileSync(file, 'utf8')) as unknown;
  if (!Array.isArray(value)) throw new Error('INSTITUTION_CATALOG_INVALID');
  return value.filter(
    (item): item is InstitutionRecord =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as InstitutionRecord).id === 'string' &&
      typeof (item as InstitutionRecord).name === 'string' &&
      typeof (item as InstitutionRecord).city === 'string' &&
      typeof (item as InstitutionRecord).state === 'string'
  );
}

function catalog() {
  if (cache) return cache;

  if (fs.existsSync(FULL_PATH)) {
    cache = {
      mode: 'IPEDS_FULL',
      records: readRecords(FULL_PATH),
    };
    return cache;
  }

  cache = {
    mode: 'LOCAL_SEED',
    records: readRecords(SEED_PATH),
  };
  return cache;
}

function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function searchInstitutions(
  query: string,
  limit = 50
): InstitutionSearchResponse {
  const current = catalog();
  const q = normalize(query);

  const ranked = current.records
    .map((institution) => {
      const label = normalize(
        [
          institution.name,
          institution.campus,
          institution.city,
          institution.state,
          institution.id,
        ]
          .filter(Boolean)
          .join(' ')
      );

      let score = 0;
      if (!q) {
        score = institution.id === 'asu-tempe' ? 100 : 1;
      } else if (label === q || institution.id === q) {
        score = 100;
      } else if (q === 'asu' && institution.name.toLowerCase().includes('arizona state')) {
        score = institution.id === 'asu-tempe' ? 95 : 90;
      } else if (label.startsWith(q)) {
        score = 80;
      } else if (
        institution.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ) {
        score = 60;
      } else if (label.includes(q)) {
        score = 40;
      }

      return { institution, score };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.institution.name.localeCompare(b.institution.name)
    )
    .slice(0, Math.max(1, Math.min(limit, 100)))
    .map((item) => item.institution);

  return {
    institutions: ranked,
    catalogMode: current.mode,
    totalCatalogSize: current.records.length,
  };
}
