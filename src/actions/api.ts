'use server';

import { cookies } from 'next/headers';

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

const baseUrl = process.env.API_URL || 'http://localhost:3001';

export async function apiFetch<T = unknown>({
  url,
  method = 'GET',
  data,
  headers,
  authorization,
  params,
  ...options
}: RequestOptions): Promise<T> {
  let token = authorization;
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get('token')?.value;
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

  const response = await fetch(fullUrlString, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body,
    cache: options.cache,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || await response.text().catch(() => '') || 'Erro na requisição à API';
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return (await response.text()) as unknown as T;
  }

  return response.json();
}
