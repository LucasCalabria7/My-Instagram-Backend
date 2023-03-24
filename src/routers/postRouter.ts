import express, { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router();

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager(),
    )
);

// get posts
postRouter.get("/", postController.getPosts);

// create posts
postRouter.post("/", postController.createPosts);

// update posts
postRouter.put("/:id", postController.editPosts);

// delete posts
postRouter.delete("/:id", postController.deletePosts);

// like or dislike posts
postRouter.put("/:id/like", postController.likeOrDislikePost);