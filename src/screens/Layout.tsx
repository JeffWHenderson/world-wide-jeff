import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div style={{ display: "flex", backgroundColor: 'black', width: '100%' }}>
                <h1>World Wide Jeff</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/pickleball">Pickleball League</Link>
                        </li>
                        <li>
                            <Link to="/wallerverse">Wallerverse</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />

        </>
    )
};

export default Layout;