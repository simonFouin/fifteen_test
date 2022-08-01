<template>
  <ModalLayout
    :title="`Delete bike ${bike.serial_number}`"
    @validate="validate()"
    @close="$emit('close')"
  >
    <template #content>
      Are you sure you want to delete bike {{ bike.serial_number }}
    </template>
  </ModalLayout>
</template>

<script lang="ts" setup>
import Bike from '@/interface/Bike';
import { deleteBike } from '@/services/BikeApi';
import ModalLayout from '@/components/Modal/ModalLayout.vue';

interface DeleteBikeProps {
  bike: Bike
}
const props = defineProps<DeleteBikeProps>();
const emits = defineEmits(['close']);

const validate = () => {
  deleteBike(props.bike.id);
  emits('close');
};
</script>

