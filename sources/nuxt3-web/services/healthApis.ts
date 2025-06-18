// services/healthApis.ts
export interface ApiHealth {
  name: string;
  url: string;
  status: string | number;
  database: string;
}

export const apis: ApiHealth[] = [
  { name: 'nestjs-api', url: 'http://localhost:3001/health', status: '-', database: '-' },
  { name: 'express-api', url: 'http://localhost:3002/health', status: '-', database: '-' },
  { name: 'springboot-api', url: 'http://localhost:3003/health', status: '-', database: '-' },
  { name: 'clojure-api', url: 'http://localhost:3004/health', status: '-', database: '-' },
  { name: 'nuxt3-api', url: 'http://localhost:3000/api/health', status: '-', database: '-' },
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
    const data = await res.json();
    api.name = data.name || api.name;
    api.status = data.status;
    api.database = data.database;
  } catch (e) {
    api.name = api.name
    api.status = 'error';
    api.database = 'ko';
  }
}
