export enum ROLES {
    USER = "USER",
    ADM = "ADM"
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