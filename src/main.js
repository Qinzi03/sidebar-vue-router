import Vue from 'vue'
import App from './App.vue'
import Aside from './components/aside.vue'
// import SvgIcon from './components/SvgIcon/index'

import router from './router/router'
import Element from 'element-ui'
import './assets/icons/index'
import 'element-ui/lib/theme-chalk/submenu.css'
import 'element-ui/lib/theme-chalk/menu.css'
import 'element-ui/lib/theme-chalk/menu-item-group.css'
import 'element-ui/lib/theme-chalk/menu-item.css'
import 'element-ui/lib/theme-chalk/tree.css'
import 'element-ui/lib/theme-chalk/main.css'
Vue.use(Element)
// Vue.component('svg-icon', SvgIcon)
Vue.component('h-aside', Aside)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
