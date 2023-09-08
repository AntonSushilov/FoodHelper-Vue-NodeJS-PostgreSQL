<template>
  <div>
    Страница с продуктами
    <table class="products">
      <thead>
      <tr>
        <th>Фото</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Характеристики</th>
        <th>Состав</th>
        <th>Ккал</th>
        <th>Белок</th>
        <th>Жир</th>
        <th>Углеводы</th>
        <th style="width: 200px"></th>
      </tr>
      </thead>
      <tbody v-if="products.length">
      <tr v-for="(item, index) in products" :key="item.id">
        <td>фото</td>
        <td>{{ item.title }}</td>
        <td>{{ item.info }}</td>
        <td>{{ item.properties }}</td>
        <td>{{ item.composition }}</td>
        <td>{{ item.kcal }}</td>
        <td>{{ item.protein }}</td>
        <td>{{ item.fat }}</td>
        <td>{{ item.carbonhydragete }}</td>
        <!-- <td style="display: flex; gap: 10px; width: 200px">
          <button @click="selectForEdit(question)">Редактировать</button>
          <button @click="deleteQuestion(question._id)">Удалить</button>
        </td> -->
      </tr>
      </tbody>
    </table>
    <!-- <Product v-for="(item, index) in products" :item="item" :index="index" :key="item.id" /> -->
    <!-- {{ products }} -->
  </div>
</template>

<script>
import Product from "@/components/Products/Product.vue";

export default {
  name: "Products",
  components: {
    Product
  },
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('get_products')

  },
  computed: {
    products() {
      return this.$store.getters.products
    }
  }

}
</script>

<style scoped>
.products {
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  border-collapse: collapse;
}

.products td, th {
  border: 1px solid #ddd;
  padding: 8px;
}

.products th {
  /* padding-top: 12px; */
  /* padding-bottom: 12px; */
  text-align: left;
  background-color: rgb(193, 191, 191);
  /* color: #ffffff; */
}

.products tr:nth-child(even) {
  /* background-color: #f2f2f2; */
}

.products tr:hover {
  background-color: #ddd;
}
</style>