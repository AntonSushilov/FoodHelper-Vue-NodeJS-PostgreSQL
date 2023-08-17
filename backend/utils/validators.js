import { check } from "express-validator";


const userValidator = [
  check('email', "Не соответствует Email").isEmail(),
  check('password', "Пароль должен быть больше 4 символов").isLength({ min: 4 })]

const validator = {
  "userValidator": userValidator
}

export default validator