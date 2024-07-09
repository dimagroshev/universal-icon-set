<script setup>
// import { ref } from 'vue';
import iconsJson from "../../../../icons/icons-tree.json"; // FIX: path to icons
import Icon from "./Icon.vue";
// import Details from "./Details.vue";

// const isShowDetails = ref(false);
// const showedIcon = ref(null);

// const showDetails = (icon) => {
//   isShowDetails.value = true;
//   showedIcon.value = icon;
// };
</script>

<template>
  <div class="icons">
    <div class="icons__wrapper">
      <div v-for="(category, key) in iconsJson" class="icons-category">
        <h2>{{ key }}</h2>
        <div class="icons-category__list">
          <Icon :icon="icon" v-for="icon in category" />
        </div>
      </div>
    </div>
    <!-- <div class="icon__details">
      <Transition name="slide-up">
        <Details v-if="isShowDetails && showedIcon" :icon="showedIcon" />
      </Transition>
    </div> -->
  </div>
</template>

<style>
.icons {
  --details-height: 200px;
}

.icons__wrapper {
  padding: 1rem;
  padding-bottom: var(--details-height);
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

/* .icon__details {
  position: fixed;
  top: 0;
  left: var(--left, 0);
  right: var(--right, 0);
  bottom: 0;
  pointer-events: none;
  height: 100%;
  display: flex;
  align-items: flex-end;
  width: auto
}

@media (min-width: 960px) {
  .icon__details {
    --left: var(--vp-sidebar-width)
  }
}

@media (min-width: 1440px) {
  .icon__details {
    --left: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
    --right: calc(((100% - (var(--vp-layout-max-width) - var(--vp-sidebar-width))) - 272px) / 2)
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
} */
</style>
