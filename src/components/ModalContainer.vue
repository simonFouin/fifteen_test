<template>
  <div
    v-if="!close"
    class="modal--container"
  >
    <div
      class="modal--background"
      @click="close = true"
    />
    <component
      :is="component"
      v-bind="componentProps"
      @close="close = true"
    />
  </div>
</template>

<script lang="ts" setup>
// TODO find why Component type import don't work inside a componenent
// import { Component } from 'vue';
import { ref } from 'vue';

interface MapPopupProps {
  component: unknown // Componenent type
  componentProps: { [x: string]: unknown }
}
defineProps<MapPopupProps>();

const close = ref(false);
</script>

<style lang="scss" scoped>
.modal--container {
  @extend .inset-0--absolute;
  z-index: 2000;
  display: flex;
}

.modal--background {
  @extend .inset-0--absolute;
  background: rgba(0,0,0,.7);
}
</style>
