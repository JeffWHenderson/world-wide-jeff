import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div style={{ display: "flex", backgroundColor: "black", width: '100%', alignContent: "center", alignItems: 'center' }}>
                <div style={{ fontSize: "2em" }}>World Wide Jeff</div>
            </div >
            <div style={{ display: "flex", backgroundColor: 'black', width: '100%' }}>
                <nav>
                    <Link style={{ padding: "0 5px 0 0" }} to="/">Home</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="/pickleball">Pickleball</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="/wallerverse">Wallerverse</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="/flashcards">Flashcards</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>
            <Outlet />
        </>
    )
};

export default Layout;