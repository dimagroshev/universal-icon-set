<script setup>
// @defineComponentName {NAME}

defineProps({
  size: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  strokeWidth: {
    type: Number,
    default: 2
  }
})
</script>

<template>
  {SVG}
</template>
