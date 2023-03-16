import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
    constructor(private postBusiness: PostBusiness) { }


    public getPosts = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization
            };

            const output = await this.postBusiness.getPosts(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error)
        }
    }


    public createPosts = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                content: req.body.content
            }

            const output = await this.postBusiness.createPosts(input)
            res.status(201).end()
        } catch (error) {
            console.log(error)
        }
    }


    public editPosts = async (req: Request, res: Response) => {
        try {
            const input = {
                idToEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }

            await this.postBusiness.editPosts(input)
            res.status(200).end()
        } catch (error) {
            console.log(error)
        }

    }


    public deletePosts = async (req: Request, res: Response) => {
        try {
            const input = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            await this.postBusiness.deletePosts(input)
            res.status(200).end()
        } catch (error) {
            console.log(error)
        }
    }


    public likeOrDislikePost = async (req: Request, res: Response) => {
        try {
            const input = {
                idToLikeOrDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }
            await this.postBusiness.likeOrDislikePost(input)
            res.status(200).end()
        } catch (error) {
            console.log(error)
        }
    }
}