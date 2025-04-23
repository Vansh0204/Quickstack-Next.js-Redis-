import { User, Post, CachedResponse } from './types';
import { cacheData, getCachedDataWithTTL } from './redis';
import { getRedisClient } from './redis';

// Base URL for the JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

function logCacheStatus(key: string, hit: boolean, ttl?: number) {
  const status = hit ? 'HIT' : 'MISS';
  const ttlInfo = ttl !== undefined ? ` | TTL: ${ttl}s` : '';
  console.log(`[Cache ${status}] Key: ${key}${ttlInfo}`);
}

/**
 * Fetches users from the API with Redis caching
 */
export async function fetchUsers(): Promise<CachedResponse<User[]>> {
  const CACHE_KEY = 'users';
  const startTime = Date.now();

  const { data: cachedUsers, ttl } = await getCachedDataWithTTL<User[]>(CACHE_KEY);

  if (cachedUsers) {
    logCacheStatus(CACHE_KEY, true, ttl);
    return {
      data: cachedUsers,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }

  const response = await fetch(`${API_BASE_URL}/users`);
  const users = await response.json() as User[];
  await cacheData(CACHE_KEY, users, 60);

  logCacheStatus(CACHE_KEY, false);
  return {
    data: users,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Fetches posts from the API with Redis caching
 */
export async function fetchPosts(): Promise<CachedResponse<Post[]>> {
  const CACHE_KEY = 'posts';
  const startTime = Date.now();

  const { data: cachedPosts, ttl } = await getCachedDataWithTTL<Post[]>(CACHE_KEY);

  if (cachedPosts) {
    logCacheStatus(CACHE_KEY, true, ttl);
    return {
      data: cachedPosts,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }

  const response = await fetch(`${API_BASE_URL}/posts`);
  const posts = await response.json() as Post[];
  await cacheData(CACHE_KEY, posts, 60);

  logCacheStatus(CACHE_KEY, false);
  return {
    data: posts,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Fetches a specific user by ID with Redis caching
 */
export async function fetchUserById(id: number): Promise<CachedResponse<User>> {
  const CACHE_KEY = `user:${id}`;
  const startTime = Date.now();

  const { data: cachedUser, ttl } = await getCachedDataWithTTL<User>(CACHE_KEY);

  if (cachedUser) {
    logCacheStatus(CACHE_KEY, true, ttl);
    return {
      data: cachedUser,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }

  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  const user = await response.json() as User;
  await cacheData(CACHE_KEY, user, 60);

  logCacheStatus(CACHE_KEY, false);
  return {
    data: user,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Fetches posts for a specific user with Redis caching
 */
export async function fetchPostsByUserId(userId: number): Promise<CachedResponse<Post[]>> {
  const CACHE_KEY = `posts:user:${userId}`;
  const startTime = Date.now();

  const { data: cachedPosts, ttl } = await getCachedDataWithTTL<Post[]>(CACHE_KEY);

  if (cachedPosts) {
    logCacheStatus(CACHE_KEY, true, ttl);
    return {
      data: cachedPosts,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }

  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
  const posts = await response.json() as Post[];
  await cacheData(CACHE_KEY, posts, 60);

  logCacheStatus(CACHE_KEY, false);
  return {
    data: posts,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Benchmark performance between direct API and Redis cached calls
 */
export async function benchmarkPerformance() {
  await getRedisClient();
  const directStartTime = Date.now();
  console.log("Fetching from API...");
  // Add a cache-busting query parameter
  const directResponse = await fetch(`${API_BASE_URL}/users?cb=${Date.now()}`);
  const directData = await directResponse.json();
  const directTime = Date.now() - directStartTime;

  await fetchUsers();

  const cacheStartTime = Date.now();
  const cachedResponse = await fetchUsers();
  const cacheTime = Date.now() - cacheStartTime;

  const difference = directTime - cacheTime;
  const percentFaster = (difference / directTime) * 100;

  return {
    apiTime: directTime,
    cacheTime,
    difference,
    percentFaster: Math.round(percentFaster * 100) / 100
  };
  console.log("API response sample:", directData?.[0]);
}
