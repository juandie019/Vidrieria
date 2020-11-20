import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  data:{ 
    employee:{
      id:'',
      name:''
    }
   },
  router,
  render: h => h(App)
}).$mount('#app')
