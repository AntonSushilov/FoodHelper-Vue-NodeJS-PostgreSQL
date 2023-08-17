import { Router } from "express";
import validator from "../utils/validators.js"
import ProductController from "../controllers/product.controller.js";

const productRouter = new Router()

productRouter.post("/products", ProductController.createProduct)
productRouter.get("/products", ProductController.getAllProducts)
productRouter.get("/products/:id", ProductController.getOneProduct)
productRouter.put("/products", ProductController.updateProduct)
productRouter.delete("/products/:id", ProductController.deleteProduct)

export default productRouter