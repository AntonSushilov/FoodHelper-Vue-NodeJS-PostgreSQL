<template lang="ru">
  <footer class="footer">
    <div class="container">
      Фуутер
    </div>
    
  </footer>
</template>
<script>
export default {
  name: "AppFooter"
}
</script>
<style scoped>
.footer {
  grid-area: footer;
  display: grid;
  grid-template-columns: auto 1200px auto;
  grid-template-rows: 1fr;
  grid-template-areas:
    ". footer-content .";
  background-color: grey;
}

.container {
  grid-area: footer-content;

  background-color: aliceblue;
}
</style>