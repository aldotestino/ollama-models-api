import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUrl(searchParams: { q?: string, p?: number, n?: number }) {
  const baseUrl = 'http://localhost:8080/api/v1/models/search';

  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('q', searchParams.q || '');
  if (searchParams.p) urlSearchParams.append('p', searchParams.p.toString());
  if (searchParams.n) urlSearchParams.append('n', searchParams.n.toString());

  return `${baseUrl}?${urlSearchParams.toString()}`;
}