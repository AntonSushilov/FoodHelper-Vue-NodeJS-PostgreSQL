import { Router } from "express";
import validator from "../utils/validators.js"
import authorizationController from "../controllers/authorization.controller.js";

const authorizationRouter = new Router()

authorizationRouter.post("/auth/signUp", authorizationController.signUp)
authorizationRouter.post("/auth/signIn", authorizationController.signIn)
authorizationRouter.post("/auth/sighOut", authorizationController.signOut)

export default authorizationRouter