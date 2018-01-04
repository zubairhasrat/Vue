// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css'
import store from '../store/store'
import Paginate from 'vuejs-paginate'
import VeeValidate from 'vee-validate';
Vue.config.productionTip = false
Vue.component('pagination',Paginate)
Vue.use(VeeValidate);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
