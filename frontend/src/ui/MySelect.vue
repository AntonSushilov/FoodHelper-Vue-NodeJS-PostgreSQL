<template>
  <select>
    <option value="au">Australia</option>
    <option value="ca">Canada</option>
    <option value="usa">USA</option>
  </select>
</template>
<script>
export default {
  name: "MySelect"
}
</script>
<style scoped>
select {
  outline: none;
  width: 100%;
  padding: 16px 20px;
  /* border: none; */
  border-radius: 5px;
  border: 2px solid #a2a1a1;
  background-color: #ffffff;
}
select:focus {
  border: 2px solid #7dbe38;
}
</style>