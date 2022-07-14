<template>
  <VCard>
    <template v-slot:title>
      <div class="popup-head popup-flex" :class="stateInfos.color">
        <VIcon
          :title="bike.in_order ? ServiceStatus[bike.service_status] : 'maintenance'"
          class="popup-state">
          {{ stateInfos.icon }}
        </VIcon>
        <h3 class="popup-title">Bike {{ bike.serial_number }}</h3>
      </div>
    </template>

    <VCardText>
      <div
        :title="`${bike.battery_level}%`"
        class="popup-battery popup-flex">
        <VIcon>{{ batteryIcon }}</VIcon>
        <VProgressLinear
          :model-value="bike.battery_level"
          :color="batteryColor"
          height="8"
        />
      </div>
    </VCardText>
  </VCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Bike, { ServiceStatus } from '@/interface/Bike';

interface MapPopupProps {
  bike: Bike;
}
const props = defineProps<MapPopupProps>();

const stateInfos = computed<{ color: string, icon: string }>(() => {
  if (!props.bike.in_order) {
    return {
      color: 'red',
      icon: 'mdi-alert',
    };
  }
  switch (props.bike.service_status) {
    case ServiceStatus.free:
      return {
      color: 'green',
      icon: 'mdi-comment-check',
    };
    case ServiceStatus.booked:
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
  if (props.bike.battery_level > 70) {
    return 'green';
  }
  return props.bike.battery_level > 35 ? 'orange' : 'red';
});

const batteryIcon = computed(() => {
  const roundedBattery = Math.round( props.bike.battery_level / 10) * 10;
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
