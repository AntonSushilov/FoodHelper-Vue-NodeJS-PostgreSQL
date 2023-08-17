import bcrypt from "bcryptjs"

export function hash(password) {
  return bcrypt.hashSync(password, 10);
}

export function compare(password, hashedPassword) {
  // Cannot bcrypt compare when one is undefined
  if (!password || !hashedPassword) {
    return false;
  }

  return bcrypt.compareSync(password, hashedPassword);
}

// console.log("Это хэш")
// let hashPass = hash("fdsf")
// console.log(hashPass)
// console.log(compare("fdsf", hashPass))


// const dataItem = {
//   "email": "email123@mail.ru",
//   // "password": "password222",
//   "name": "name131",
//   "surname": "surname312312"
// }

// console.log({ ...dataItem, password: dataItem?.password && hash(dataItem.password) })