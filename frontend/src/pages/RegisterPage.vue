<template lang="">
  <div class="register">
    <div class="content">
      <div class="logo">
      <img :src="require('@/assets/logo.png')"/>
    </div>
    <form class="register__form">
      <h1>Регистрация</h1>
      <MyInput type="text" placeholder="Введите почту..."/>
      <MyInput type="password" placeholder="Введите пароль..."/>
      <MyInput type="password" placeholder="Повторите пароль..."/>
      <MyButton type="success">Зарегистрироваться</MyButton>
      <p>У Вас уже есть аккаунт? <router-link to="/login">Вход</router-link></p>
    </form>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "RegisterPage"
}
</script>
<style scoped>
.register{
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
    transform: scale(-1, 1)
  }

  .register__form{
    width: 450px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 90px;

  }
</style>