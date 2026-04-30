import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Post, UserProfile } from "./wallerverseTypes";

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

const now = Date.now();
const SEED_POSTS: Post[] = [
    { id: "s1", username: "waller", displayName: "Waller Goble", completion: "ready for the weekend", timestamp: now - 1000 * 60 * 60 * 2 },
    { id: "s2", username: "tom", displayName: "Tom", completion: "your first friend on Wallerverse", timestamp: now - 1000 * 60 * 60 * 5 },
    { id: "s3", username: "jeff", displayName: "Jeff Henderson", completion: "building something new", timestamp: now - 1000 * 60 * 60 * 8 },
    { id: "s4", username: "audry", displayName: "Audry", completion: "obsessed with iced coffee rn", timestamp: now - 1000 * 60 * 60 * 12 },
    { id: "s5", username: "waller", displayName: "Waller Goble", completion: "not going to apologize for it", timestamp: now - 1000 * 60 * 60 * 24 },
    { id: "s6", username: "jeff", displayName: "Jeff Henderson", completion: "learning pickleball and it's going poorly", timestamp: now - 1000 * 60 * 60 * 48 },
    { id: "s7", username: "ricky", displayName: "Ricky", completion: "just vibing honestly", timestamp: now - 1000 * 60 * 60 * 72 },
];

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
    const [posts, setPosts] = useState<Post[]>(() => load("wv_posts", SEED_POSTS));
    const [profiles, setProfiles] = useState<Record<string, UserProfile>>(() => load("wv_profiles", DEFAULT_PROFILES));

    useEffect(() => { localStorage.setItem("wv_user", JSON.stringify(currentUser)); }, [currentUser]);
    useEffect(() => { localStorage.setItem("wv_posts", JSON.stringify(posts)); }, [posts]);
    useEffect(() => { localStorage.setItem("wv_profiles", JSON.stringify(profiles)); }, [profiles]);

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
        setPosts((prev) => [{
            id: `p_${Date.now()}`,
            username: currentUser,
            displayName: profile?.displayName ?? currentUser,
            completion: completion.trim(),
            timestamp: Date.now(),
        }, ...prev]);
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
