// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {TableComponent, TableColumn} from 'vue-table-component'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)
Vue.component('table-component', TableComponent)
Vue.component('table-column', TableColumn)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
