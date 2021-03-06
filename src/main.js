// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import "lib-flexible"
import "common/style/index.css"
import VueLazyload from "vue-lazyload"

Vue.use(VueLazyload,{
	loading:require("@/common/img/1.gif")
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
