import { Outlet, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AvailableLanguages } from "./LanguageTypes";

const LanguageAppLayout = () => {
    const navigator = useNavigate()
    const { language } = useParams()

    function goToLanguagePage(selectedLanguage: string) {
        navigator(`${selectedLanguage}`)
    }

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ display: "flex", backgroundColor: "black", height: '10vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: "2em" }}><Link style={{ padding: "0 5px 0 0" }} to="/">World Wide Jeff</Link></div>
            </div >
            <div style={{ display: "flex", backgroundColor: "black", height: '5vh', width: '100vw', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <nav>
                    <nav>
                        <Link style={{ padding: "0 5px 0 0" }} to="/">Home</Link>
                        <Link style={{ padding: "0 5px 0 0" }} to="/pickleball">Pickleball</Link>
                        <Link style={{ padding: "0 5px 0 0" }} to="/wallerverse">Wallerverse</Link>
                        <Link style={{ padding: "0 5px 0 0" }} to="/language-app/Chinese">Flashcards</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </nav>
                <div style={{ marginLeft: '8px' }}>
                    <select id="language-select" onChange={(e: any) => goToLanguagePage(e.target.value)}>
                        {
                            Object.values(AvailableLanguages).map(option => (
                                language === option ?
                                    <option value={option} selected>{option}</option>
                                    :
                                    <option value={option}>{option}</option>
                            ))
                        }
                    </select>
                </div>
            </div>


            <Outlet />
        </div>
    )
};

export default LanguageAppLayout;