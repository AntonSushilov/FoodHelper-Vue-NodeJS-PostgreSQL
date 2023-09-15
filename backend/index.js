import express from "express"
import cors from "cors"
import authorizationRouter from "./routes/authorization.route.js"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import dishRouter from "./routes/dish.route.js"
const PORT = 5000

const app = express()
app.use(cors({
  origin: ['http://localhost:8080', 'https://localhost:8080']
}));

app.use(express.json())
app.use('/api', authorizationRouter)
app.use('/api', userRouter)
app.use('/api', productRouter)
app.use('/api', dishRouter)
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