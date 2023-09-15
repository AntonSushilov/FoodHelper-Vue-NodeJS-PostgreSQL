import db from "../db.js"
import { validationResult } from "express-validator"
import { hash, compare } from "../utils/bcrypt.js"
import { addTuple, getAllTuple, getOneTuple, updateTuple, deleteTuple } from "../utils/db_query.js"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class AuthorizationController {
  async signUp(req, res) {
    try {
      const reqUser = req.body
      // Переделать схему для email уникального
      const user = await prisma.user.findFirst({
        where: {
          email: reqUser.email
        }
      })
      if (user) {
        res.json({
          success: false,
          message: "Пользователь уже существует!",
        })
        return
      }
      const { password } = req.body
      if (!password) {
        res.json({
          success: false,
          message: "Пустой пароль!",
        })
        return
      }
      const hashPass = hash(password)
      const newUser = await prisma.user.create({
        data: { ...req.body, password: hashPass }
      })
      res.json({
        success: true,
        message: "Пользователь создан успешно!",
        user: newUser,
        token: "token123"
      })
      return
    } catch (error) {
      res.json(error)
    }
  }

  async signIn(req, res) {
    try {
      const reqUser = req.body
      // Переделать схему для email уникального
      const user = await prisma.user.findFirst({
        where: {
          email: reqUser.email
        }
      })
      if (!user) {
        res.json({
          success: false,
          message: "Пользователь не найден!",
        })
        return
      }
      if (compare(reqUser.password, user.password)) {
        res.json({
          success: true,
          message: "Авторизация прошла успешно!",
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
          },
          token: "token123"
        })
        return
      } else {
        res.json({
          success: false,
          message: "Пароль не верный!",
        })
      }
    } catch (error) {
      res.json(error)
    }
  }
  async signOut(req, res) {
    try {
      // const id = req.params.id
      // const product = await db.query(getOneTuple("product", id))
      // res.json(product.rows[0])
    } catch (error) {
      res.json(error)
    }
  }

}

export default new AuthorizationController()