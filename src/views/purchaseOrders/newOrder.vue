<template>
  <div>
    <b-card>
      <b-card-header>
        <b-row>
          <b-col cols="3">
            <b-form-select v-model="order.providerId" :options="providers"></b-form-select>
          </b-col>
          <b-col cols="6" class="ml-auto">
            <product-finder @productFound = "updateProductList">
            </product-finder>
          </b-col>
        </b-row>
      </b-card-header>
    <b-card-body>
       <product-list :products = "order.products">
       </product-list>
    </b-card-body>
    <b-card-footer>
      <b-row>
        <b-col cols="3">
          <b-datepicker v-model = "order.createdAt" placeholder="Fecha de orden"
          :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
          locale="es">
          </b-datepicker>
        </b-col>
        <b-col cols="3" class="mr-auto">
          <b-datepicker v-model = "order.shipingDay" placeholder="Fecha de entrega"
           :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
           locale="es">
          </b-datepicker>
        </b-col>
         <b-button type="submit" variant="primary">Guardar</b-button>
      </b-row>
    </b-card-footer>
    </b-card>
  </div>
</template>

<script>
const {ipcRenderer} = window.require('electron')
import productFinder from '@/components/productFinder.vue'
import productList from '@/components/productList.vue'

export default {
  data() {
    return{
      order:{
        createdAt:'',
        shipingDay:'',
        providerId: null,
        products:[]
      },
      providers:[],
    }
  },
  components:{productFinder, productList},

  async mounted(){
    console.log(this.providers)
    this.providers = this.getProvidersForSelect(this.providers = await ipcRenderer.invoke('index', 'providers'))
  },

  methods: {

    updateProductList(product){
        this.order.products.push(product)
    },

    getProvidersForSelect(providers){
      var prov = [{value:null, text:'Selecciona un proveedor'}];
      providers.forEach(provider => {
        prov.push({value:provider.id, text:provider.comercialName})
      });
      return prov;
    }
  },
  computed: {
    titulo: function(){
     // return this.editingStatus ? 'Actualizacion de producto' : 'Registro de productos';
     return '';
    }
  }
}
</script>>
