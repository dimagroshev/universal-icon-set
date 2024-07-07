<template>
  <template v-if="sharp">
    {SVG_SHARP}
  </template>
  <template v-else>
    {SVG}
  </template>
</template>

<script>
export default {
  name: {NAME},
  props: {
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
    }
  }
}
</script>
