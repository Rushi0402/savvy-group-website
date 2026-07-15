const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
  admin?: { email: string };
};

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

export async function adminRequest<T>(
  endpoint: string,
  options: RequestInit = {},
) {
  if (!API_URL) {
    throw new AdminApiError(
      "NEXT_PUBLIC_API_URL is not configured.",
      500,
    );
  }

  const response = await fetch(`${API_URL}/api/admin${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const result = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !result.success) {
    throw new AdminApiError(
      result.message || "The request could not be completed.",
      response.status,
    );
  }

  return result;
}
