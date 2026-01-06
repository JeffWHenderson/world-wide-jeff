import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ display: "flex", backgroundColor: "black", height: '10vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: "2em" }}>World Wide Jeff</div>
            </div >
            <div style={{ display: "flex", backgroundColor: "black", height: '5vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <nav>
                    <Link style={{ padding: "0 5px 0 0" }} to="/">Home</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="/pickleball">Pickleball</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="/wallerverse">Wallerverse</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="/language-app/chinese">Flashcards</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>
            <Outlet />
        </div>
    )
};

export default Layout;