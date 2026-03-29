export const ROUTES = {
  dashboard: '/dashboard',
  mediaConverter: '/media-converter',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
