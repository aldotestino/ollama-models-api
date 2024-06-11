import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { API_URL } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUrl(searchParams: { q?: string, p?: number, n?: number }) {
  const baseUrl = `${API_URL}/api/v1/models/search`;

  const urlSearchParams = new URLSearchParams();
  if (searchParams.q) urlSearchParams.append('q', searchParams.q);
  if (searchParams.p) urlSearchParams.append('p', searchParams.p.toString());
  if (searchParams.n) urlSearchParams.append('n', searchParams.n.toString());

  return `${baseUrl}?${urlSearchParams.toString()}`;
}