// import {createRouter} from "vue-router"
import { createRouter, createWebHistory } from "vue-router/dist/vue-router"
// import store from '../store.js'
import MainPage from "@/pages/MainPage"
import RegisterPage from "@/pages/RegisterPage"
import LoginPage from "@/pages/LoginPage"
import Secure from "@/components/Secure"
import Products from "@/components/Products/Products"

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
  {
    path: '/secure',
    name: "Secure",
    component: Secure,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products',
    name: "Products",
    component: Products
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (this.$store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router