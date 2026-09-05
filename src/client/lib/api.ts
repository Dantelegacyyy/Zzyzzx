const API_BASE = '/api';

const getHeaders = async () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  return headers;
};

export interface HealthPingResult {
  ok: boolean;
  status: string;
  version: string;
  phase: string;
  port: number;
  latencyMs: number;
  error?: string;
}

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  maxRetries: number = 2,
  baseDelayMs: number = 300
) => {
  let attempt = 0;
  const fetchOptions: RequestInit = {
    credentials: 'include',
    ...options,
  };
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, fetchOptions);
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
  throw new Error(`Failed to reach ${url}`);
};

async function parseResponse(res: Response) {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
    }
    return data;
  }
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return text;
}

export const api = {
  async get(endpoint: string, retries = 2) {
    const res = await fetchWithRetry(
      `${API_BASE}${endpoint}`,
      {
        headers: await getHeaders(),
      },
      retries
    );
    return parseResponse(res);
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
    return parseResponse(res);
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
    return parseResponse(res);
  },

  /**
   * Pings the server health probe directly on /health (bypassing /api)
   * Measures roundtrip latency and returns diagnostic status.
   */
  async checkHealth(): Promise<HealthPingResult> {
    const start = performance.now();
    try {
      const res = await fetch('/health', {
        method: 'GET',
        cache: 'no-store',
      });
      const latencyMs = Math.round(performance.now() - start);
      if (!res.ok) {
        return {
          ok: false,
          status: 'ERROR',
          version: 'Unknown',
          phase: 'Unknown',
          port: 3000,
          latencyMs,
          error: `HTTP ${res.status}`,
        };
      }
      const data = await res.json();
      return {
        ok: true,
        status: data.status || 'ok',
        version: data.version || '3.0.0-READY',
        phase: data.phase || 'Phase 3',
        port: data.port || 3000,
        latencyMs,
      };
    } catch (err: any) {
      return {
        ok: false,
        status: 'OFFLINE',
        version: 'Unknown',
        phase: 'Unknown',
        port: 3000,
        latencyMs: Math.round(performance.now() - start),
        error: err.message || 'Connection refused',
      };
    }
  },

  async getVersion() {
    return this.get('/version', 1);
  },

  async getDiagnostics() {
    return this.get('/diagnostics', 1);
  },
};
