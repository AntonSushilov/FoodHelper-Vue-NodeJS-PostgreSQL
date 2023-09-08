<template lang="">
  <div class="register">
    <div class="content">
      <div class="logo">
      <img :src="require('@/assets/logo.png')"/>
    </div>
    <form class="register__form" id="register_form">
      <h1>Регистрация</h1>
      <MyInput type="text" required v-model="email" placeholder="Введите почту..."/>
      <MyInput type="password" required v-model="password" placeholder="Введите пароль..."/>
      <MyInput type="password" required v-model="password_confirmation" placeholder="Повторите пароль..."/>
      <MyButton type="submit" :onclick="register">Зарегистрироваться</MyButton>
      <p>У Вас уже есть аккаунт? <router-link to="/login">Вход</router-link></p>
    </form>
    </div>
    
  </div>
</template>
<script>
// import requestApi from '../../utils/requestApi.js';
// import { getCookie } from '../../utils/actionsCookie.js';
export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null
    }
  },
  methods: {
    register(e) {
      e.preventDefault()
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    },

    // register(e) {
    // e.preventDefault();
    // console.log(getCookie("user"))
    // console.log(getCookie("isAuth"))
    // let form = document.getElementById("register_form")
    // let isFromValid = form.checkValidity();
    // if (!isFromValid) {
    //   form.reportValidity();
    // } else {
    //   if (this.user.password != this.user.secondPassword) {
    //     alert("Пароли не совпадают")
    //   } else {
    //     console.log({ ...this.user })
    //     requestApi.post('/auth/signUp', { ...this.user }).then(res => {
    //       if(res.data.success){
    //         console.log(res.data)
    //         document.cookie = `user=${JSON.stringify(res.data.user)}`;
    //         document.cookie = `isAuth=true`;
    //       }
    //     })
    //   }

    // }

    // }
  }
}
</script>
<style scoped>
.register {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.logo {
  width: 450px;
}

.logo img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  transform: scale(-1, 1)
}

.register__form {
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 90px;

}
</style>