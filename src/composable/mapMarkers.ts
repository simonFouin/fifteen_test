import { getCurrentInstance } from 'vue';
import {
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import renderComponent from '@/services/renderComponent';
import Bike from '@/interface/Bike';
import MapPopup from '@/components/MapPopup.vue';

export default function useMapMarkers() {
  let destroyComp: () => void;
  let map: Map;
  const { appContext } = getCurrentInstance();
  const markersAndPopups: Array<{
    bikeId: string
    marker: Marker
    popup: Popup
  }> = [];
  
  const setMap = (mapInstance: Map) => {
    map = mapInstance;
  };

  const buildMarkerAndPopup = (bike: Bike) => {
    if (!map) {
      console.error('map is undefined: use method setMap(mapInstance: Map) to set the map');
      return;
    }

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

  return {
    markersAndPopups,
    setMap,
    buildMarkerAndPopup,
  };
}
