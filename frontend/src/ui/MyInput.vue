<template lang="ru">
  <input class="input"
  :class="class"
  :type="type"
  :placeholder="placeholder"
  :disabled="disabled"
  :required="required"
  :value="modelValue"
  @input="updateInput"
  />
</template>
<script>
export default {
  name: "MyInput",
  props: {
    type: String,
    size: String,
    placeholder: String,
    disabled: Boolean,
    required: Boolean,
    modelValue: [String, Number]
  },
  data() {
    const classInput = `${this.size}`;
    return {
      class: classInput
    }
  },
  methods: {
    updateInput(e){
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
<style scoped>
input {
  outline: none;
  width: 100%;
  padding: 10px 20px;
  /* margin: 5px; */
  border: 2px solid #a2a1a1;
  border-radius: 5px;
  font-size: 22px;

}
input:focus {
  border: 2px solid #7dbe38;
}
input:disabled {
  cursor: not-allowed;

  /* font-size: 50px; */
}
input[type=text]:focus {
}
.sm {
  font-size: 16px;
}

.lg {
  font-size: 28px;
}

</style>