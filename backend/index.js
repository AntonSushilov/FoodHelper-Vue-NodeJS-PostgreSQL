import express from "express"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
const PORT = 5000

const app = express()
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', productRouter)
app.get('/', (req, res) => {
  res.status(200).json("Сервер работает!")
})

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`Server running on http:/127.0.0.1:${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

startApp()