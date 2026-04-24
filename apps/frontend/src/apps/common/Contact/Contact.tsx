import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px 80px" }}>
            <button className="back-btn" onClick={() => navigate("/")}>← Home</button>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
                Contact
            </h1>
            <p style={{ margin: "0 0 4px", fontWeight: 600 }}>Jeffrey Henderson</p>
            <p style={{ margin: 0, opacity: 0.65 }}>jeff.henderson.dev@gmail.com</p>
        </div>
    );
};

export default Contact;
