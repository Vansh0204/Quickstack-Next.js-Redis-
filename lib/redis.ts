import { Redis } from 'ioredis';

let redis: Redis | null = null;
let isConnecting = false;
let connectionPromise: Promise<void> | null = null;

export async function getRedisClient(): Promise<Redis> {
  if (redis) return redis;

  if (isConnecting && connectionPromise) {
    await connectionPromise;
    return redis!;
  }

  isConnecting = true;
  connectionPromise = new Promise(async (resolve, reject) => {
    try {
      const redisUrl = process.env.REDIS_URL;
      if (!redisUrl) throw new Error('Redis URL is required');

      redis = new Redis(redisUrl, {
        tls: { rejectUnauthorized: false },
        retryStrategy: times => Math.min(times * 50, 2000),
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000
      });

      redis.on('error', err => {
        console.error('Redis connection error:', err);
        if (!redis?.status || redis.status !== 'ready') {
          redis = null;
          isConnecting = false;
        }
      });

      redis.on('connect', () => {
        console.log('Redis connection established');
        isConnecting = false;
        resolve();
      });

      await redis.ping();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      redis = null;
      isConnecting = false;
      reject(error);
    }
  });

  await connectionPromise;
  return redis!;
}

// In-memory fallback
const memoryCache: Record<string, { data: any; expiry: number }> = {};

export async function cacheData(key: string, data: any, ttl = 60): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.warn('Redis cache fallback:', error);
    memoryCache[key] = { data, expiry: Date.now() + ttl * 1000 };
  }
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClient();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
}

export async function getCachedDataWithTTL<T>(key: string): Promise<{ data: T | null; ttl: number }> {
  try {
    const client = await getRedisClient();
    const results = await client.pipeline().get(key).ttl(key).exec();
    
    if (!results) {
      return { data: null, ttl: -1 };
    }
    
    const dataResult = results[0];
    const ttlResult = results[1];
    
    const parsed = dataResult[1] ? JSON.parse(dataResult[1] as string) : null;
    const ttlValue = typeof ttlResult[1] === 'number' && ttlResult[1] > 0 ? ttlResult[1] : -1;

    return { data: parsed, ttl: ttlValue };
  } catch (error) {
    console.error('getCachedDataWithTTL fallback:', error);

    const cached = memoryCache[key];
    if (!cached) return { data: null, ttl: -2 };

    const remaining = Math.floor((cached.expiry - Date.now()) / 1000);
    return {
      data: cached.data,
      ttl: remaining > 0 ? remaining : -1
    };
  }
}

export async function setCachedData<T>(key: string, data: T, ttl = 60): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.set(key, JSON.stringify(data), 'EX', ttl);
  } catch (error) {
    console.error('Error setting cached data:', error);
  }
}

export async function clearCache(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(key);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

export async function getCacheTTL(key: string): Promise<number> {
  try {
    const client = await getRedisClient();
    const ttl = await client.ttl(key);
    return ttl > 0 ? ttl : -1;
  } catch (error) {
    console.warn('TTL fallback:', error);
    const cached = memoryCache[key];
    if (!cached) return -2;

    const ttl = Math.floor((cached.expiry - Date.now()) / 1000);
    return ttl > 0 ? ttl : -1;
  }
}
