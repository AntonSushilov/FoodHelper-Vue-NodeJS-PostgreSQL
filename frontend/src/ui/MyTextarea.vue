<template lang="ru">
  <!-- <input class="input"
  :class="class"
  :type="type"
  :placeholder="placeholder"
  :disabled="disabled"
  @change="callback($event)"
  /> -->
  <textarea 
  :class="class"
  :type="type"
  :placeholder="placeholder"
  :disabled="disabled"
  :rows="rows"
  @change="callback($event)"></textarea>
</template>
<script>
export default {
  name: "MyTextarea",
  props: {
    type: String,
    size: String,
    placeholder: String,
    rows: Number,
    disabled: Boolean,
    resize: String

  },
  data() {
    let classInput = `${this.size}`;
    if (this.resize === "none") {
      classInput = `${classInput} resize-none`
    }else if(this.resize === "vertical"){
      classInput = `${classInput} resize-vertical`
    }
    console.log(classInput, this.resize)
    return {
      class: classInput
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
textarea {
  outline: none;
  width: 100%;
  padding: 10px 20px;
  /* margin: 5px; */
  border: 2px solid #a2a1a1;
  border-radius: 5px;
  font-size: 22px;
}

.resize-none {
  resize: none;
}

.resize-vertical {
  resize: vertical;
}

textarea:focus {
  border: 2px solid #7dbe38;
}

textarea:disabled {
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