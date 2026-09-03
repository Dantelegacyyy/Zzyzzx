import Redis from 'ioredis';
import { ENV } from '../config/env.js';

let redisClient: Redis | null = null;
let isRedisConnected = false;

// Fallback in-memory cache if Redis server is unreachable or not configured
const memoryCache = new Map<string, { value: string; expiresAt: number }>();

if (ENV.REDIS_URL || process.env.REDIS_URL) {
  try {
    const url = ENV.REDIS_URL || process.env.REDIS_URL || 'redis://localhost:6379';
    redisClient = new Redis(url, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 2000,
      retryStrategy(times) {
        if (times > 3) return null; // stop retrying quickly if no server
        return Math.min(times * 200, 1000);
      },
    });

    redisClient.on('connect', () => {
      isRedisConnected = true;
      console.log('[Redis Cache] Connected to Redis server successfully.');
    });

    redisClient.on('error', (err) => {
      isRedisConnected = false;
      // Suppress spammy log messages when Redis server isn't running locally
    });
  } catch (err) {
    redisClient = null;
    isRedisConnected = false;
  }
}

export class DashboardCacheService {
  private static DEFAULT_TTL_SECONDS = 3600; // 1 hour TTL for layout schemas

  /**
   * Get cached dashboard config string or parsed object
   */
  public static async get<T = any>(key: string): Promise<T | null> {
    const cacheKey = `dashboard:cache:${key}`;

    if (redisClient && isRedisConnected) {
      try {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
          return JSON.parse(cached) as T;
        }
      } catch (err) {
        // Fallback to in-memory on redis read error
      }
    }

    // Check memory fallback cache
    const item = memoryCache.get(cacheKey);
    if (item) {
      if (Date.now() > item.expiresAt) {
        memoryCache.delete(cacheKey);
        return null;
      }
      try {
        return JSON.parse(item.value) as T;
      } catch (err) {
        return null;
      }
    }

    return null;
  }

  /**
   * Set cached dashboard configuration
   */
  public static async set(key: string, value: any, ttlSeconds: number = DashboardCacheService.DEFAULT_TTL_SECONDS): Promise<void> {
    const cacheKey = `dashboard:cache:${key}`;
    const stringified = JSON.stringify(value);

    if (redisClient && isRedisConnected) {
      try {
        await redisClient.set(cacheKey, stringified, 'EX', ttlSeconds);
        return;
      } catch (err) {
        // Fallback to memory cache
      }
    }

    // Memory fallback
    memoryCache.set(cacheKey, {
      value: stringified,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  /**
   * Invalidate cached layout schema by key
   */
  public static async invalidate(key: string): Promise<void> {
    const cacheKey = `dashboard:cache:${key}`;

    if (redisClient && isRedisConnected) {
      try {
        await redisClient.del(cacheKey);
      } catch (err) {
        // Ignore
      }
    }

    memoryCache.delete(cacheKey);
  }

  /**
   * Get cache status info
   */
  public static getStatus(): { isRedisConnected: boolean; memoryCacheSize: number } {
    return {
      isRedisConnected,
      memoryCacheSize: memoryCache.size,
    };
  }
}
