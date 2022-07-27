import renderComponent from '@/services/renderComponent';
import { Component, getCurrentInstance, onBeforeUnmount } from 'vue';
import ModalContainer from '@/components/ModalContainer.vue';

export default function useModal() {
  const element = document.getElementById('modal');
  const { appContext } = getCurrentInstance();

  let destroyModal: () => void;

  const renderModal = (component: Component, props: { [x:string]: unknown }) => {
    destroyModal?.();
    destroyModal = renderComponent({
      el: element as HTMLElement,
      component: ModalContainer,
      props: {
        component,
        componentProps: props,
      },
      appContext,
    });
  };

  onBeforeUnmount(() => destroyModal?.());

  return {
    renderModal,
  };
};
