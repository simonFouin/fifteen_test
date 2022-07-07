<template>
  <div class="map-container" :key="`map-container-with-theme-${currentTheme}`">
    <mapbox-map 
      :accessToken="myAccessToken"
      :mapStyle="currentTheme"
      :center="center"
      :zoom="9">
      <mapbox-marker
        v-for="bike in bikes"
        :key="`marker-${bike.serial_number}`"
        :lngLat="bike.coordinates.slice().reverse()">
        <mapbox-popup>
          <MapPopup :bike="bike"/>
        </mapbox-popup>
      </mapbox-marker>
    </mapbox-map>
  </div>
</template>

<script setup lang="ts">
import { LngLatLike } from "mapbox-gl";
import {
  computed,
  onMounted,
  ref,
} from "vue";
import Bike from '@/interface/Bike';
import BikeApi from '@/services/BikeApi';
import MapPopup from '@/components/MapPopup.vue';
import { useTheme } from 'vuetify';

interface FMapProps {
  //  The map initial center coordinates
  center: LngLatLike;
}
const props = defineProps<FMapProps>();

const myAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const currentTheme = computed(() => {
  return `${useTheme().global.name.value}-v10`;
});

const bikes = ref([] as Bike[]);

onMounted(() => {
  BikeApi.getAll().then((data) => {
    if (data) {
      bikes.value = data;
    }
  });
});
</script>

<style lang="scss" scoped>
.map-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
}

:deep(.mapboxgl-popup-content) {
  padding: 0;
}
</style>