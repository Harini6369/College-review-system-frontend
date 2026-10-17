import { RequestError, type ApiSuccess } from '../types/api';

const buildUrl = (path: string): string => {
  const apiBase = import.meta.env.VITE_API_URL || window.location.origin;
  return new URL(path, apiBase.endsWith('/') ? apiBase : `${apiBase}/`).toString();
};

export const request = async <T>(
  path: string,
  options: { body?: object; token?: string | null } = {}
): Promise<ApiSuccess<T>> => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const authToken = options.token ?? localStorage.getItem('token');

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers,
    body: JSON.stringify(options.body ?? {}),
  });

  if (response.status === 204) {
    return { success: true, message: 'No content', data: null as T };
  }

  const payload = (await response.json()) as ApiSuccess<T> & {
    details?: { field: string; message: string }[];
  };

  if (!response.ok) {
    throw new RequestError(payload.message || 'Request failed', response.status, payload.details);
  }

  return payload;
};
