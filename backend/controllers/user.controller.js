import db from "../db.js"
import { validationResult } from "express-validator"
import { hash } from "../utils/bcrypt.js"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserController {
  async createUser(req, res) {
    try {
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
        user: newUser
      })
    } catch (error) {
      res.json(error)

    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          id: "asc"
        },
      })
      res.json({
        success: true,
        message: "Success",
        usersList: users
      })
    } catch (error) {
    }
  }
  async getOneUser(req, res) {
    try {
      const id = req.params.id
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        },
      })
      if (user) {
        res.json({
          success: true,
          message: "Пользователь найден!",
          user: user
        })
        return
      } else {
        res.json({
          success: false,
          message: "Пользователь не найден!",
        })
        return
      }

    } catch (error) {
    }
  }
  async updateUser(req, res) {
    try {
      const { id, ...updateData } = req.body
      const updateUser = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: { ...updateData },
      })
      res.json({
        success: true,
        message: "Пользователь обновлен успешно!",
        user: updateUser
      })
    } catch (error) {
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id
      const deleteUser = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      })
      res.json({
        success: true,
        message: "Пользователь удален успешно!",
        user: deleteUser
      })
    } catch (error) {
    }
  }
}

export default new UserController()