<template>
  <div>
    Dish
    {{ item.title }}
  </div>
</template>

<script>
export default {
  name: "Dish",
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