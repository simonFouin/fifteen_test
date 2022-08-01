<template>
  <VCard class="popup--container">
    <template #title>
      <div
        class="popup--head popup--flex"
        :class="stateInfos.color"
      >
        <VIcon
          :title="bike.in_order ? ServiceStatus[bike.service_status] : 'maintenance'"
          class="popup--state"
        >
          {{ stateInfos.icon }}
        </VIcon>
        <h3 class="popup--title">
          Bike {{ bike.serial_number }}
        </h3>
      </div>
    </template>

    <VCardText>
      <div
        :title="`${bike.battery_level}%`"
        class="popup--battery popup--flex"
      >
        <VIcon>{{ batteryIcon }}</VIcon>
        <VProgressLinear
          :model-value="bike.battery_level"
          :color="batteryColor"
          height="8"
        />
      </div>
    </VCardText>

    <VCardActions>
      <VBtn
        class="popup--btn popup--btn--edit"
        @click="openEditModal()"
      >
        Edit
      </VBtn>
      <VBtn
        class="popup--btn popup--btn--delete"
        @click="openRemoveModal()"
      >
        Delete
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Bike, { ServiceStatus } from '@/interface/Bike';
import useModal from '@/composable/modal';
import EditBikeModal from '@/components/Modal/EditBikeModal.vue';
import DeleteBikeModal from '@/components/Modal/DeleteBikeModal.vue';

interface MapPopupProps {
  bike: Bike
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
  }
});

const batteryColor = computed(() => {
  if (props.bike.battery_level > 70) return 'green';
  if (props.bike.battery_level > 35) return 'orange';
  return 'red';
});

const batteryIcon = computed(() => {
  const roundedBattery = Math.round( props.bike.battery_level / 10) * 10;
  if (roundedBattery === 0) return 'mdi-battery-outline';
  if (roundedBattery >= 100) return  'mdi-battery';
  return `mdi-battery-${roundedBattery}`;
});

const { renderModal } = useModal();
const openEditModal = () => renderModal(
  EditBikeModal, { bike: props.bike }
);

const openRemoveModal = () => renderModal(
  DeleteBikeModal, { bike: props.bike }
);
</script>

<style lang="scss" scoped>
:deep(.v-card-item) {
  padding: 0;
  margin-bottom: 1rem;
}

.popup {
  &--container {
    pointer-events: auto;
  }

  &--flex {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &--head {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    .mdi-bicycle {
      &:before {
        z-index: 2;
      }
      &:after {
        position: absolute;
        content: "\00d7";
        font-size: 2.5rem;
        opacity: 0.7;
        z-index: 1;
      }
    }

    &.green {
      @extend .fif-background-green;
    }
    &.orange {
      @extend .fif-background-orange;
    }
    &.red {
      @extend .fif-background-red;
    }
  }

  &--btn {
    @extend .fif-text-white;
    flex: 0 1 50%;
    &--edit {
      @extend .fif-background-orange;
    }
    &--delete {
      @extend .fif-background-red;
    }
  }
}
</style>
