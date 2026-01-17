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
                <div style={{ marginRight: '15px' }}>
                    <select id="language-select" defaultValue={language} onChange={(e: any) => goToLanguagePage(e.target.value)}>
                        {
                            Object.values(AvailableLanguages).map(option => (
                                language === option ?
                                    <option key={option} value={option}>{option}</option>
                                    :
                                    <option key={option} value={option}>{option}</option>
                            ))
                        }
                    </select>
                </div>
                <nav>
                    <nav>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </nav>
            </div>


            <Outlet />
        </div>
    )
};

export default LanguageAppLayout;