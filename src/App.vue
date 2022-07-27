<template>
  <VApp>
    <VAppBar
      class="app-bar--container"
      :class="isThemeDark ? 'dark' : 'light'"
    >
      <VAppBarTitle class="app-bar--title">
        <v-img
          :src="logo"
          class="app-bar--title-logo"
        />
      </VAppBarTitle>
      <VIcon @click="toggleTheme()">
        {{ themeIcon }}
      </VIcon>
    </VAppBar>
    <VMain>
      <FMap />
    </VMain>
  </VApp>
  <div id="modal" />
</template>

<script setup lang="ts">
import useDarkTheme from '@/composable/darkTheme';
import FMap from '@/components/FMap.vue';
import logo from '@/assets/fifteen-logo-text.svg';

const { isThemeDark, themeIcon, toggleTheme } = useDarkTheme();

</script>

<style lang="scss" scoped>
.app-bar{
  &--container {
    &.light {
      @extend .fif-background-secondary;
    }
    &.dark {
      @extend .fif-background-tertiary;
    }
  }

  &--title {
    height: 100%;
    position: relative;
  }

  &--title-logo {
    position: absolute;
    width: 15%;
  }
}
</style>
