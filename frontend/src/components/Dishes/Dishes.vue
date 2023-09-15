<template>
  <div class="container">
    <div class="container__header">
      <h2>Страница с блюдами</h2>
      <MyButton size="sm" type="success" @click="(e) => showModal(e)">Добавить блюдо</MyButton>
    </div>
    <table class="table">
      <colgroup>
        <col width="40" />
        <col width="70" />
        <col width="70" />
        <col width="70" />
        <col width="70" />
        <col width="30" />
      </colgroup>
      <thead>
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Рецепт</th>
          <th>Продукты</th>
          <th style="width: 200px"></th>
        </tr>
      </thead>
      <tbody v-if="dishes.length">
        <tr v-for="(item, indexi) in dishes" :key="item?.id">
          <td>фото</td>
          <td>{{ item?.title }}</td>
          <td>{{ item?.info }}</td>
          <td>{{ item?.recipe }}</td>
          <td>
            <div v-for="(product, indexp) in item?.dish_product" :key="product?.id">
              {{ product?.product?.title }}
              {{ product?.count }}
              {{ product?.unit }}
            </div>
          </td>
          <td>
            <div class="icons">
              <img class="icon" @click="(e) => deleteDish(e, item.id)"
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
    <Modal :show="isShowModal" @close="closeModal">
      <template #header>
        <h3>Редактирование блюда</h3>
      </template>
      <template #body>
        <form class="modal__form">
          <div class="form__row">
            <div class="row__title">Название:</div>
            <MyInput type="text" required v-model="selectedDish.title" size="sm" placeholder="Введите название..." />
          </div>
          <div class="form__row">
            <div class="row__title">Описание:</div>
            <MyTextarea type="text" resize="vertical" required v-model="selectedDish.info" size="sm"
              placeholder="Введите описание..." />
          </div>
          <div class="form__row">
            <div class="row__title">Рецепт:</div>
            <MyTextarea type="text" resize="vertical" required v-model="selectedDish.recipe" size="sm"
              placeholder="Введите рецепт..." />
          </div>
          <div class="form__row">
            <div class="row__title">Продукты:</div>
            <div class="products__form">

              <table class="table">
                <colgroup>
                  <col width="150" />
                  <col width="50" />
                  <col width="50" />
                  <col width="20" />

                </colgroup>
                <thead>
                  <tr>
                    <th>Продукт</th>
                    <th>Количество</th>
                    <th>Ед. изм</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in productsRow">
                    <td>
                      <MySelect :options=products size="sm" v-model="productsRow[index].product_id" />
                    </td>
                    <td>
                      <MyInput type="number" required min="0" step=".01" v-model="productsRow[index].count" size="sm"
                        placeholder="Введите колличество..." />
                    </td>
                    <td>
                      <MySelect :options=unitOptions size="sm" v-model="productsRow[index].unit" />
                    </td>
                    <td class="td__icons">
                      <img class="icon icon--red" @click="(e) => delProduct(e, index)"
                        :src="require('@/assets/icons/minus-solid.svg')" />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="td__icons">
                      <img class="icon icon--green" @click="(e) => addProduct(e)"
                        :src="require('@/assets/icons/plus-solid.svg')" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="products__form__row">
              </div>
            </div>
          </div>
          <div class="form__buttons">
            <MyButton v-if="typeModal === 'view'" size="sm" type="success" @click="(e) => saveDish(e)">Сохранить
            </MyButton>
            <MyButton v-else-if="typeModal === 'new'" typeButton="submit" size="sm" type="info"
              @click="(e) => sendDish(e)">Отправить</MyButton>
          </div>
        </form>
      </template>
      <template #footer>
        <div></div>
      </template>
    </Modal>
  </Teleport>
</template>

<script>
import Dish from "@/components/Dishes/Dish.vue";
import Modal from '@/components/Modal/Modal.vue'
import MySelect from "@/ui/MySelect.vue";
import MyTextarea from "@/ui/MyTextarea.vue";
// import { ref } from 'vue'

// const showModal = ref(false)
export default {
  name: "Dishes",
  components: {
    Dish,
    Modal,
    MySelect,
    MyTextarea
  },
  data() {
    return {
      isShowModal: false,
      typeModal: '',
      selectedDish: {},
      tmp: null,
      unitOptions: [
        { value: "г", text: "г." },
        { value: "кг", text: "кг." },
        { value: "мл", text: "мл." },
        { value: "л", text: "л." },
        { value: "шт", text: "шт." },
        { value: "ч.л", text: "ч.л." },
        { value: "ст.л", text: "ст.л." },

      ],
      productsRow: [
      ]
    }
  },
  methods: {
    deleteDish(e, id) {
      this.$store.dispatch('delete_dish', id)
    },
    showModal(e, item) {
      this.isShowModal = true
      if (item) {
        this.typeModal = 'view'
        console.log("item", item)
        this.selectedDish = structuredClone(item)
        this.productsRow = structuredClone(item.dish_product.map(el=>{
          return {product_id: el.product_id, count: el.count, unit: el.unit}
        }))
      }
      else {
        this.typeModal = 'new'
        this.selectedDish = {}
        this.productsRow = []
      }
    },
    closeModal() {
      this.isShowModal = false
      this.selectedDish = {}
    },
    saveDish(e) {
      e.preventDefault();
      console.log(this.selectedDish)
      if (this.isLoggedIn) {
        if(this.productsRow.find(el => el.product_id === 0)){
          alert("Проверте выбранные продукты!")
          return
        }
        const {id, title, recipe, info} = this.selectedDish

        const newDish = { id, title, recipe, info, author_id: Number(this.userId), products: this.productsRow }
        console.log(newDish)
        this.$store.dispatch("update_dish", newDish)

      } else {
        alert("Сначала авторизуйтесь!")
      }
    },
    sendDish(e) {
      e.preventDefault();
      if (this.isLoggedIn) {
        if(this.productsRow.find(el => el.product_id === 0)){
          alert("Проверте выбранные продукты!")
          return
        }
        const newDish = { ...this.selectedDish, author_id: Number(this.userId), products: this.productsRow }
        console.log(newDish)
        this.$store.dispatch("post_dish", newDish)

      } else {
        alert("Сначала авторизуйтесь!")
      }
    },
    addProduct(e) {
      e.preventDefault();
      this.productsRow = [...this.productsRow, { "product_id": 0, "count": 0, "unit": "г" }]
    },
    delProduct(e, index) {
      e.preventDefault();
      const tmp = structuredClone(this.productsRow)
      const removed = tmp.splice(index, 1)

      this.productsRow = [...tmp]
    },
  },
  mounted() {
    this.$store.dispatch('get_products')
    this.$store.dispatch('get_dishes')

  },
  computed: {
    userId() {
      return this.$store.getters.userId
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    dishes() {
      return this.$store.getters.dishes
    },
    products() {
      return [{ value: 0, text: "Выберите продукт" }, ...this.$store.getters.products.map(el => {
        return { value: Number(el.id), text: el.title }
      })]
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

.table {
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  border-collapse: collapse;
  table-layout: fixed;
}

.table td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  /* padding-top: 12px; */
  /* padding-bottom: 12px; */
  text-align: left;
  background-color: rgb(193, 191, 191);
  /* color: #ffffff; */
}

.table tr:nth-child(even) {
  /* background-color: #f2f2f2; */
}

.table tr:hover {
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
  width: 800px;
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

.td__icons {
  align-items: center;
  text-align: center;
}

.td__icons .icon--red {
  background-color: rgb(250, 108, 108);
  padding: 4px;
  border-radius: 4px;
}

.td__icons .icon--red:hover {
  background-color: red;
}

.td__icons .icon--green {
  background-color: rgb(131, 255, 131);
  padding: 4px;
  border-radius: 4px;
}

.td__icons .icon--green:hover {
  background-color: green;
}
</style>