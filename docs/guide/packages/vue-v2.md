# Vue 2

Implementation icon library for vue applications

::: tip
This version for Vue 2, For Vue 3 go to [@123done/vue-icons](vue-v3.md)
:::

## Installation

::: code-group

```sh [yarn]
yarn add @123done/universal-icon-set-vue2
```

```sh [npm]
npm install @123done/universal-icon-set-vue2
```

```sh [pnpm]
pnpm install @123done/universal-icon-set-vue2
```

:::

### Example

Additional props can be passed to adjust the icon:

```vue
<template>
  <Expand color="red" :size="32" />
</template>

<script>
  import { Expand } from '@123done/universal-icon-set-vue2';

  export default {
    name: 'My Component',
    components: { Expand }
  };
</script>
```

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
