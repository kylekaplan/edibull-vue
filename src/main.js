import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'

// allow vue-router to pull pages
import Portals from './components/Portals'
import Edibull from './components/Edibull'

Vue.use(Vuetify)
Vue.use(VueRouter)

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
  // vue-router
  router,
  render: h => h(App)
}).$mount('#app')
