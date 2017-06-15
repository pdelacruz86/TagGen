// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

require('./assets/global/plugins/font-awesome/css/font-awesome.min.css')
require('./assets/global/plugins/simple-line-icons/simple-line-icons.min.css')
require('./assets/global/plugins/bootstrap/css/bootstrap.min.css')
require('./assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css')
require('./assets/layouts/layout3/css/layout.min.css')
require('./assets/layouts/layout3/css/themes/default.min.css')
require('./assets/layouts/layout3/css/custom.min.css')
require('./assets/global/css/components-rounded.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
