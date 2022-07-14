declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<PropsOrPropOptions, RawBindings, D>;
  export default component;
}

declare type ResponseData<T> = Response & { data: T };
