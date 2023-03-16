import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController(
    new UserBusiness()
);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

