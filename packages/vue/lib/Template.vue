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
  secondColor: {
    type: String,
    default: '#BABDCC'
  },
  strokeWidth: {
    type: Number,
    default: 2
  },
  sharp: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <template v-if="sharp">
    {SVG_SHARP}
  </template>
  <template v-else>
    {SVG}
  </template>
</template>
