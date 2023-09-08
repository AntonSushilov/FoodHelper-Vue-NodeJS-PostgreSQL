<template>
  <div>
    Продукт
    {{ item.title }}
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    item: Object,
  },
  data() {
    return {
    }
  },
  methods: {

  },


}
</script>

<style scoped></style>