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
  Marker,
  Popup,
} from 'mapbox-gl';
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
} from 'vue';
import Bike from '@/interface/Bike';
import { getAllBike } from '@/services/BikeApi';
import useDarkTheme from '@/composable/darkTheme';
import renderComponent from '@/services/renderComponent';
import { mapCenter } from '@/constants/mapInfos';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapPopup from '@/components/MapPopup.vue';

interface FMapProps {
  //  The map initial center coordinates
  center?: LngLatLike;
}
const props = withDefaults(defineProps<FMapProps>(), {
  center: mapCenter,
});


let map: Map;
const bikes = ref<Bike[]>([]);
let destroyComp: () => void;
const { appContext } = getCurrentInstance();
const markersAndPopups: Array<{
  bikeId: string
  marker: Marker
  popup: Popup
}> = [];

const buildMarkerAndPopup = (bike: Bike) => {
  const coordinates = bike.coordinates.slice().reverse() as [number, number];
  let popup: Popup;

  // handle bike potential updates
  const markerAndPopup = markersAndPopups.filter(marker => marker.bikeId === bike.id)[0];
  if (markerAndPopup) {
    popup = markerAndPopup.popup;
    popup.setLngLat(coordinates);
    markerAndPopup.marker.setLngLat(coordinates);
  } else {
    popup = new Popup({ closeButton: false })
      .setLngLat(coordinates)
      .setHTML('<div></div>');

    markersAndPopups.push({
      bikeId: bike.id,
      marker: new Marker()
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map),
      popup,
    });
  }
  
  popup.on('open', () => {
    destroyComp?.();
    destroyComp = renderComponent({
      el: popup.getElement(),
      component: MapPopup,
      props: { bike },
      appContext,
    });
  });
};

onMounted(() => {
  map = new Map({
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: props.center,
    zoom: 9,
  });

  // catch already in BikeApi file
  getAllBike().then((bikesData) => {
    if (bikesData) {
      bikes.value = bikesData;
      bikes.value.forEach((bike) => buildMarkerAndPopup(bike));
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