import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Post, UserProfile } from "./wallerverseTypes";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type WallerverseContextType = {
    currentUser: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    posts: Post[];
    addPost: (completion: string) => void;
    profiles: Record<string, UserProfile>;
    updateProfile: (profile: UserProfile) => Promise<void>;
};

const WallerverseContext = createContext<WallerverseContextType | null>(null);

export const useWallerverse = () => {
    const ctx = useContext(WallerverseContext);
    if (!ctx) throw new Error("useWallerverse must be inside WallerverseProvider");
    return ctx;
};

function authHeader(token: string | null): Record<string, string> {
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const WallerverseProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("wv_token"));
    const [currentUser, setCurrentUser] = useState<string | null>(() => localStorage.getItem("wv_user"));
    const [posts, setPosts] = useState<Post[]>([]);
    const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});

    // Verify token on mount; clear stale session if invalid
    useEffect(() => {
        if (!token) return;
        fetch(`${API_URL}/api/me`, { headers: authHeader(token) })
            .then((res) => {
                if (!res.ok) {
                    localStorage.removeItem("wv_token");
                    localStorage.removeItem("wv_user");
                    setToken(null);
                    setCurrentUser(null);
                }
            })
            .catch(() => {});
    }, []);

    // Load all profiles
    useEffect(() => {
        fetch(`${API_URL}/api/profiles`)
            .then((res) => res.json())
            .then((data: UserProfile[]) => {
                const record: Record<string, UserProfile> = {};
                for (const p of data) record[p.username] = p;
                setProfiles(record);
            })
            .catch(() => {});
    }, []);

    // Load posts
    useEffect(() => {
        fetch(`${API_URL}/api/posts`)
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch(() => {});
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        const res = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) return false;
        const { token: newToken, profile } = await res.json();
        localStorage.setItem("wv_token", newToken);
        localStorage.setItem("wv_user", username);
        setToken(newToken);
        setCurrentUser(username);
        setProfiles((prev) => ({ ...prev, [username]: profile }));
        return true;
    };

    const logout = async () => {
        if (token) {
            await fetch(`${API_URL}/api/logout`, {
                method: "DELETE",
                headers: authHeader(token),
            }).catch(() => {});
        }
        localStorage.removeItem("wv_token");
        localStorage.removeItem("wv_user");
        setToken(null);
        setCurrentUser(null);
    };

    const addPost = (completion: string) => {
        if (!currentUser || !token) return;
        fetch(`${API_URL}/api/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeader(token) },
            body: JSON.stringify({ post: { completion: completion.trim() } }),
        })
            .then((res) => res.json())
            .then((newPost) => setPosts((prev) => [newPost, ...prev]));
    };

    const updateProfile = async (profile: UserProfile) => {
        if (!token) return;
        const res = await fetch(`${API_URL}/api/profiles/${profile.username}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", ...authHeader(token) },
            body: JSON.stringify({
                profile: {
                    display_name: profile.displayName,
                    bio: profile.bio,
                    top_friends: profile.topFriends,
                    custom_style: profile.customStyle,
                },
            }),
        });
        if (res.ok) {
            const updated: UserProfile = await res.json();
            setProfiles((prev) => ({ ...prev, [updated.username]: updated }));
        }
    };

    return (
        <WallerverseContext.Provider value={{ currentUser, login, logout, posts, addPost, profiles, updateProfile }}>
            {children}
        </WallerverseContext.Provider>
    );
};
