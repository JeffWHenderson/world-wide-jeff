import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallerverse } from "./WallerverseContext";

const WallerverseLogin = () => {
    const { login } = useWallerverse();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (login(username.trim(), password)) {
            navigate("/wallerverse");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="wv-login-wrap">
            <button
                onClick={() => navigate("/wallerverse")}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", opacity: 0.6, padding: "0 0 12px", color: "var(--text-color)" }}
            >
                ← Back to feed
            </button>
            <div className="wv-login-card">
                <h1 className="wv-login-title">Wallerverse</h1>
                <p className="wv-login-sub">Sign in to share what you're up to.</p>
                <form onSubmit={handleSubmit}>
                    <div className="wv-field">
                        <label htmlFor="wv-username">Username</label>
                        <input
                            id="wv-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            autoFocus
                        />
                    </div>
                    <div className="wv-field">
                        <label htmlFor="wv-password">Password</label>
                        <input
                            id="wv-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    {error && <p className="wv-error">{error}</p>}
                    <button type="submit" className="wv-login-btn">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default WallerverseLogin;
