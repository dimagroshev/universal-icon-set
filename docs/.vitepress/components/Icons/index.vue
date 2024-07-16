<script setup>
  import { ref } from "vue";
  import iconsJson from "../../../../icons/icons-tree.json"; // FIX: path to icons
  import Icon from "./Icon.vue";
  import Settings from "./Settings.vue";

  const size = ref(24);
  const strokeWidth = ref(2);
  const color = ref('currentColor');
  const secondColor = ref('#BABDCC');
  const sharp = ref(false);
  const type = ref('Line');
</script>

<template>
  <div class="icons">
    <div class="icons__wrapper">
      <div v-for="(category, key) in iconsJson" class="icons-category">
        <h2>{{ key }}</h2>
        <div class="icons-category__list">
          <Icon
            v-for="icon in category"
            :icon="icon"
            :strokeWidth="strokeWidth"
            :size="size"
            :color="color"
            :secondColor="secondColor"
            :sharp="sharp"
            :type="type"
          />
        </div>
      </div>
    </div>

    <div class="icons__settings">
      <Settings
        @changeStrokeWidth="value => strokeWidth = value"
        @changeSize="value => size = value"
        @changeColor="value => color = value"
        @changeSecondColor="value => secondColor = value"
        @changeSharp="value => sharp = value"
        @changeType="value => type = value"
      />
    </div>
  </div>
</template>

<style>
.icons {
  display: flex;
  gap: 20px;
}

.icons__wrapper {
  flex: 1;
}

.icons__settings {
  flex: none;
  width: 340px;
}

.icons-category {
  margin-bottom: 2rem;
}

.icons-category h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.icons-category__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
