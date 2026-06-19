"use server";

import { cookies } from "next/headers";

export interface RequestOptions extends RequestInit {
  url: string;
  data?: unknown;
  authorization?: string;
  params?: Record<string, string | number | boolean | string[]>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const baseUrl = process.env.API_URL || "http://localhost:3001";

export type ApiResponse<T> = 
  | { data: T; error: null }
  | { data: null; error: string };

export async function apiFetch<T = unknown>({
  url,
  method = "GET",
  data,
  headers,
  authorization,
  params,
  ...options
}: RequestOptions): Promise<ApiResponse<T>> {
  let token = authorization;
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  }

  const body = data ? JSON.stringify(data) : undefined;
  const fullUrl = new URL(`${baseUrl}${url}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => fullUrl.searchParams.append(key, String(v)));
        } else {
          fullUrl.searchParams.append(key, String(value));
        }
      }
    });
  }

  const fullUrlString = fullUrl.toString();

  try {
    const response = await fetch(fullUrlString, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body,
      cache: options.cache,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message ||
        (await response.text().catch(() => "")) ||
        "Erro na requisição à API";
      return { data: null, error: errorMessage };
    }

    if (response.status === 204) {
      const text = (await response.text()) as unknown as T;
      return { data: text, error: null };
    }

    const json = await response.json() as T;
    return { data: json, error: null };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Erro na requisição à API";
    return { data: null, error: errorMessage };
  }
}
