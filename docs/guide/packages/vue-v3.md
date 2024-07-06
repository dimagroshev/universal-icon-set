# Vue 3

Implementation icon library for vue applications

::: tip
This version for Vue 3, For Vue 2 go to [@123done/vue2-icons](vue-v2.md)
:::

## Installation

::: code-group

```sh [yarn]
yarn add @123done/universal-icon-set-vue
```

```sh [npm]
npm install @123done/universal-icon-set-vue
```

```sh [pnpm]
pnpm install @123done/universal-icon-set-vue
```

:::

### Example

Additional props can be passed to adjust the icon:

```vue
<script setup>
import { Expand } from '@123done/universal-icon-set-vue';
</script>

<template>
  <Expand
    color="red"
    :size="32"
  />
</template>
```

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
