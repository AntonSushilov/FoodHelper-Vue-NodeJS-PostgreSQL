import db from "../db.js"
import { validationResult } from "express-validator"
import { hash } from "../utils/bcrypt.js"
import { addTuple, getAllTuple, getOneTuple, updateTuple, deleteTuple } from "../utils/db_query.js"

class UserController {
  async createUser(req, res) {
    try {
      let newUser
      const { password } = req.body
      if (password) {
        const hashPass = hash(password)
        newUser = await db.query(addTuple("user", { ...req.body, password: hashPass }))
      } else {
        newUser = await db.query(addTuple("user", req.body))
      }
      res.json({
        success: true,
        message: "Пользователь создан успешно!",
        user: newUser.rows[0]
      })
    } catch (error) {
      res.json(error)

    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await db.query(getAllTuple("user", { "orderByAsc": true }))
      res.json({
        success: true,
        message: "Success",
        usersList: users.rows
      })
    } catch (error) {
    }
  }
  async getOneUser(req, res) {
    try {
      const id = req.params.id
      const user = await db.query(getOneTuple("user", {"id": Number(id)}))
      res.json({
        success: true,
        message: "Success",
        user: user.rows[0]
      })
    } catch (error) {
    }
  }
  async updateUser(req, res) {
    try {
      const newUser = await db.query(updateTuple("user", req.body))
      res.json({
        success: true,
        message: "Пользователь обновлен успешно!",
        user: newUser.rows[0]
      })
    } catch (error) {
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id
      const user = await db.query(deleteTuple("user", id))
      // res.json(user.rows[0])
      res.json({
        success: true,
        message: "Пользователь удален успешно!",
        user: {id: id}
      })
    } catch (error) {
    }
  }
}

export default new UserController()