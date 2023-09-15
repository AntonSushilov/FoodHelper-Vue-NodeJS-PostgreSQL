<template>
  <div class="container">
    <div class="container__header">
      <h2>Страница с продуктами</h2>
      <MyButton size="sm" type="success" @click="(e) => showModal(e)">Добавить продукт</MyButton>
    </div>

    <table class="products">
      <colgroup>
        <col width="40" />
        <col width="70" />
        <col width="70" />
        <col width="70" />
        <col width="70" />
        <col width="35" />
        <col width="35" />
        <col width="35" />
        <col width="35" />
        <col width="30" />
      </colgroup>
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
          <td>
            <div class="icons">
              <img class="icon" @click="(e) => deleteProduct(e, item.id)"
                :src="require('@/assets/icons/trash-can-regular.svg')" />
              <img class="icon" @click="(e) => showModal(e, item)"
                :src="require('@/assets/icons/pen-to-square-regular.svg')" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <Modal :show="isShowModal" @close="closeModal">
      <template #header>
        <h3>Редактирование продукта</h3>
      </template>
      <template #body>
        <form class="modal__form">
          <div class="form__row">
            <div class="row__title">Название:</div>
            <MyInput type="text" required v-model="selectedProduct.title" size="sm" placeholder="Введите название..." />
          </div>
          <div class="form__row">
            <div class="row__title">Описание:</div>
            <MyInput type="text" required v-model="selectedProduct.info" size="sm" placeholder="Введите описание..." />
          </div>
          <div class="form__row">
            <div class="row__title">Характеристики:</div>
            <MyInput type="text" required v-model="selectedProduct.properties" size="sm"
              placeholder="Введите характеристики..." />
          </div>
          <div class="form__row">
            <div class="row__title">Состав:</div>
            <MyInput type="text" required v-model="selectedProduct.composition" size="sm"
              placeholder="Введите состав..." />
          </div>
          <div class="form__row">
            <div class="row__title">Ккал:</div>
            <MyInput type="number" required min="0" step=".01" v-model="selectedProduct.kcal" size="sm"
              placeholder="Введите Ккал..." />
          </div>
          <div class="form__row">
            <div class="row__title">Белок:</div>
            <MyInput type="number" required min="0" step=".01" v-model="selectedProduct.protein" size="sm"
              placeholder="Введите белок..." />
          </div>
          <div class="form__row">
            <div class="row__title">Жир:</div>
            <MyInput type="number" required min="0" step=".01" v-model="selectedProduct.fat" size="sm"
              placeholder="Введите жир..." />
          </div>
          <div class="form__row">
            <div class="row__title">Углеводы:</div>
            <MyInput type="number" required min="0" step=".01" v-model="selectedProduct.carbonhydragete" size="sm"
              placeholder="Введите углеводы..." />
          </div>
          <div class="form__buttons">
            <MyButton v-if="typeModal === 'view'" size="sm" type="success" @click="(e) => saveProduct(e)">Сохранить
            </MyButton>
            <MyButton v-else-if="typeModal === 'new'" typeButton="submit" size="sm" type="info"
              @click="(e) => sendProduct(e)">Отправить</MyButton>
          </div>
        </form>
      </template>
      <template #footer>
        <div></div>
        <!-- <h3>Редактирование продукта</h3> -->
      </template>
    </Modal>
  </Teleport>
</template>

<script>
import Product from "@/components/Products/Product.vue";
import Modal from '@/components/Modal/Modal.vue'
// import { ref } from 'vue'

// const showModal = ref(false)
export default {
  name: "Products",
  components: {
    Product,
    Modal
  },
  data() {
    return {
      isShowModal: false,
      typeModal: '',
      selectedProduct: {},
    }
  },
  methods: {
    deleteProduct(e, id) {
      // console.log(e, id)
      this.$store.dispatch('delete_product', id)
    },
    showModal(e, item) {
      this.isShowModal = true
      if (item) {
        this.typeModal = 'view'
        this.selectedProduct = structuredClone(item)
      }
      else {
        this.typeModal = 'new'
        this.selectedProduct = {}
      }
    },
    closeModal() {
      this.isShowModal = false
      this.selectedProduct = {}
    },
    saveProduct(e) {
      e.preventDefault();
      this.$store.dispatch("update_product", this.selectedProduct)
      this.closeModal()
    },
    sendProduct(e) {
      e.preventDefault();
      this.$store.dispatch("post_product", this.selectedProduct)
    }
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
.container__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.products {
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  border-collapse: collapse;
  table-layout: fixed;
}

.products td,
th {
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

.icons {
  display: flex;
  flex-direction: row;
  gap: 10px;

}

.icon {
  height: 24px;
  cursor: pointer;
}

.modal__form {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form__row {
  display: grid;
  grid-template-columns: 150px 1fr;
}

.row__title {
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

.form__buttons {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
</style>