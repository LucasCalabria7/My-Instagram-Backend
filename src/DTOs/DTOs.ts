import { PostModel } from "../interfaces/interfaces";

export interface SignupInputDTO {
    name: unknown;
    email: unknown;
    password: unknown;
}

export interface SignupOutputDTO {
    token: string;
}

export interface LoginInputDTO {
    email: unknown;
    password: unknown;
}

export interface LoginOutputDTO {
    message: string
    token: string
}

export interface SignupOutputDTO {
    token: string;
}

export interface GetPostsInputDTO {
    q: string | undefined
    token: string | undefined;
}

export type GetPostsOutputDTO = PostModel[];

export interface CreatePostInputDTO {
    token: string | undefined;
    content: unknown
}

export interface EditPostInputDTO {
    idToEdit: string;
    token: string | undefined;
    content: unknown;
}

export interface DeletePostInputDTO {
    idToDelete: string;
    token: string | undefined;
}

export interface LikeOrDislikePostInputDTO {
    idToLikeOrDislike: string;
    token: string | undefined;
    like: unknown;
}