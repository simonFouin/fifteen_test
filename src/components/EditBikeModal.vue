<template>
  <VCard class="modal--card">
    <VCardItem class="modal--head">
      <VCardTitle>{{ title }}</VCardTitle>
    </VCardItem>

    <VCardItem class="edit-form">
      <VCardText>
        <VForm>
          <VContainer class="edit-form--container">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="bikeForm.serial_number"
                  class="edit-form--serial"
                  label="Serial number"
                  required
                />
              </VCol>
              
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  label="Service status"
                  class="edit-form--status"
                  required
                  :items="serviceStatusKeys"
                  :model-value="ServiceStatus[bikeForm.service_status]"
                  @update:model-value="bikeForm.service_status = ServiceStatus[$event]"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="bikeForm.coordinates[0]"
                  class="edit-form--lat"
                  label="Latitude"
                  type="number"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="bikeForm.coordinates[1]"
                  class="edit-form--lng"
                  label="Longitude"
                  type="number"
                  required
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol
                cols="12"
              >
                <div class="edit-form--battery--section">
                  <div class="edit-form--battery--slider--container">
                    <v-subheader class="pl-0">
                      Battery Level
                    </v-subheader>
                    <v-slider
                      v-model="bikeForm.battery_level"
                      class="edit-form--battery--slider--input"
                      label="Battery level"
                      thumb-label="always"
                      :color="batteryColor"
                      :step="1"
                      :min="0"
                      :max="100"
                    />
                  </div>
                  <VTextField
                    v-model="bikeForm.battery_level"
                    class="edit-form--battery--number"
                    type="number"
                    required
                    :min="0"
                    :max="100"
                    width="60px"
                  />
                </div>
              </VCol>
            </VRow>
            <VRow>
              <VCol
                cols="12"
              >
                <VCheckbox
                  v-model="bikeForm.in_order"
                  class="edit-form--order"
                  label="In order"
                />
              </VCol>
            </VRow>
          </VContainer>
        </VForm>
      </VCardText>

      <VCardActions>
        <VBtn
          class="modal--validate-btn"
          @click="validate()"
        >
          Validate
        </VBtn>
        <VBtn
          class="modal--cancel-btn"
          @click="$emit('close')"
        >
          Cancel
        </VBtn>
      </VCardActions>
    </VCardItem>
  </VCard>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Bike, { ServiceStatus } from '@/interface/Bike';
import { putBike } from '@/services/BikeApi';

interface MapPopupProps {
  title: string
  bike: Bike
}
const props = defineProps<MapPopupProps>();
const emits = defineEmits(['close']);

const bikeValue = ref(props.bike);
const bikeForm = ref({ ...props.bike });
const serviceStatusKeys = Object.keys(ServiceStatus).filter(key => !isNaN(Number(ServiceStatus[key])));

const batteryColor = computed(() => {
  if (bikeForm.value.battery_level > 70) return 'green';
  if (bikeForm.value.battery_level > 35) return 'orange';
  return 'red';
});

const validate = () => {
  putBike(bikeForm.value.id, bikeForm.value);
  Object.assign(bikeValue.value, bikeForm.value);
  emits('close');
};
</script>

<style lang="scss" scoped>
.modal {
  &--card {
    width: 100%;
    max-width: 800px;
    margin: auto;
  }
  &--head {
    @extend .fif-background-secondary, .fif-text-white;
  }
}

.edit-form {
  max-height: 75vh;
  overflow-y: auto;

  &--battery {
    &--section {
      display: flex;
    }

    &--slider {
      &--container{
        flex: 0 1 100%;
      }

      &--input {
        :deep(.v-slider-thumb__label-container) {
          left: -8px // TODO find why slider thumb isn't align
        }
      }
    }

    &--number {
      flex: 0 0 60px;
      :deep(.v-field__input) {
        padding: 0;
        text-align-last: center;
      } 
    }
  }
}
</style>
