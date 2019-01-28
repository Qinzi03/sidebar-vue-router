import Aside from './components/aside.vue'
function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('h-aside', Aside)
}
const HAside = {
  install: install,
  Aside
}

if(typeof window !== undefined && window.Vue) {
  window.Vue.use(HAside)
}