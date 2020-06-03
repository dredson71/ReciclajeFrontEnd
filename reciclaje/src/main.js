import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueApexCharts from 'vue-apexcharts'


Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)


Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://recyclerapiresttdp.herokuapp.com/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
