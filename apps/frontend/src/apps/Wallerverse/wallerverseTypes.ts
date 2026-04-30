export type Post = {
    id: string;
    username: string;
    displayName: string;
    completion: string;
    timestamp: number;
};

export type CustomStyle = {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    fontFamily?: string;
    headerBg?: string;
};

export type UserProfile = {
    username: string;
    displayName: string;
    bio: string;
    topFriends: string[];
    customStyle: CustomStyle;
};
