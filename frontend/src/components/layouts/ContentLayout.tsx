import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { APP_NAME } from '../../config/constants';

type Breadcrumbs = {
    label: string;
    path: string;
};

function ContentLayout({ children, self }: { children: ReactNode; self: string[] }) {
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([]);
    const location = useLocation();

    const handleTitle = (words: string[]) =>
        words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const handleId = (words: string[]) => words.map((w) => w.toLowerCase()).join('-');

    const handleBreadcrumbs = (location: string) => {
        let pages = location.split('/').filter(Boolean);

        pages = pages.slice(0, pages.length - 1);

        return pages.map((page, index) => {
            const labelParts = page.split('-');
            const formattedLabel = handleTitle(labelParts);

            return {
                label: formattedLabel,
                path: '/' + pages.slice(0, index + 1).join('/'),
            };
        });
    };

    useEffect(() => {
        setId(handleId(self));
        setBreadcrumbs(handleBreadcrumbs(location.pathname));

        const calculatedTitle = handleTitle(self);
        setTitle(calculatedTitle);

        document.title = `${APP_NAME} - ${calculatedTitle}`;

        return () => {
            document.title = APP_NAME;
        };
    }, [self]);

    return (
        <>
            <span className="breadcrumbs" id="breadcrumbs">
                {breadcrumbs.map((crumb, index) => (
                    <Link key={crumb.path} to={crumb.path}>
                        {crumb.label} {index < breadcrumbs.length - 1 && ' / '}
                    </Link>
                ))}
            </span>
            <div className="mt-3" id={id}>
                <h2 className="mb-4">{title}</h2>
                {children}
            </div>
        </>
    );
}

export default ContentLayout;
