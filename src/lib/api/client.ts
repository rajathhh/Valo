import { API_BASE_URL } from "@/config/constants";

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Skip attaching the Authorization header (public endpoints) */
  public?: boolean;
}

/**
 * Central REST client for valo-gateway-service (/api/v2/*).
 * Auth: RS256 JWT access token, attached as a Bearer header.
 * Token retrieval is a placeholder — wire to the real auth-service
 * (OAuth2 + PKCE) session store when the backend is connected.
 */
async function getAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("valo_access_token");
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, public: isPublic, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Client": "valo-web/2.0",
    ...(headers as Record<string, string>),
  };

  if (!isPublic) {
    const token = await getAccessToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Network unavailable. VALO works offline for saved trips and QR tickets.", 0, "NETWORK_ERROR");
  }

  if (!response.ok) {
    let message = `Request failed with ${response.status}`;
    let code: string | undefined;
    try {
      const errBody = await response.json();
      message = errBody.message ?? message;
      code = errBody.code;
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(message, response.status, code);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) => apiRequest<T>(path, { ...options, method: "DELETE" }),
};
