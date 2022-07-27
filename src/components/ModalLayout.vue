<template>
  <VCard class="modal--card">
    <slot name="title">
      <VCardItem class="modal--head">
        <VCardTitle>
          {{ title }}
        </VCardTitle>
      </VCardItem>
    </slot>

    <VCardItem class="modal--content">
      <VCardText>
        <slot name="content" />
      </VCardText>

      <VCardActions class="modal--actions">
        <slot name="actions">
          <VBtn
            class="modal--validate-btn"
            @click="$emit('validate')"
          >
            Validate
          </VBtn>
          <VBtn
            class="modal--cancel-btn"
            @click="$emit('close')"
          >
            Cancel
          </VBtn>
        </slot>
      </VCardActions>
    </VCardItem>
  </VCard>
</template>

<script lang="ts" setup>
defineEmits(['validate', 'close']);
interface ModalLayoutProps {
  title?: string
}
withDefaults(defineProps<ModalLayoutProps>(), {
  title: '',
});
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

  &--content {
    max-height: 75vh;
    overflow-y: auto;
  }

  &--validate-btn {
    @extend .fif-text-white, .fif-background-secondary;
  }

  &--cancel-btn {
    @extend .fif-text-white, .fif-background-red;
  }
}
</style>