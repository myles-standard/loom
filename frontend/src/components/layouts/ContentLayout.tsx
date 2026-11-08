import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { APP_NAME } from '../../config/constants';
import { getRouteObject } from '../Routes';
import type { RouteKey } from '../Routes';

type Breadcrumbs = {
    label: string;
    path: string;
};

function ContentLayout({ children, self }: { children: ReactNode; self: RouteKey }) {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([]);
    const location = useLocation();
    const routeObj = getRouteObject(self);

    const handleBreadcrumbs = (location: string) => {
        let pages = location.split('/').filter(Boolean);
        pages = pages.slice(0, pages.length - 1);

        return pages.map((_, index) => {
            return {
                label: routeObj.label,
                path: '/' + pages.slice(0, index + 1).join('/'),
            };
        });
    };

    useEffect(() => {
        setBreadcrumbs(handleBreadcrumbs(location.pathname));
        document.title = `${APP_NAME} - ${routeObj.label}`;

        return () => {
            document.title = APP_NAME;
        };
    }, [self, location.pathname, routeObj.label]);

    return (
        <>
            <div className="content-layout-body" id={routeObj.id}>
                <div className="d-flex mb-4 align-items-end gap-3">
                    <h2 className="content-layout-label mb-0">{routeObj.label}</h2>
                    <span className="breadcrumbs" id="breadcrumbs">
                        {breadcrumbs.map((crumb, index) => (
                            <>
                                <Link
                                    key={crumb.path}
                                    to={crumb.path}
                                    className="text-decoration-none"
                                >
                                    {crumb.label}
                                </Link>
                                {index < breadcrumbs.length - 1 && ' / '}
                            </>
                        ))}
                    </span>
                </div>
                {children}
            </div>
        </>
    );
}

export default ContentLayout;
