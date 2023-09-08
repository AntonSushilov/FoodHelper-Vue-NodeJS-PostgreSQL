import db from "../db.js"
import { validationResult } from "express-validator"
import { hash, compare } from "../utils/bcrypt.js"
import { addTuple, getAllTuple, getOneTuple, updateTuple, deleteTuple } from "../utils/db_query.js"

class AuthorizationController {
  async signUp(req, res) {
    try {
      console.log(req.body)
      // const reqUser = req.body
      // const user = await db.query(getOneTuple("user", { "email": reqUser.email }))
      // if (user.rows[0]) {
      //   res.json({
      //     success: false,
      //     message: "Пользователь уже существует!"
      //   })
      //   return;
      // }
      // let newUser
      // const { password } = req.body
      // if (password) {
      //   const hashPass = hash(password)
      //   newUser = await db.query(addTuple("user", { ...req.body, password: hashPass }))
      // } else {
      //   newUser = await db.query(addTuple("user", req.body))
      // }
      res.json({
        success: true,
        message: "Пользователь создан успешно!",
        // user: newUser.rows[0]
        user: req.body,
        token: "token123"
      })
    } catch (error) {
      res.json(error)
    }
  }

  async signIn(req, res) {
    try {
      const reqUser = req.body
      const user = await db.query(getOneTuple("user", { "email": reqUser.email }))
      if(!user.rows[0]){
        res.json({
          success: false,
          message: "Пользователь не найден!",
        })
        return
      }
      if(compare(reqUser.password, user.rows[0].password)){
        res.json({
          success: true,
          message: "Авторизация прошла успешно!",
          user: {
            email: user.rows[0].email,
            name: user.rows[0].name,
            surname: user.rows[0].surname,
          },
          token: "token123"
        })
        return
      }
      // const products = await db.query(getAllTuple("product", { "orderByAsc": true }))
      // res.json(products.rows)
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
      // res.json(error)
    }
  }

}

export default new AuthorizationController()