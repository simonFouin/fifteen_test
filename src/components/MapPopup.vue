<template>
  <v-card>
    <template v-slot:title>
      <div class="popup-head popup-flex" :class="stateInfos.color">
        <v-icon
          :title="bike.in_order ? ServiceStatus[bike.service_status] : 'maintenance'"
          class="popup-state">
          {{ stateInfos.icon }}
        </v-icon>
        <h3 class="popup-title">Bike {{ bike.serial_number }}</h3>
      </div>
    </template>

    <v-card-text>
      <div
        :title="`${bike.battery_level}%`"
        class="popup-battery popup-flex">
        <v-icon>{{ batteryIcon }}</v-icon>
        <v-progress-linear
          :model-value="bike.battery_level"
          background-color="pink lighten-3"
          :color="batteryColor"
          height="8"
          striped
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Bike, { ServiceStatus } from '@/interface/Bike';

interface MapPopupProps {
  bike: Bike;
}
const { bike } = defineProps<MapPopupProps>();

const stateInfos = computed<{ color: string, icon: string }>(() => {
  if (!bike.in_order) {
    return {
      color: 'red',
      icon: 'mdi-alert',
    };
  }
  switch (bike.service_status) {
    case 1:
      return {
      color: 'green',
      icon: 'mdi-comment-check',
    };
    case 2:
      return {
      color: 'orange',
      icon: 'mdi-lock',
    };
    default:
      return {
      color: 'red',
      icon: 'mdi-bicycle',
    };
  };
});

const batteryColor = computed(() => {
  if (bike.battery_level > 70) {
    return 'green';
  }
  return bike.battery_level > 35 ? 'orange' : 'red';
});

const batteryIcon = computed(() => {
  const roundedBattery = Math.round( bike.battery_level / 10) * 10;
  if (roundedBattery === 0) {
    return 'mdi-battery-outline';
  }
  return roundedBattery >= 100 ? 'mdi-battery' : `mdi-battery-${roundedBattery}`;
});
</script>

<style lang="scss" scoped>
:deep(.v-card-item) {
  padding: 0;
  margin-bottom: 1rem;
}

.popup-flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.popup-head {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  .mdi-bicycle::before {
    z-index: 2;
  }
  .mdi-bicycle:after {
    position: absolute;
    content: "\00d7";
    font-size: 2.5rem;
    opacity: 0.7;
    z-index: 1;
  }

  &.green {
    background-color: green;
  }
  &.orange {
    background-color: orange;
  }
  &.red {
    background-color: red;
  }
}

</style>
