import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallerverse } from "./WallerverseContext";

function timeAgo(ts: number): string {
    const s = (Date.now() - ts) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
}

export function avatarColor(username: string): string {
    const palette = ["#646cff", "#e91e63", "#ff5722", "#4caf50", "#2196f3", "#9c27b0", "#ff9800", "#00bcd4"];
    let h = 0;
    for (let i = 0; i < username.length; i++) h = username.charCodeAt(i) + h * 31;
    return palette[Math.abs(h) % palette.length];
}

const WallerverseFeed = () => {
    const { currentUser, logout, posts, addPost, profiles } = useWallerverse();
    const navigate = useNavigate();
    const [draft, setDraft] = useState("");

    const profile = currentUser ? profiles[currentUser] : null;
    const displayName = profile?.displayName ?? currentUser ?? "";

    const handlePost = () => {
        if (!draft.trim()) return;
        addPost(draft);
        setDraft("");
    };

    return (
        <div className="wv-container">
            {/* Sticky header */}
            <div className="wv-header">
                <span className="wv-header-title">Wallerverse</span>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {currentUser ? (
                        <>
                            <button
                                style={{ background: "none", border: "none", color: "var(--text-color)", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, padding: 0 }}
                                onClick={() => navigate(`/wallerverse/profile/${currentUser}`)}
                            >
                                @{currentUser}
                            </button>
                            <button
                                style={{ background: "none", border: "1px solid rgba(128,128,128,0.4)", borderRadius: 6, padding: "4px 12px", fontSize: "0.8rem", cursor: "pointer", color: "var(--text-color)" }}
                                onClick={logout}
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <button
                            style={{ background: "#646cff", color: "#fff", border: "none", borderRadius: 6, padding: "5px 14px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}
                            onClick={() => navigate("/wallerverse/login")}
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>

            {/* Composer or sign-in prompt */}
            {currentUser ? (
                <div className="wv-composer">
                    <div className="wv-avatar" style={{ background: avatarColor(currentUser) }}>
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="wv-composer-inner">
                        <span className="wv-composer-prefix">{displayName} is</span>
                        <input
                            className="wv-composer-input"
                            placeholder="feeling adventurous..."
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handlePost(); } }}
                            maxLength={200}
                        />
                        <button className="wv-post-btn" onClick={handlePost} disabled={!draft.trim()}>
                            Post
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(128,128,128,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--card-color)" }}>
                    <span style={{ fontSize: "0.9rem", opacity: 0.6 }}>Sign in to share what you're up to.</span>
                    <button
                        style={{ background: "#646cff", color: "#fff", border: "none", borderRadius: 20, padding: "6px 16px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
                        onClick={() => navigate("/wallerverse/login")}
                    >
                        Sign in
                    </button>
                </div>
            )}

            {/* Posts */}
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="wv-post"
                    onClick={() => navigate(`/wallerverse/profile/${post.username}`)}
                >
                    <div className="wv-avatar" style={{ background: avatarColor(post.username), fontSize: "0.9rem" }}>
                        {post.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="wv-post-content">
                        <span className="wv-post-name">{post.displayName}</span>
                        <p className="wv-post-text">
                            <span className="wv-post-muted">is </span>{post.completion}
                        </p>
                        <span className="wv-post-time">{timeAgo(post.timestamp)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WallerverseFeed;
