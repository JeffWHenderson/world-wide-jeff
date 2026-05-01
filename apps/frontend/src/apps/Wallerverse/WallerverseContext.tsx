import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Post, UserProfile } from "./wallerverseTypes";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type WallerverseContextType = {
    currentUser: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    posts: Post[];
    addPost: (completion: string) => void;
    profiles: Record<string, UserProfile>;
    updateProfile: (profile: UserProfile) => void;
};

const WallerverseContext = createContext<WallerverseContextType | null>(null);

export const useWallerverse = () => {
    const ctx = useContext(WallerverseContext);
    if (!ctx) throw new Error("useWallerverse must be inside WallerverseProvider");
    return ctx;
};

const CREDENTIALS: Record<string, string> = { jeff: "secretPassword" };

const DEFAULT_PROFILES: Record<string, UserProfile> = {
    jeff: {
        username: "jeff",
        displayName: "Jeff Henderson",
        bio: "Building things on the internet.",
        topFriends: ["waller", "tom", "audry", "maya", "ricky", "dana", "chris", "sam"],
        customStyle: {},
    },
    waller: {
        username: "waller",
        displayName: "Waller Goble",
        bio: "Professional chaos agent.",
        topFriends: ["jeff", "tom", "audry"],
        customStyle: { backgroundColor: "#1a0033", textColor: "#e8d5ff", accentColor: "#9b59b6", headerBg: "#2d0052" },
    },
    tom: {
        username: "tom",
        displayName: "Tom",
        bio: "Everyone's first friend.",
        topFriends: [],
        customStyle: { backgroundColor: "#003366", textColor: "#cce5ff", accentColor: "#4488cc", headerBg: "#00204a" },
    },
    audry: {
        username: "audry",
        displayName: "Audry",
        bio: "Living my best life ✨",
        topFriends: ["jeff", "waller"],
        customStyle: { backgroundColor: "#ffe0ec", textColor: "#4a0020", accentColor: "#cc0044", headerBg: "#ffb3cc" },
    },
    maya: { username: "maya", displayName: "Maya", bio: "", topFriends: [], customStyle: {} },
    ricky: { username: "ricky", displayName: "Ricky", bio: "Just vibing.", topFriends: [], customStyle: {} },
    dana: { username: "dana", displayName: "Dana", bio: "", topFriends: [], customStyle: {} },
    chris: { username: "chris", displayName: "Chris", bio: "", topFriends: [], customStyle: {} },
    sam: { username: "sam", displayName: "Sam", bio: "", topFriends: [], customStyle: {} },
};

function load<T>(key: string, fallback: T): T {
    try {
        const val = localStorage.getItem(key);
        return val ? (JSON.parse(val) as T) : fallback;
    } catch {
        return fallback;
    }
}

export const WallerverseProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(() => load("wv_user", null));
    const [posts, setPosts] = useState<Post[]>([]);
    const [profiles, setProfiles] = useState<Record<string, UserProfile>>(() => load("wv_profiles", DEFAULT_PROFILES));

    useEffect(() => { localStorage.setItem("wv_user", JSON.stringify(currentUser)); }, [currentUser]);
    useEffect(() => { localStorage.setItem("wv_profiles", JSON.stringify(profiles)); }, [profiles]);

    useEffect(() => {
        fetch(`${API_URL}/api/posts`)
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    const login = (username: string, password: string): boolean => {
        if (CREDENTIALS[username] === password) {
            setCurrentUser(username);
            return true;
        }
        return false;
    };

    const logout = () => setCurrentUser(null);

    const addPost = (completion: string) => {
        if (!currentUser) return;
        const profile = profiles[currentUser];
        fetch(`${API_URL}/api/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                post: {
                    username: currentUser,
                    display_name: profile?.displayName ?? currentUser,
                    completion: completion.trim(),
                },
            }),
        })
            .then((res) => res.json())
            .then((newPost) => setPosts((prev) => [newPost, ...prev]));
    };

    const updateProfile = (profile: UserProfile) => {
        setProfiles((prev) => ({ ...prev, [profile.username]: profile }));
    };

    return (
        <WallerverseContext.Provider value={{ currentUser, login, logout, posts, addPost, profiles, updateProfile }}>
            {children}
        </WallerverseContext.Provider>
    );
};
