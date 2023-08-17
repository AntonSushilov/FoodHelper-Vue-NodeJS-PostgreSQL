<template lang="ru">
  <button class="btn"
  :class="class"
  
  :disabled="disabled"
  @click="callback($event)"
  >
  <slot></slot>
  </button>
</template>
<script>
export default {
  name: "MyButton",
  props: {
    type: String,
    size: String,
    disabled: Boolean
  },
  data() {
    const classBtn = `${this.type} ${this.size}`;
    return {
      class: classBtn
    }
  },
  methods: {
    callback: function (e) {
      this.$emit('click', e);
    }
  }
}
</script>
<style scoped>
.btn {
  background-color: #fff;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  box-shadow: 2px 2px 8px 0px rgba(34, 60, 80, 0.2);
  font-size: 22px;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
}

.btn:hover {
  background-color: #cccaca;
  color: #333;
}

.sm {
  font-size: 16px;
}

.lg {
  font-size: 28px;
}

.btn:hover:disabled {
  cursor: not-allowed;
}

.danger {
  background-color: #ff4949;
  color: #fff;
}

.danger:hover {
  background-color: #fb6060;
  color: #fff;
}

.success {
  background-color: #11b65b;
  color: #fff;
}

.success:hover {
  background-color: #13ce66;
  color: #fff;
}

.info {
  background-color: #50bfff;
  color: #fff;
}

.info:hover {
  background-color: #39b3fa;
  color: #fff;
}</style>