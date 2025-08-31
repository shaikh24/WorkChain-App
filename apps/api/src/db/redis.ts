import { Redis } from "ioredis";
export function getRedis(url: string) {
  return new Redis(url);
}
