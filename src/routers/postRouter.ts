import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

const postController = new PostController(
    new PostBusiness()
);

postRouter.get("/", postController.getPosts);
postRouter.post("/", postController.createPosts);
postRouter.put("/:id", postController.editPosts);
postRouter.delete("/:id", postController.deletePosts);
postRouter.put("/:id/like", postController.likeOrDislikePost);