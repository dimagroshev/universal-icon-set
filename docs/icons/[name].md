---
layout: doc
footer: false
aside: false
editLink: false
next: false
prev: false
sidebar: true
---

<script setup>
import { useData } from 'vitepress'
import IconPreview from '../.vitepress/components/Icons/IconPreview.vue'

const { params } = useData()
</script>

# {{ params.name }} <Badge v-if="!params.isFree" type="tip" text="PRO" />

<div class="icon-preview-block">
  <IconPreview :name="params.name" />

  ::: code-group

  ```jsx-vue [React]
  import { {{ params.name }} } from '@123done/universal-icon-set-react';

  const App = () => {
    return (
      <{{ params.name }} />
    );
  };

  export default App;
  ```

  ```vue-vue [Vue 3]
  <script setup>
  import { {{ params.name }} } from '@123done/universal-icon-set-vue';
  </script>

  <template>
    <{{ params.name }} />
  </template>
  ```

  ```vue-vue [Vue 2]
  <script>
  import { {{ params.name }} } from '@123done/universal-icon-set-vue2';

  export default {
    components: {
      {{ params.name }}
    }
  }
  </script>

  <template>
    <{{ params.name }} />
  </template>
  ```

  :::
</div>

## Props

| name                  | type      | default      | description |
| --------------------- | --------- | ------------ | ----------- |
| `size`                | *number*  | 24           | Size of the icon on px |
| `color`               | *string*  | currentColor | Color of the icon |
| `secondColor`         | *string*  | #BABDCC      | Second color for duotone icon |
| `strokeWidth`         | *number*  | 2            | Stroke width of the icon |
| `sharp`               | *boolean* | false        | Whether the icon should be sharp or rounded |

<style>
  .icon-preview-block {
    display: flex;
    margin-top: 40px;
    gap: 40px;
  }

  .icon-preview-block .vp-code-group {
    margin: 0;
    flex: 1;
  }
</style>
