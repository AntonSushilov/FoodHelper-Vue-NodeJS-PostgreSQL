<template lang="">
  <div class="login">
    <div class="content">
      
    <form class="login__form">
      <h1>Вход</h1>
      <MyInput type="text" placeholder="Введите почту..."/>
      <MyInput type="password" placeholder="Введите пароль..."/>
      <MyButton type="success">Вход</MyButton>
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
  name: "LoginPage"
}
</script>
<style scoped>
.login{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .content{
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .logo{
    width: 450px;
  }
  .logo img{
    height: 100%;
    width: 100%;
    object-fit: contain;
    /* transform: scale(-1, 1) */
  }

  .login__form{
    width: 450px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 90px;

  }

</style>