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
        navbar
      </nav>
      <div class="buttons">
        <MyButton type="success" size="sm" @click="($event) =>redirect($event, 'Register')">Регистрация</MyButton>
        <MyButton type="info" size="sm" @click="($event) =>redirect($event, 'Login')">Вход</MyButton>
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
  methods: {
    redirect: (e, to) => {
      // this.$emit('click', e);
      router.push({ name: to })
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
  background-color: greenyellow;

}

.container {
  grid-area: header;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: aliceblue;
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
.buttons{
  display: flex;
  flex-direction: row;
  gap: 10px;
}

</style>