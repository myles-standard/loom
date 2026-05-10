export const ROUTES = {
    home: '/',
    guarded: '/g',
    dashboard: '/dashboard',
    videoConverter: '/video-converter',
    videoConverterEdit: '/video-converter/:id',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
