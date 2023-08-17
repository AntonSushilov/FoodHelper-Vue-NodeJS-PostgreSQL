// import {createRouter} from "vue-router"
import { createRouter, createWebHistory } from "vue-router/dist/vue-router"

import MainPage from "@/pages/MainPage"
import RegisterPage from "@/pages/RegisterPage"
import LoginPage from "@/pages/LoginPage"

const routes = [
  {
    path: '/',
    name: "Home",
    component: MainPage
  },
  {
    path: '/register',
    name: "Register",
    component: RegisterPage
  },
  {
    path: '/login',
    name: "Login",
    component: LoginPage
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router