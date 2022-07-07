<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Fifteen</v-app-bar-title>
      <v-icon @click="toggleTheme()">
        mdi-{{ isDark ? 'white-balance-sunny' : 'moon-waning-crescent' }}
      </v-icon>
    </v-app-bar>
    <v-main>
      <FMap
        :center="mapCenter"
      />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify'
import { LngLatLike } from "mapbox-gl";
import FMap from '@/components/FMap.vue';

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark)
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark';
};

const mapCenter: LngLatLike = { lat: 48.864716, lng: 2.349014 };
</script>
