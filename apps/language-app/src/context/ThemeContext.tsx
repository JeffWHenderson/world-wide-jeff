'use client'

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type ThemeName = 'light' | 'dark';

export interface ThemeContextType {
    theme: ThemeName;
    toggleTheme: () => void;
}

const getInitialTheme = (): ThemeName => {
    if (typeof window !== 'undefined' && localStorage.getItem('color-theme') === 'dark') {
        return 'dark'
    }
    return 'light'
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeName>('light');

    useEffect(() => {
        setTheme(getInitialTheme());
    }, []);

    const rawSetTheme = (newTheme: ThemeName) => {
        document.documentElement.dataset['theme'] = newTheme;
        localStorage.setItem('color-theme', newTheme);
    };

    useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
