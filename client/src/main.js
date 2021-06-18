import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import { router } from './router'
import {BootstrapVue,IconsPlugin} from "bootstrap-vue"


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
