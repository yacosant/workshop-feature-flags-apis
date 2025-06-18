import { fetchFeatureFlagsFromUrl } from "./featureFlags";

// services/healthApis.ts
export interface ApiHealth {
  name: string;
  url: string;
  status: string | number;
  database: string;
  urlFlags: string;
  features?: Record<string, any>
}

export const apis: ApiHealth[] = [
  { name: 'nestjs-api', url: 'http://localhost:3001/health', status: '-', database: '-', urlFlags: 'http://localhost:3001/features', features: {} },
  { name: 'express-api', url: 'http://localhost:3002/health', status: '-', database: '-', urlFlags: 'http://localhost:3002/features', features: {} },
  { name: 'springboot-api', url: 'http://localhost:3003/health', status: '-', database: '-', urlFlags: 'http://localhost:3003/features', features: {} },
  { name: 'clojure-api', url: 'http://localhost:3004/health', status: '-', database: '-', urlFlags: 'http://localhost:3004/features', features: {} },
  { name: 'nuxt3-api', url: 'http://localhost:3000/api/health', status: '-', database: '-', urlFlags: 'http://localhost:3000/api/features', features: {} },
];

export async function fetchHealth(api: ApiHealth): Promise<void> {
  try {
    const res = await fetch(api.url, {
      method: 'GET',
    });
    if (!res.ok) {
      api.name = api.name
      api.status = 'error';
      api.database = 'ko';
      return;
    }

    const flags = (await fetchFeatureFlagsFromUrl(api.urlFlags)).flags || {};
    const data = await res.json();
    api.name = data.name || api.name;
    api.status = data.status;
    api.database = data.database;
    api.features = flags;
  } catch (e) {
    api.name = api.name
    api.status = 'error';
    api.database = 'ko';
  }
}
