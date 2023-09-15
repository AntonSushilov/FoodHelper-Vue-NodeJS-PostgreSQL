import db from "../db.js"
import { validationResult } from "express-validator"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class ProductController {
  async createProduct(req, res) {
    try {
      const newProduct = await prisma.product.create({
        data: { ...req.body }
      })
      res.json({
        success: true,
        message: "Продукт добавлен успешно!",
        product: newProduct
      })
    } catch (error) {
      res.json(error)
    }
  }
  async getAllProducts(req, res) {
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          id: "asc"
        },
      })

      // const products = await db.query(getAllTuple("product", { "orderByAsc": true }))
      res.json({
        success: true,
        message: "Success",
        productsList: products
      })
    } catch (error) {
      res.json(error)
    }
  }
  async getOneProduct(req, res) {
    try {
      const id = req.params.id
      // const product = await db.query(getOneTuple("product", { "id": Number(id) }))
      const product = await prisma.product.findUnique({
        where: {
          id: Number(id)
        },
      })

      if (product) {
        res.json({
          success: true,
          message: "Продукт найден!",
          product: product
        })
        return
      } else {
        res.json({
          success: false,
          message: "Продукт не найден!",
        })
        return
      }
    } catch (error) {
      res.json(error)
    }
  }
  async updateProduct(req, res) {
    try {
      const { id, ...updateData } = req.body
      const updateProduct = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: { ...updateData },
      })
      
      res.json({
        success: true,
        message: "Продукт обновлен успешно!",
        product: updateProduct
      })
    } catch (error) {
      res.json(error)
    }
  }
  async deleteProduct(req, res) {
    try {
      const id = req.params.id
      const deleteProduct = await prisma.product.delete({
        where: {
          id: Number(id),
        },
      })
      res.json({
        success: true,
        message: "Продукт удален успешно!",
        product: deleteProduct
      })
    } catch (error) {
      res.json(error)
    }
  }
}

export default new ProductController()