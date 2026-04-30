import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWallerverse } from "./WallerverseContext";
import { UserProfile } from "./wallerverseTypes";
import { avatarColor } from "./WallerverseFeed";

function timeAgo(ts: number): string {
    const s = (Date.now() - ts) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
}

const FONT_OPTIONS = [
    { label: "Default", value: "" },
    { label: "Comic Sans", value: "'Comic Sans MS', cursive" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Impact", value: "Impact, sans-serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
];

const KNOWN_USERS = ["jeff", "waller", "tom", "audry", "maya", "ricky", "dana", "chris", "sam"];

const WallerverseProfile = () => {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const { currentUser, profiles, posts, updateProfile } = useWallerverse();

    const profile = username ? profiles[username] : undefined;
    const isOwn = currentUser === username;

    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState<UserProfile | null>(null);
    const [friendInput, setFriendInput] = useState("");

    if (!profile || !username) {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                <p>User not found.</p>
                <button onClick={() => navigate("/wallerverse")}>← Back to feed</button>
            </div>
        );
    }

    const userPosts = posts.filter((p) => p.username === username);
    const active = editing && draft ? draft : profile;
    const cs = active.customStyle;

    const wrapStyle: React.CSSProperties = {
        backgroundColor: cs.backgroundColor,
        color: cs.textColor,
        fontFamily: cs.fontFamily || undefined,
    };

    const headerBandStyle: React.CSSProperties = {
        backgroundColor: cs.headerBg ?? cs.accentColor ?? "rgba(100,108,255,0.12)",
        borderRadius: 14,
        padding: "22px",
        marginBottom: 20,
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
    };

    const friendTileBg = cs.accentColor ? `${cs.accentColor}28` : "rgba(100,108,255,0.1)";
    const friendTileBorder = cs.accentColor ?? "rgba(100,108,255,0.2)";
    const postBg = cs.accentColor ? `${cs.accentColor}1a` : "rgba(100,108,255,0.07)";
    const accent = cs.accentColor ?? "#646cff";

    const startEdit = () => { setDraft({ ...profile }); setEditing(true); };
    const cancelEdit = () => { setDraft(null); setEditing(false); };
    const saveEdit = () => { if (draft) updateProfile(draft); setDraft(null); setEditing(false); };

    const patchDraft = (patch: Partial<UserProfile>) => setDraft((d) => d ? { ...d, ...patch } : d);
    const patchStyle = (patch: object) => setDraft((d) => d ? { ...d, customStyle: { ...d.customStyle, ...patch } } : d);

    const addFriend = () => {
        if (!draft) return;
        const f = friendInput.trim().toLowerCase();
        if (!f || !KNOWN_USERS.includes(f) || draft.topFriends.includes(f) || draft.topFriends.length >= 8) return;
        patchDraft({ topFriends: [...draft.topFriends, f] });
        setFriendInput("");
    };

    const removeFriend = (f: string) => {
        if (draft) patchDraft({ topFriends: draft.topFriends.filter((x) => x !== f) });
    };

    return (
        <div className="wv-profile-wrap" style={wrapStyle}>
            {/* Top bar */}
            <div className="wv-profile-topbar">
                <button
                    onClick={() => navigate("/wallerverse")}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", color: "inherit", opacity: 0.65, padding: 0 }}
                >
                    ← Back to feed
                </button>
                {isOwn && !editing && (
                    <button onClick={startEdit} style={{ background: accent, color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                        Edit Profile
                    </button>
                )}
                {isOwn && editing && (
                    <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={saveEdit} style={{ background: accent, color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>Save</button>
                        <button onClick={cancelEdit} style={{ background: "none", border: "1px solid currentColor", borderRadius: 8, padding: "6px 16px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", color: "inherit" }}>Cancel</button>
                    </div>
                )}
            </div>

            {/* Profile header band */}
            <div style={headerBandStyle}>
                <div className="wv-profile-avatar" style={{ background: avatarColor(username) }}>
                    {active.displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="wv-profile-name">{active.displayName}</p>
                    <p className="wv-profile-handle">@{username}</p>
                    {active.bio && <p className="wv-profile-bio">{active.bio}</p>}
                </div>
            </div>

            {/* Edit panel */}
            {editing && draft && (
                <div className="wv-edit-panel" style={{ background: "rgba(0,0,0,0.15)", marginBottom: 20 }}>
                    <p style={{ margin: "0 0 14px", fontWeight: 700, fontSize: "0.9rem" }}>Customize your profile</p>

                    {/* Text fields */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                        <div className="wv-edit-field">
                            <span className="wv-edit-label">Display name</span>
                            <input className="wv-edit-input" type="text" value={draft.displayName} onChange={(e) => patchDraft({ displayName: e.target.value })} />
                        </div>
                        <div className="wv-edit-field">
                            <span className="wv-edit-label">Bio</span>
                            <textarea
                                value={draft.bio}
                                onChange={(e) => patchDraft({ bio: e.target.value })}
                                rows={2}
                                style={{ border: "1px solid rgba(128,128,128,0.3)", borderRadius: 7, padding: "7px 10px", fontSize: "0.85rem", background: "rgba(0,0,0,0.15)", color: "inherit", fontFamily: "inherit", resize: "vertical", width: "100%", boxSizing: "border-box" }}
                            />
                        </div>
                    </div>

                    {/* Colors + font */}
                    <div className="wv-edit-grid">
                        <div className="wv-edit-field">
                            <span className="wv-edit-label">Background</span>
                            <input className="wv-edit-color" type="color" value={draft.customStyle.backgroundColor ?? "#ffffff"} onChange={(e) => patchStyle({ backgroundColor: e.target.value })} />
                        </div>
                        <div className="wv-edit-field">
                            <span className="wv-edit-label">Text color</span>
                            <input className="wv-edit-color" type="color" value={draft.customStyle.textColor ?? "#111111"} onChange={(e) => patchStyle({ textColor: e.target.value })} />
                        </div>
                        <div className="wv-edit-field">
                            <span className="wv-edit-label">Accent color</span>
                            <input className="wv-edit-color" type="color" value={draft.customStyle.accentColor ?? "#646cff"} onChange={(e) => patchStyle({ accentColor: e.target.value })} />
                        </div>
                        <div className="wv-edit-field">
                            <span className="wv-edit-label">Header background</span>
                            <input className="wv-edit-color" type="color" value={draft.customStyle.headerBg ?? "#eeeeee"} onChange={(e) => patchStyle({ headerBg: e.target.value })} />
                        </div>
                        <div className="wv-edit-field" style={{ gridColumn: "span 2" }}>
                            <span className="wv-edit-label">Font</span>
                            <select value={draft.customStyle.fontFamily ?? ""} onChange={(e) => patchStyle({ fontFamily: e.target.value })} style={{ border: "1px solid rgba(128,128,128,0.3)", borderRadius: 7, padding: "7px 10px", fontSize: "0.85rem", background: "rgba(0,0,0,0.15)", color: "inherit", fontFamily: "inherit" }}>
                                {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Top 8 editor */}
                    <div>
                        <p style={{ margin: "0 0 8px", fontSize: "0.78rem", fontWeight: 600, opacity: 0.7 }}>
                            Top 8 Friends ({draft.topFriends.length}/8)
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                            {draft.topFriends.map((f) => (
                                <span key={f} className="wv-friend-tag">
                                    @{f}
                                    <button className="wv-friend-tag-remove" onClick={() => removeFriend(f)}>×</button>
                                </span>
                            ))}
                        </div>
                        {draft.topFriends.length < 8 && (
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <input
                                    className="wv-edit-input"
                                    style={{ width: "auto", flex: "0 0 140px" }}
                                    type="text"
                                    placeholder="add username..."
                                    value={friendInput}
                                    onChange={(e) => setFriendInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFriend(); } }}
                                />
                                <button onClick={addFriend} style={{ background: accent, color: "#fff", border: "none", borderRadius: 7, padding: "7px 14px", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>Add</button>
                            </div>
                        )}
                        <p style={{ margin: "6px 0 0", fontSize: "0.7rem", opacity: 0.5 }}>Users: {KNOWN_USERS.join(", ")}</p>
                    </div>
                </div>
            )}

            {/* Top 8 */}
            {active.topFriends.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                    <p className="wv-section-title">Top {Math.min(active.topFriends.length, 8)} Friends</p>
                    <div className="wv-top8-grid">
                        {active.topFriends.slice(0, 8).map((friend) => {
                            const fp = profiles[friend];
                            return (
                                <button
                                    key={friend}
                                    className="wv-friend-tile"
                                    style={{ background: friendTileBg, border: `1px solid ${friendTileBorder}` }}
                                    onClick={() => navigate(`/wallerverse/profile/${friend}`)}
                                >
                                    <div className="wv-friend-avatar" style={{ background: avatarColor(friend) }}>
                                        {(fp?.displayName ?? friend).charAt(0).toUpperCase()}
                                    </div>
                                    <span className="wv-friend-name">{fp?.displayName ?? friend}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Posts */}
            <div>
                <p className="wv-section-title">
                    {isOwn ? "Your posts" : `${active.displayName}'s posts`}
                </p>
                {userPosts.length === 0 && (
                    <p style={{ opacity: 0.45, fontSize: "0.88rem" }}>No posts yet.</p>
                )}
                {userPosts.map((post) => (
                    <div key={post.id} className="wv-profile-post" style={{ background: postBg, border: `1px solid ${friendTileBorder}28` }}>
                        <p style={{ margin: "0 0 4px" }}>
                            <span style={{ opacity: 0.5 }}>{active.displayName} is </span>
                            {post.completion}
                        </p>
                        <p className="wv-profile-post-time">{timeAgo(post.timestamp)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WallerverseProfile;
