<script setup>
  import { defineAsyncComponent } from 'vue';

  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    });

  const Icon = defineAsyncComponent(() => import(`../../../node_modules/@123done/universal-icon-set-vue/lib/icons/${props.name}.vue`)); // FIX: path to icons for dynamic import
</script>

<template>
  <div class="icon-preview">
    <Icon :size="250" />
  </div>
</template>

<style>
  .icon-preview {
    width: 250px;
    height: 250px;
    background-color: var(--vp-c-bg-alt);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
</style>
