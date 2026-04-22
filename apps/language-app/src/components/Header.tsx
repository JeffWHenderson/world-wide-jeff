'use client'

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div style={{ display: "flex", backgroundColor: "black", height: '10vh', width: '100vw', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: "1.7em", color: 'white' }}>World Wide Jeff</div>
                <button style={{ color: 'white' }} onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </div>
            <div style={{ display: "flex", backgroundColor: "black", height: '5vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'space-between' }}>
                <nav>
                    <Link style={{ padding: "0 5px 0 0" }} href="/">Language App</Link>
                </nav>
            </div>
        </>
    );
};

export default Header;
