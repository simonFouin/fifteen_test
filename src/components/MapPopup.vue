<template>
  <v-card>
    <template v-slot:title>
      <div class="popup-head popup-flex" :class="headColor">
        <v-icon
          :title="bike.in_order ? ServiceStatus[bike.service_status] : 'maintenance'"
          class="popup-state">
          {{ bike.in_order ? stateIcon : "mdi-alert" }}
        </v-icon>
        <h3 class="popup-title">Bike {{ bike.serial_number }}</h3>
      </div>
    </template>

    <v-card-text>
      <div
        :title="`${bike.battery_level}%`"
        class="popup-battery popup-flex">
        <v-icon>mdi-battery-{{ Math.round(bike.battery_level / 10) * 10 }}</v-icon>
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
  //  The map initial center coordinates
  bike: Bike;
}
const { bike } = defineProps<MapPopupProps>();

const headColor = computed(() => {
  if (!bike.in_order) {
    return 'red';
  }
  switch (bike.service_status) {
    case 1:
      return 'green';
    case 2:
      return 'orange';
    default:
      return 'red';
  };
});

const stateIcon = computed(() => {
  switch (bike.service_status) {
    case 1:
      return 'mdi-comment-check';
    case 2:
      return 'mdi-lock';
    default:
      return 'mdi-bicycle';
  };
})

const batteryColor = computed(() => {
  if (bike.battery_level > 70) {
    return "green";
  }
  if (bike.battery_level > 35) {
    return "orange";
  }
  return "red";
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
    opacity: 0.6;
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
