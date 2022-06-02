import { HttpError } from './error';

const defaultHeaders: HeadersInit = {
  accept: 'application/json',
  'content-type': 'application/json'
};

function buildFetchConfig(config: RequestInit) {
  config.headers = { ...defaultHeaders, ...config.headers };

  return config;
}

async function customFetch<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, buildFetchConfig(config));
  const response = await fetch(request);

  if (!response.ok) {
    const { status, statusText } = response;

    throw new HttpError(statusText, status);
  }

  return response.json();
}

export const http = {
  get: <T>(path: string, config?: RequestInit) =>
    customFetch<T>(path, { method: 'GET', ...config }),
  put: <T, U>(path: string, body: T, config?: RequestInit) =>
    customFetch<U>(path, { method: 'PUT', body: JSON.stringify(body), ...config }),
  post: <T, U>(path: string, body: T, config?: RequestInit) =>
    customFetch<U>(path, { method: 'POST', body: JSON.stringify(body), ...config }),
  delete: <T, U>(path: string, body: T, config?: RequestInit) =>
    customFetch<U>(path, { method: 'DELETE', body: JSON.stringify(body), ...config })
};
