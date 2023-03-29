import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostsInputDTO, LikeOrDislikePostInputDTO } from "../DTOs/DTOs";

export class PostController {
    constructor(private postBusiness: PostBusiness) { }

    public getPosts = async (req: Request, res: Response) => {
        try {

            const input: GetPostsInputDTO = {
                token: req.headers.authorization
            };  

            const output = await this.postBusiness.getPosts(input);

            res.status(200).send(output);

        } catch (error) {
            console.log(error);

            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("Unexpected Error");
            }
        }
    };


    public createPosts = async (req: Request, res: Response) => {
        try {
            const input: CreatePostInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }

            const output = await this.postBusiness.createPosts(input)

            res.status(201).send(output)

        } catch (error) {

            console.log(error);

            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("Unexpected Error");
            }
        }
    };


    public editPosts = async (req: Request, res: Response) => {
        try {

            const input: EditPostInputDTO = {
                idToEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }

            const output = await this.postBusiness.editPosts(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error);

            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("Unexpected Error");
            }
        }
    };


    public deletePosts = async (req: Request, res: Response) => {
        try {
            const input: DeletePostInputDTO = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            const output = await this.postBusiness.deletePosts(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error);

            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("Unexpected Error");
            }
        }
    };


    public likeOrDislikePost = async (req: Request, res: Response) => {
        try {

            const input: LikeOrDislikePostInputDTO = {
                idToLikeOrDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }

            const output = await this.postBusiness.likeOrDislikePost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error);

            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("Unexpected Error");
            }
        }
    };
}