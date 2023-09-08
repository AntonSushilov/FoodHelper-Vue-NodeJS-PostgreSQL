import db from "../db.js"
import { validationResult } from "express-validator"
import { addTuple, getAllTuple, getOneTuple, updateTuple, deleteTuple } from "../utils/db_query.js"

class ProductController {
  async createProduct(req, res) {
    try {
      const newProduct = await db.query(addTuple("product", req.body))
      res.json({
        success: true,
        message: "Продукт добавлен успешно!",
        product: newProduct.rows[0]
      })
    } catch (error) {
      res.json(error)
    }
  }
  async getAllProducts(req, res) {
    try {
      const products = await db.query(getAllTuple("product", { "orderByAsc": true }))
      res.json({
        success: true,
        message: "Success",
        productsList: products.rows
      })
    } catch (error) {
      res.json(error)
    }
  }
  async getOneProduct(req, res) {
    try {
      const id = req.params.id
      const product = await db.query(getOneTuple("product", { "id": Number(id) }))
      res.json({
        success: true,
        message: "Success",
        product: product.rows[0]
      })
    } catch (error) {
      res.json(error)
    }
  }
  async updateProduct(req, res) {
    try {
      const newProduct = await db.query(updateTuple("product", req.body))
      res.json({
        success: true,
        message: "Продукт обновлен успешно!",
        product: newProduct.rows[0]
      })
    } catch (error) {
      res.json(error)
    }
  }
  async deleteProduct(req, res) {
    try {
      const id = req.params.id
      const product = await db.query(deleteTuple("product", id))
      // res.json(product.rows[0])
      res.json({
        success: true,
        message: "Продукт удален успешно!",
        product: { id: id }
      })
    } catch (error) {
      res.json(error)
    }
  }
}

export default new ProductController()