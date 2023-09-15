import { Router } from "express";
import validator from "../utils/validators.js"
import DishController from "../controllers/dish.controller.js";

const dishRouter = new Router()

dishRouter.post("/dishes", DishController.createDish)
dishRouter.get("/dishes", DishController.getAllDishes)
dishRouter.get("/dishes/:id", DishController.getOneDish)
dishRouter.put("/dishes", DishController.updateDish)
dishRouter.delete("/dishes/:id", DishController.deleteDish)

export default dishRouter