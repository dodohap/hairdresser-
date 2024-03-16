import { createClient, RedisClientType } from "redis";

import logger from "./logger";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

export const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect().catch((error) => {
  logger.error("Redis connection error:", error);
});

export const limiter = rateLimit({
  // Rate limiter configuration
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  // Redis store configuration
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
});

export async function createKey(key: string, value: string, expiration?: number) {
  try {
    if (expiration !== undefined) {
      await redisClient.setEx(key, expiration, value);
    } else {
      await redisClient.set(key, value);
    }
    console.log(`Created key: ${key}, value: ${value}`);
  } catch (error) {
    logger.error(`Error creating key ${key}:`, error);
  }
}

export async function deleteKey(key: string) {
  await redisClient.del(key);
}

export async function isKeyExist(key: string): Promise<boolean> {
  const keyExists = await redisClient.exists(key);
  return keyExists === 1;
}

export async function getKey(key: string): Promise<string | null> {
  return await redisClient.get(key);
}

export async function checkKey(key: string, value: string): Promise<boolean> {
  const keyValue = await redisClient.get(key);
  return keyValue === value;
}
