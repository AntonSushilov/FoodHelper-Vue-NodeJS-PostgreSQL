<template>
  <select @input="updateInput" :value="modelValue" :class="class">
    <option v-for="(el, index) in options" :value=el.value >{{ el.text }}</option>
  </select>
</template>
<script>
export default {
  name: "MySelect",
  props: {
    type: String,
    size: String,
    placeholder: String,
    disabled: Boolean,
    required: Boolean,
    options: [Object],
    modelValue: [String, Number]
  },
  data() {
    const classInput = `${this.size}`;
    return {
      class: classInput
    }
  },
  methods: {
    updateInput(e) {
      let value = e.target.value
      if(Number(value)){
        value = Number(value)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
<style scoped>
select {
  outline: none;
  width: 100%;
  padding: 10px 20px;
  /* border: none; */
  border-radius: 5px;
  border: 2px solid #a2a1a1;
  background-color: #ffffff;
  border-radius: 5px;
  font-size: 22px;
}

select:focus {
  border: 2px solid #7dbe38;
}
select:disabled {
  cursor: not-allowed;

  /* font-size: 50px; */
}
.sm {
  font-size: 16px;
}

.lg {
  font-size: 28px;
}
</style>