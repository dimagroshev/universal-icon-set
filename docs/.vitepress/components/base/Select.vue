<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<template>
  <select :id="id" :name="id" class="select" v-model="value">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.select {
  appearance: none;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  background: var(--color-picker-bg, var(--vp-c-bg));
  font-size: 14px;
  padding: 0 8px;
  width: 100%;
  height: 34px;
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
}

.select:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}
</style>
