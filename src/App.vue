<template>
  <VApp>
    <VAppBar color="primary">
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
</template>

<script setup lang="ts">
import useDarkTheme from '@/composable/darkTheme';
import FMap from '@/components/FMap.vue';
import logo from '@/assets/fifteen-logo-text.svg';

const { themeIcon, toggleTheme } = useDarkTheme();

</script>

<style lang="scss" scoped>
.app-bar{
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
