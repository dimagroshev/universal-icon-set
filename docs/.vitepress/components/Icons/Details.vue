<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  icon: {
    type: Object,
    required: true
  },
});

const Icon = defineAsyncComponent(() => import(`../../../node_modules/@123done/universal-icon-set-vue/lib/icons/${icon.name}.vue`)); // FIX: path to icons for dynamic import
</script>

<template>
  <div class="icon-details">
    <button class="icon-details__close">Close</button>
    {{ icon.name }}
  </div>
</template>

<style>
.icon-details {
  width: 100%;
  height: var(--details-height);
  background-color: var(--vp-c-bg-elv);
  padding: 20px;
  box-shadow: var(--vp-shadow-5);
  border-top-right-radius: 8px;
  position: relative;
}
.icon-details__close {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 20px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--vp-c-gray-3);
  }
}
</style>
