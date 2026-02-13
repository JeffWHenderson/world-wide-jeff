import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../Core/ThemeContext"

const LanguageAppLayout = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ display: "flex", backgroundColor: "black", height: '5vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <Link style={{ padding: "0 5px 0 0" }} to="/">
                        JEFF HOME
                    </Link>
                    <Link to="/contact">
                        Contact
                    </Link>
                </div>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </div>
            <Outlet />
        </div>
    )
};

export default LanguageAppLayout;