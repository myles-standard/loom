export const ROUTES = {
    home: {
        route: '/',
        label: 'Home',
        id: 'home',
    },
    guarded: {
        route: '/g',
        label: 'g',
        id: 'guarded',
    },
    dashboard: {
        route: '/dashboard',
        label: 'Dashboard',
        id: 'dashboard',
    },
    videoConverter: {
        route: '/video-converter',
        label: 'Video Converter',
        id: 'video-converter',
    },
    videoConverterEdit: {
        route: '/video-converter/:id',
        label: 'Video Converter',
        id: 'video-converter-edit',
    },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function getRouteObject<K extends RouteKey>(key: K) {
    return ROUTES[key];
}

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
