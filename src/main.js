import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

// allow vue-router to pull pages
import Portals from './components/Portals'
import Edibull from './components/Edibull'

Vue.use(VueRouter)
Vue.use(BootstrapVue);

Vue.config.productionTip = false

// allows navigation to other pages
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Edibull},
    {path: '/portals', component: Portals}
  ]
});

new Vue({
  router, //vue router
  render: h => h(App)
}).$mount('#app')
