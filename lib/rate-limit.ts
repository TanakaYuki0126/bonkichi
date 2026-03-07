type Entry = {
  count: number;
  lastRequest: number;
};

const store = new Map<string, Entry>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry) {
    store.set(ip, { count: 1, lastRequest: now });
    return true;
  }
  if (now - entry.lastRequest > windowMs) {
    store.set(ip, { count: 1, lastRequest: now });
  }

  if (entry.count >= limit) {
    return false;
  }
  entry.count++;
  return true;
}
