<template lang="ru">
  <header class="header">
    <!-- Header -->
    <div class="container">
      <div class="logo" @click="($event) =>redirect($event, 'Home')">
        <div class="logo-title">
          FoodHelper
        </div>
        <div class="logo-img">
          <img :src="require('@/assets/logo.png')"/>
          <!-- logo-img -->
        </div>
        
      </div>


      <nav class="navbar">
        <router-link to="/products">Продукты</router-link>
        <router-link to="/dishes">Блюда</router-link>
      </nav>
      <!-- <div v-if="isAuth">Вы авторизованы</div> -->
        <!-- <div v-else class="buttons"> -->
        <div v-if="isLoggedIn" class="buttons">
          <!-- <span>Logout</span> -->
          <MyButton type="info" size="sm" @click="logout">Выход</MyButton>

        </div>
        <div v-else class="buttons">
          <MyButton type="success" size="sm" @click="($event) => redirect($event, 'Register')">Регистрация</MyButton>
          <MyButton type="info" size="sm" @click="($event) => redirect($event, 'Login')">Вход</MyButton>
        </div>
      
    </div>
  </header>
</template>
<script>
import router from "@/router/router"

export default {
  name: "AppHeader",
  components: {

  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  methods: {
    redirect: (e, to) => {
      // this.$emit('click', e);
      router.push({ name: to })
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: "Login" })
        })
    },
    click: (e) => {
      console.log('click')
    }
  }
}
</script>
<style scoped>
.header {
  display: grid;
  grid-area: header;
  grid-template-columns: auto 1200px auto;
  grid-template-rows: 100%;
  grid-template-areas:
    ". header .";
  box-shadow: 0px 10px 10px 0px rgba(34, 60, 80, 0.2);
  /* background-color: greenyellow; */

}

.container {
  grid-area: header;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: aliceblue; */
  align-items: center;

}

.logo {
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  cursor: pointer;
}

.logo-img {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-img img {
  height: 80%;
  /* align-items: center; */
  /* vertical-align: middle; */
}

.logo-title {
  font-size: 30px;
  font-weight: 900;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 220px;
}

.navbar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
}
</style>