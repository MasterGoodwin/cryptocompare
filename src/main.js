import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
