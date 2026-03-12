import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../Core/ThemeContext"
import { LanguageSettingsProvider } from "./components/LanguageSettingsProvider";
import { useState } from "react";

const LanguageAppLayout = () => {
    const { theme, toggleTheme } = useTheme();
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    return (
        <LanguageSettingsProvider>
            <div style={{ width: '100%', height: '100vh' }}>
                <div style={{ display: "flex", backgroundColor: "black", height: '10vh', width: '100vw', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: "1.7em", color: 'white' }}>World Wide Jeff</div>
                    <button style={{ color: 'white' }} onClick={() => setOpenMenu(!openMenu)}>
                        settings
                    </button>
                </div>

                <div style={{ display: "flex", backgroundColor: "black", height: '5vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'space-between' }}>
                    <nav>
                        <Link style={{ padding: "0 5px 0 0" }} to="/">Home</Link>
                        {/* <Link style={{ padding: "0 5px 0 0" }} to="/pickleball">Pickleball</Link> */}
                        {/* <Link style={{ padding: "0 5px 0 0" }} to="/wallerverse">Wallerverse</Link> */}
                        <Link style={{ padding: "0 5px 0 0" }} to="/language-app">Language-App</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </div>
                {
                    openMenu && <div>
                        <div style={{ display: "flex", flexDirection: "column", width: '80%' }}>
                            <button style={{ color: 'white' }} onClick={toggleTheme}>
                                {theme === 'light' ? 'Dark' : 'Light'} Mode
                            </button>
                            <div>Speaking Speed<button>-</button>{}<button>+</button></div>
                            <div>delay between sentences<button>-</button>{}<button>+</button></div>
                            {/* <button>read front</button>
                            <button>read back</button>
                            <button>voice</button>
                            <button>randomize</button>
                            <button>language first</button> */}
                        </div>
                    </div>
                }
                <Outlet />
            </div>
        </LanguageSettingsProvider>
    )
};

export default LanguageAppLayout;