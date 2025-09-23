// import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";



const LanguageAppLayout = () => {
    // const navigator = useNavigate()

    // function goToLanguagePage(selectedLanguage: string) {
    //     navigator(`Chinese`)
    // }

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ display: "flex", backgroundColor: "black", height: '10vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: "2em" }}><Link style={{ padding: "0 5px 0 0" }} to="/">World Wide Jeff</Link></div>
            </div >
            <div style={{ display: "flex", backgroundColor: "black", height: '5vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <nav>
                    <Link style={{ padding: "0 5px 0 0" }} to="/">Home</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="Spanish">Spanish</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="Chinese">Chinese</Link>
                    <Link style={{ padding: "0 5px 0 0" }} to="Japanese">Japanese</Link>
                </nav>
            </div>
            {/* <div style={{ display: 'flex' }}>
                <button onClick={() => goToLanguagePage("Chinese")}>Chinese</button>
                <button onClick={() => goToLanguagePage("Spanish")}>Spanish</button>
                <button onClick={() => goToLanguagePage("Japanese")}>Japanese</button>
            </div> */}
            <Outlet />
        </div>
    )
};

export default LanguageAppLayout;