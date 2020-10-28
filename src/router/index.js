import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/product_form/:productId?',
    name: 'productForm',
    props: true,
    component: () => import('../views/products/Form.vue')
  },
  {
    path: '/product_index/:productName?/:productEdited?',
    name: 'productIndex',
    props: true,
    component: () => import('../views/products/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
