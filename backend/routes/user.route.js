import { Router } from "express";
import validator from "../utils/validators.js"
import userController from "../controllers/user.controller.js";

const userRouter = new Router()

userRouter.post("/users", userController.createUser)
userRouter.get("/users", userController.getAllUsers)
userRouter.get("/users/:id", userController.getOneUser)
userRouter.put("/users", userController.updateUser)
userRouter.delete("/users/:id", userController.deleteUser)

export default userRouter