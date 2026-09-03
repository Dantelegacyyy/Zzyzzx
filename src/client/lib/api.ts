const API_BASE = '/api';

const getHeaders = async () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  return headers;
};

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  maxRetries: number = 3,
  baseDelayMs: number = 500
) => {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, options);
      if (res.ok || (res.status >= 400 && res.status < 500)) {
        return res;
      }
      if (attempt === maxRetries) {
        return res;
      }
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
    }
    const delay = baseDelayMs * Math.pow(2, attempt);
    console.warn(
      `[API] Request to ${url} failed. Retrying in ${delay}ms (Attempt ${attempt + 1}/${maxRetries})...`
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    attempt++;
  }
  throw new Error('Unreachable');
};

export const api = {
  async get(endpoint: string, retries = 3) {
    const res = await fetchWithRetry(
      `${API_BASE}${endpoint}`,
      {
        headers: await getHeaders(),
      },
      retries
    );
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async post(endpoint: string, body: any, retries = 0) {
    const res = await fetchWithRetry(
      `${API_BASE}${endpoint}`,
      {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body),
      },
      retries
    );
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async delete(endpoint: string, retries = 0) {
    const res = await fetchWithRetry(
      `${API_BASE}${endpoint}`,
      {
        method: 'DELETE',
        headers: await getHeaders(),
      },
      retries
    );
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
