import { AppContext, Component, createVNode, render, VNode } from 'vue'

interface renderComponentParams {
  el: HTMLElement
  component: Component
  props: {
    [x: string]: unknown
  }
  appContext: AppContext
}

export default function renderComponent({ el, component, props, appContext }: renderComponentParams) {
  let vnode: VNode|undefined = createVNode(component, props)
  vnode.appContext = { ...appContext } // must spread new object here
  render(vnode, el)

  return () => {
    // destroy component
    render(null, el)
    vnode = undefined
  }
}
