export type InstitutionSector =
  | 'PUBLIC'
  | 'PRIVATE_NONPROFIT'
  | 'PRIVATE_FOR_PROFIT'
  | 'OTHER';

export interface InstitutionRecord {
  id: string;
  name: string;
  city: string;
  state: string;
  sector: InstitutionSector;
  campus?: string;
  source: 'IPEDS' | 'LOCAL_SEED';
  sourceId?: string;
}

export interface InstitutionSearchResponse {
  institutions: InstitutionRecord[];
  catalogMode: 'IPEDS_FULL' | 'LOCAL_SEED';
  totalCatalogSize: number;
}
