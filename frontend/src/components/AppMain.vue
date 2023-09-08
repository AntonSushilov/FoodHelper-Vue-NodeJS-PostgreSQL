<template>
  <main class="main">
    <div class="container">
      <slot></slot>
      <!-- <MySelect />
      <MyButton size="sm">size zm</MyButton>
      <MyButton>size standart</MyButton>
      <MyButton size="lg">size lg</MyButton>
      <MyButton type="success">type="success"</MyButton>
      <MyButton type="success" size="lg">type="success"</MyButton>
      <MyButton type="danger">type="danger"</MyButton>
      <MyButton type="info">type="info"</MyButton>
      <MyButton type="info" disabled>type="info" disabled="true"</MyButton>
      <MyInput type="text" placeholder="Placeholder" size="sm"/>
      <MyInput type="text"/>
      <MyInput type="text" size="lg" disabled/>
      <MyInput type="password"/>
      <MyTextarea/>
      <MyTextarea resize="none"/>
      <MyTextarea resize="vertical"/>
      <MyTextarea resize="vertical" size="lg"/>
      <MyTextarea resize="vertical" size="sm"/> -->
    </div>
    
  </main>
</template>
<script>
import MyButton from "@/ui/MyButton.vue";
import MyInput from "@/ui/MyInput.vue";
import MyTextarea from "@/ui/MyTextarea.vue";
import MySelect from "@/ui/MySelect.vue";

export default {
  name: "AppMain",
  components: {
    MyButton,
    MyInput,
    MyTextarea,
    MySelect
  }
}
</script>
<style scoped>
.main {
  padding-top: 12px;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
  grid-area: main;
  display: grid;
  grid-template-columns: auto 1200px auto;
  grid-template-rows: 1fr;
  grid-template-areas:
    ". main-content .";
  /* background-color: aqua; */
}

.container {
  grid-area: main-content;
  /* background-color: rgb(48, 230, 169); */
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>