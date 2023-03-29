export enum ROLES {
    USER = "USER",
    ADM = "ADM"
}

export enum POST_LIKE {
    LIKED = "Already Liked",
    DISLIKED = "Already Disliked"
}

export interface UserDB {
    id: string;
    name: string;
    email: string;
    password: string;
    role: ROLES;
    created_at: string;
}

export interface PostDB {
    id: string;
    creator_id: string;
    content: string;
    likes: number;
    dislikes: number;
    created_at: string;
    updated_at: string;
}

export interface UserModel {
    id: string;
    name: string;
    email: string;
    password: string;
    role: ROLES;
    createdAt: string;
}

export interface PostModel {
    id: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
    creator: {
        id: string;
        name: string;
    };
}

export interface PostWithCreatorsDB extends PostDB {
    creator_name: string
}

export interface LikesDislikesDB {
    user_id: string,
    post_id: string,
    like: number
}

export interface TokenPayload {
    id: string;
    name: string;
    role: ROLES;
}

