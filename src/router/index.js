import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/sales/NewSale.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sale_index/:canBeEdited?',
    name: 'saleIndex',
    props: true,
    component: () => import('../views/sales/IndexSale.vue')
  },
  {
    path: '/new_order_sale/:canBeEdited?',
    name: 'newOrderSale',
    props: true,
    component: () => import('../views/sales/NewOrderSale.vue')
  },
  {
    path: '/employee_selector/:canBeEdited?',
    name: 'employeeSelector',
    props: true,
    component: () => import('../components/EmployeeSelector.vue')
  },
  
  //product routes
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
  },

  //clients routes
  {
    path: '/client_form/:clientId?',
    name: 'clientForm',
    props: true,
    component: () => import('../views/clients/Form.vue')
  },
  {
    path: '/client_index/:clientName?/:clientEdited?',
    name: 'clientIndex',
    props: true,
    component: () => import('../views/clients/Index.vue')
  },

  //employee routes
  {
    path: '/employee_form/:employeeId?',
    name: 'employeeForm',
    props: true,
    component: () => import('../views/employees/Form.vue')
  },
  {
    path: '/employee_index/:employeeName?/:employeeEdited?',
    name: 'employeeIndex',
    props: true,
    component: () => import('../views/employees/Index.vue')
  },
  
  //provider routes
  {
    path: '/provider_form/:employeeId?',
    name: 'providerForm',
    props: true,
    component: () => import('../views/providers/Form.vue')
  },
  {
    path: '/provider_index/:providerName?/:providerEdited?',
    name: 'providerIndex',
    props: true,
    component: () => import('../views/providers/Index.vue')
  },

  //order routes
  {
    path: '/new_order/',
    name: 'newOrder',
    component: () => import('../views/purchaseOrders/newOrder.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
