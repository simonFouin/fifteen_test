import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueMapboxTs from "vue-mapbox-ts";

loadFonts()

createApp(App)
  .use(vuetify)
  .use(VueMapboxTs)
  .mount('#app')
