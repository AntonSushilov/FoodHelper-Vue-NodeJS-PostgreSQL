// import Vue from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
// import requestApi from '../../utils/requestApi.js';

// Vue.use(Vuex)

const store = createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    userId: localStorage.getItem('userId') || '',
    products: [],
    dishes: []
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
      state.userId = payload.user.id
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    // mutations for product
    get_products(state, products) {
      state.products = products
    },
    delete_product(state, product) {
      state.products = state.products.filter(el => Number(el.id) !== Number(product.id))
    },
    update_product(state, product) {
      state.products = [...state.products.filter(el => Number(el.id) !== Number(product.id)), product].sort((a, b) => Number(a.id) - Number(b.id))
    },
    post_product(state, product) {
      state.products = [...state.products, product].sort((a, b) => Number(a.id) - Number(b.id))
    },
    // mutations for dish
    get_dishes(state, dishes) {
      state.dishes = dishes
    },
    delete_dish(state, dish) {
      state.dishes = state.dishes.filter(el => Number(el.id) !== Number(dish.id))
    },
    update_dish(state, dish) {
      state.dishes = [...state.dishes.filter(el => Number(el.id) !== Number(dish.id)), dish].sort((a, b) => Number(a.id) - Number(b.id))
    },
    post_dish(state, dish) {
      state.dishes = [...state.dishes, dish].sort((a, b) => Number(a.id) - Number(b.id))
    },
  },
  actions: {
    // actions for auth
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://127.0.0.1:5000/api/auth/signIn', data: user, method: 'POST' })
          .then(resp => {
            if (resp.data.success) {
              const token = resp.data.token
              const user = resp.data.user
              localStorage.setItem('token', token)
              localStorage.setItem('userId', user.id)
              axios.defaults.headers.common['Authorization'] = token
              console.log("tyt", token, user)
              commit('auth_success', {token, user})
              resolve(resp)
            } else {
              alert(resp.data.message)
            }
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://127.0.0.1:5000/api/auth/signUp', data: user, method: 'POST' })
          .then(resp => {
            if (resp.data.success) {
              const token = resp.data.token
              const user = resp.data.user
              localStorage.setItem('token', token)
              localStorage.setItem('userId', user.id)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', {token, user})
              resolve(resp)
            } else {
              alert(resp.data.message)
            }

          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    // action for product
    get_products({ commit }) {
      axios({ url: 'http://127.0.0.1:5000/api/products', method: 'GET' })
        .then(res => commit("get_products", res.data.productsList));
    },
    delete_product({ commit }, id) {
      axios({ url: 'http://127.0.0.1:5000/api/products/' + id, method: 'DELETE' })
        .then(res => commit("delete_product", res.data.product));
    },
    update_product({ commit }, product) {
      axios({ url: 'http://127.0.0.1:5000/api/products', data: product, method: 'PUT' })
        .then(res => commit("update_product", res.data.product));
    },
    post_product({ commit }, product) {
      axios({ url: 'http://127.0.0.1:5000/api/products', data: product, method: 'POST' })
        .then(res => commit("post_product", res.data.product));
    },
    // action for dish
    get_dishes({ commit }) {
      axios({ url: 'http://127.0.0.1:5000/api/dishes', method: 'GET' })
        .then(res => commit("get_dishes", res.data.dishesList));
    },
    delete_dish({ commit }, id) {
      axios({ url: 'http://127.0.0.1:5000/api/dishes/' + id, method: 'DELETE' })
        .then(res => commit("delete_dish", res.data.dish));
    },
    update_dish({ commit }, dish) {
      axios({ url: 'http://127.0.0.1:5000/api/dishes', data: dish, method: 'PUT' })
        .then(res => commit("update_dish", res.data.dish));
    },
    post_dish({ commit }, dish) {
      axios({ url: 'http://127.0.0.1:5000/api/dishes', data: dish, method: 'POST' })
        .then(res => commit("post_dish", res.data.dish));
    },
  },
  getters: {
    // getters for auth
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userId: state => state.userId,
    // getters for product
    products: state => state.products,
    // getters for dish
    dishes: state => state.dishes,
  }
})

export default store