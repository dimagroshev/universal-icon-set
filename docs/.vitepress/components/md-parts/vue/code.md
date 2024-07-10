```vue-vue [Vue 3]
  <script setup>
  import { {{ params?.name || 'PlayLine' }} } from '@123done/universal-icon-set-vue';
  </script>

  <template>
    <{{ params?.name || 'PlayLine' }} />
  </template>
```
