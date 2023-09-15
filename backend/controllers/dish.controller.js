import db from "../db.js"
import { validationResult } from "express-validator"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class DishController {
  async createDish(req, res) {
    try {
      const { products, ...dish } = req.body
      const newDish = await prisma.dish.create({
        data: {
          ...dish, dish_product: {
            create: products
          }
        },
        include: {
          dish_product: {
            include: {
              product: true
            },
            orderBy: {
              id: "asc"
            }
          },
        },
      })
      res.json({
        success: true,
        message: "Блюдо добавлено успешно!",
        dish: newDish,
      })
      return;
    } catch (error) {
      res.json(error)
    }
  }
  async getAllDishes(req, res) {
    try {
      const dishes = await prisma.dish.findMany({
        include: {
          dish_product: {
            include: {
              product: true
            },
            orderBy: {
              id: "asc"
            }
          },
        },
        orderBy: {
          id: "asc"
        },
      })
      res.json({
        success: true,
        message: "Все блюда",
        dishesList: dishes,
      })
      return
    } catch (error) {
      res.json(error)
    }
  }
  async getOneDish(req, res) {
    try {
      const id = req.params.id
      const dish = await prisma.dish.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          dish_product: {
            include: {
              product: true
            },
            orderBy: {
              id: "asc"
            }
          },
        },
      })
      if(dish){
        res.json({
          success: true,
          message: "Блюдо найдено!",
          dish: dish
        })
        return
      }else{
        res.json({
          success: false,
          message: "Блюдо не найдено!",
        })
        return
      }
      
    } catch (error) {
      res.json(error)
    }
  }
  async updateDish(req, res) {
    try {
      console.log("TYYYT")
      const { id, products, ...updateData } = req.body
      // console.log(id)
      // console.log(products)
      // console.log(updateData)
      const updateDish = await prisma.dish.update({
        where: {
          id: Number(id),
        },
        data: {
          ...updateData,
          dish_product: {
            deleteMany: {},
            createMany: {
              data: products
            }
          },
        },
        include: {
          dish_product: {
            include: {
              product: true
            },
            orderBy: {
              id: "asc"
            }
          },
        },
      })
      console.log(updateDish)

      res.json({
        success: true,
        message: "Блюдо обновлено успешно!",
        dish: updateDish
      })
    } catch (error) {
      res.json(error)
    }
  }
  async deleteDish(req, res) {
    try {
      const id = req.params.id
      const deleteDish = await prisma.dish.delete({
        where: {
          id: Number(id),
        },
      })
      res.json({
        success: true,
        message: "Блюдо удалено успешно!",
        dish: deleteDish
      })
    } catch (error) {
      res.json(error)
    }
  }
}

export default new DishController()