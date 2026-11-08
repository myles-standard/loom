import { Outlet } from 'react-router-dom';
import styles from './modules/Card.module.css';

export function Title({ children }: { children: React.ReactNode }) {
    return <div className={styles.title}>{children}</div>;
}

export function Body({ children }: { children: React.ReactNode }) {
    return <div className={styles.body}>{children}</div>;
}

type CardComponent = React.FC<{ children: React.ReactNode; className?: string }> & {
    Title: typeof Title;
    Body: typeof Body;
};

/**
 * Terminal-style card component for displaying content in a styled container.
 * @param param0
 * @returns
 */
const Card: CardComponent = ({ children, className }) => {
    const classes = `${styles.terminalCard} ${className || ''}`.trim();

    return (
        <div id="card" className={classes}>
            {children || <Outlet />}
        </div>
    );
};

Card.Title = Title;
Card.Body = Body;

export default Card;
