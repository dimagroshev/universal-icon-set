<script setup>
  import { ref, watch } from 'vue';
  import RangeSlider from '../base/RangeSlider.vue';
  import InputField from '../base/InputField.vue';
  import ColorPicker from '../base/ColorPicker.vue';
  import Checkbox from '../base/Checkbox.vue';
  import Select from '../base/Select.vue';

  const emit = defineEmits(['changeStrokeWidth', 'changeSize', 'changeColor', 'changeSharp', 'changeType']);

  const size = ref(24);
  const strokeWidth = ref(2);
  const color = ref('currentColor');
  const secondColor = ref('#BABDCC');
  const sharp = ref(false);
  const type = ref('Line');

  watch(strokeWidth, (value) => {
    emit('changeStrokeWidth', value);
  });

  watch(size, (value) => {
    emit('changeSize', value);
  });

  watch(color, (value) => {
    emit('changeColor', value);
  });

  watch(secondColor, (value) => {
    emit('changeSecondColor', value);
  });

  watch(sharp, (value) => {
    emit('changeSharp', value);
  });

  watch(type, (value) => {
    emit('changeType', value);
  });
</script>

<template>
  <div class="settings">
    <h2 class="settings__title">Settings</h2>

    <InputField
      id="icon-type"
      label="Type"
    >
      <template #display>
        <Select
          v-model="type"
          :options="[
            { label: 'Line', value: 'Line' },
            { label: 'Solid', value: 'Solid' },
            { label: 'Duotone', value: 'Duotone' }
          ]"
          id="icon-type"
        />
      </template>
    </InputField>

    <InputField
      id="icon-color"
      label="Color"
    >
      <template #display>
        <div class="colors">
          <ColorPicker v-model="color" id="icon-color"/>
          <ColorPicker v-if="type === 'Duotone'" v-model="secondColor" id="icon-second-color"/>
        </div>
      </template>
    </InputField>

    <InputField
      id="stroke-width"
      label="Stroke width"
    >
      <template #display>
        <span>{{ strokeWidth }}px</span>
      </template>
      <RangeSlider
        id="stroke-width"
        name="stroke-width"
        v-model="strokeWidth"
        :min="0.5"
        :max="3"
        :step="0.25"
      />
    </InputField>

    <InputField
      id="size"
      label="Size"
    >
      <template #display>
        <span>{{ size }}px</span>
      </template>
      <RangeSlider
        id="size"
        name="size"
        v-model="size"
        :min="16"
        :max="48"
        :step="1"
      />
    </InputField>

    <Checkbox
      v-model="sharp"
      label="Sharp"
      id="sharp"
    />
  </div>
</template>

<style scoped>
.settings {
  padding: 20px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 5px;
}

.colors {
  display: flex;
  gap: 8px;
}

.colors > * {
  flex: 1;
}
</style>
