export const ROUTES = {
    home: '/',
    guarded: '/g',
    dashboard: '/dashboard',
    mediaConverter: '/media-converter',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
