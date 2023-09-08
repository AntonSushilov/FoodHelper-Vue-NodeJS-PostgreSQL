<template lang="">
  <div>
    <h1>Добро пожаловать на сайт FoodHelper {{ count }}</h1>
    {{ info }}
  </div>
</template>
<script>

import axios from "../../utils/requestApi.js";

export default {
  name: "MainPage",
  data() {
    return {
      count: 10,
      info: null
    }
  },
  mounted() {
    axios
      .get('/users')
      .then(res => (this.info = res.data));
  }
}
</script>
<style scoped></style>