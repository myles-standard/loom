import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// shape of the object returned from the backend; adjust as necessary
export interface User {
    id: string;
    googleId: string;
    displayName: string;
    email: string;
    avatar: string;
}

interface UserContextValue {
    user: User | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// default value is only used for typing; real value comes from provider
export const UserContext = createContext<UserContextValue>({
    user: null,
    loading: true,
    setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/me', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.authenticated) {
                    setUser(data.user);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>
    );
}
