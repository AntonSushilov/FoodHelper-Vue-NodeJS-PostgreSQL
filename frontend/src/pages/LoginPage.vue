<template lang="">
  <div class="login">
    <div class="content">
      
    <form class="login__form">
      <h1>Вход</h1>
      <MyInput v-model="email" type="text" placeholder="Введите почту..."/>
      <MyInput v-model="password" type="password" placeholder="Введите пароль..."/>
      <MyButton type="success" :onclick="login">Вход</MyButton>
      <p>Вы еще не зарегистрированы на сайте? <router-link to="/register">Регистрация</router-link></p>
    </form>
    <div class="logo">
      <img :src="require('@/assets/logo.png')"/>
    </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    click(e) {
      e.preventDefault();
      console.log(e)
      console.log(this.email)
      console.log(this.password)

    },
    login(e) {
      e.preventDefault();
      const email = this.email
      const password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
<style scoped>
.login {
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
  /* transform: scale(-1, 1) */
}

.login__form {
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 90px;

}
</style>