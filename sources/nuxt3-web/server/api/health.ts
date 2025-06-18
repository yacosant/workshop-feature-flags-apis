import { ping } from '../services/mongoService';

export default defineEventHandler(async () => {
  const isAlive = await ping();
  return {
    name: "nuxt3-api",
    status: 200,
    database: isAlive ? "OK" : "KO"
  };
});