import { useNavigate } from "react-router-dom";
import UnderConstruction from "../common/Core/UnderConstruction";

const Pickleball = () => {
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px 80px" }}>
            <button className="back-btn" onClick={() => navigate("/")}>← Home</button>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
                Pickleball
            </h1>
            <UnderConstruction name="Pickleball League" />
            <p>Details to come...</p>
            <p>
                The idea is to host a few meetup days to get people at the condo's tennis court. If we
                start collecting enough people I'll start organizing with sign ups and maybe some actual
                effort into this webpage.
            </p>
            <p>
                It could also be tennis, I just think that would involve more skill matching, and I don't
                think I'm smart enough for that.
            </p>
        </div>
    );
};

export default Pickleball;
