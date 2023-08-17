<template lang="ru">
  <div class="app">
    <AppHeader />
    <AppMain>
      <router-view></router-view>
    </AppMain>
    <AppFooter />
    <!-- <header/> -->
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppMain from "@/components/AppMain.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  /* overflow: hidden; */
  /* scrollbar-gutter: stable; */
  /* position: relative; */
  /* scrollbar-gutter: stable both-edges; */
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px auto 40px;
  grid-template-areas:
    "header"
    "main"
    "footer";
  background-color: rgb(231, 238, 194);
}

::-webkit-scrollbar {
  width: 14px;
  height: 14px;
  background-color: #e2e1e1;
}

::-webkit-scrollbar-thumb {
  background-color: greenyellow;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(138, 222, 12);
}
</style>