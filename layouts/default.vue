<template>
  <div class="app">
    <GeneralHeader class="app__header" />
    <div class="app__view">
      <slot />
    </div>
    <GeneralFooter class="app__footer" />
  </div>
</template>

<script setup>
import GeneralHeader from '~/components/general/GeneralHeader.vue'
import GeneralFooter from '~/components/general/GeneralFooter.vue'
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__header {
    width: 100%;
    flex: 0 0 auto;
  }

  &__view {
    width: 100%;
    flex: 1 0 auto;
  }

  &__footer {
    width: 100%;
    flex: 0 0 auto;
  }
}
</style>
