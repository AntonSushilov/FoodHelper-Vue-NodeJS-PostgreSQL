<template>
  <Transition name="modal">
    <div v-if="show" class="modal">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
          <img class="icon" @click="$emit('close')" :src="require('@/assets/icons/xmark-solid.svg')" />
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button" @click="$emit('close')">OK</button>
          </slot>
        </div>
      </div>
      <div class="modal-mask" @click="$emit('close')"></div>

    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean
})
</script>

<style>
.modal {
  position: absolute;
  z-index: 9997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow: overlay;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  position: relative;
  z-index: 9999;
  height: fit-content;
  width: fit-content;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  margin-top: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 25px;
  padding: 10px 20px 10px 20px;
  border-radius: 5px 5px 0 0;
  color: #42b983;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.33);
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
}
.icon{
  height: 24px;
  cursor: pointer;
}
.modal-body {
  margin: 0 20px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>