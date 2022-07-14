<template>
  <div
    id="map"
    class="map-container"
  />
</template>

<script setup lang="ts">
import {
  LngLatLike,
  Map,
} from 'mapbox-gl';
import {
  onMounted,
  ref,
  watch,
} from 'vue';
import Bike from '@/interface/Bike';
import { getAllBike } from '@/services/BikeApi';
import useDarkTheme from '@/composable/darkTheme';
import useMapMarkers from '@/composable/mapMarkers';
import { mapCenter } from '@/constants/mapInfos';
import 'mapbox-gl/dist/mapbox-gl.css';

interface FMapProps {
  //  The map initial center coordinates
  center?: LngLatLike;
}
const props = withDefaults(defineProps<FMapProps>(), {
  center: mapCenter,
});

let map: Map;
const bikes = ref<Bike[]>([]);
const mapMarkers = useMapMarkers();

onMounted(() => {
  map = new Map({
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: props.center,
    zoom: 9,
  });
  mapMarkers.setMap(map);

  // catch already in BikeApi file
  getAllBike().then((bikesData) => {
    if (bikesData) {
      bikes.value = bikesData;
      bikes.value.forEach((bike) => mapMarkers.buildMarkerAndPopup(bike));
    }
  });
});

const { themeName } = useDarkTheme();
watch(themeName, () => {
  if (map) {
    map.setStyle(`mapbox://styles/mapbox/${themeName.value}-v10`);
  }
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

#popupcontainer {
  height: 200px;
  width: 100%;
  z-index: 999;
  background: blue;
  position: absolute;
}
</style>