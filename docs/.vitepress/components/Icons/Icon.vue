<script setup>
  import { computed, defineAsyncComponent, shallowRef, watchEffect } from 'vue';
  import {useRouter} from 'vitepress';

  const { go } = useRouter()

  const props = defineProps({
    icon: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'Line'
    }
  });

  const mainIcon = computed(() => {
    if(props.icon) {
      return props.icon.find((i) => i.type === props.type);
    } else {
      return null;
    }
  });

  const asyncComponent = shallowRef(null);

  watchEffect(() => {
    asyncComponent.value = defineAsyncComponent(() =>
      import(`../../../node_modules/@123done/universal-icon-set-vue/lib/icons/${mainIcon.value.name}.vue`) // FIX: path to icons for dynamic import
        .catch(error => {
          console.error("Не удалось загрузить компонент", error);
        })
    );
  });
</script>

<template>
  <button class="icon" @click="go(`/icons/${mainIcon.name}`)">
    <component :is="asyncComponent" />
    <div class="icon__tooltip">
      {{ mainIcon.name }}
    </div>
  </button>
</template>

<style>
.icon {
  width: 56px;
  height: 56px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--vp-c-gray-3);
  }
}

.icon__tooltip {
  opacity: 0;
  position: absolute;
  z-index: -1;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  background-color: var(--vp-c-brand-3);
  padding: 0 0.5em;
  border-radius: 3px;
  font-size: 12px;
}

.icon:hover .icon__tooltip {
  z-index: 1;
  opacity: 1;
}
</style>
