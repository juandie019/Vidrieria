<template>
  <div id="app">
    <b-navbar type="dark" toggleable="lg" variant="dark" class="mb-4">
      <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Ventas</b-nav-item>
          <b-nav-item to="/product_index/">Productos</b-nav-item>
          <b-nav-item to="/client_index/">Clientes</b-nav-item>
          <b-nav-item to="/employee_index/">Empleados</b-nav-item>
          <b-nav-item to="/provider_index/">Proveedores</b-nav-item>
          <b-nav-item to="/new_order/">Orden de compra</b-nav-item>
        </b-navbar-nav>
      
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <b-icon icon="person-circle" aria-hidden="flase" class=""></b-icon>
            {{$root.employee}}
          </template>
          <b-dropdown-item href="#">Perfil</b-dropdown-item>
          <b-dropdown-item href="#" @click="showEmployees">Cambiar perfil</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div id="content">
      <b-container>
        <router-view/>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {

  data(){
    return{
      employee: ''
    }
  },
  mounted(){
    this.$router.push({ name: 'employeeSelector', params: { canBeClosed: this.employeeSelected } }) 
  },
  methods:{
    showEmployees(){
     this.$router.push({ name: 'employeeSelector', params: { canBeClosed: this.employeeSelected } }) 
    }
  },
  computed:{
    employeeSelected(){
      return this.$root.employee != ''
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

</style>
