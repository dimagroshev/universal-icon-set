```vue-vue [Vue 2]
  <script>
  import { {{ params?.name || 'PlayLine' }} } from '@123done/universal-icon-set-vue2';

  export default {
    components: {
      {{ params?.name || 'PlayLine' }}
    }
  }
  </script>

  <template>
    <{{ params?.name || 'PlayLine' }} />
  </template>
```
