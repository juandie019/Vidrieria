<template>
  <div>
    <b-card>
      <b-card-header>
        <b-row>
          <b-col cols="3">
            <b-form-select v-model="order.idProvider" :options="providers"></b-form-select>
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
        <b-col cols="3" class="">
          <b-datepicker v-model = "order.shipingDay" placeholder="Fecha de entrega"
           :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
           locale="es">
          </b-datepicker>
        </b-col>
         <b-col cols="2" class="mt-2 mr-auto"  @click="chk">
             <b-form-checkbox v-model="order.pendingFee" value=1 unchecked-value=0 @click="chk">Se debe</b-form-checkbox>
        </b-col>
         <b-button type="submit" @click="saveOrder" variant="primary">Guardar</b-button>
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
        idProvider: null,
        pendingFee: 0,
        products:[]
      },
      providers:[],
    }
  },
  components:{productFinder, productList},

  async mounted(){
    this.providers = this.getProvidersForSelect(this.providers = await ipcRenderer.invoke('index', 'providers'))
  },

  methods: {
    saveOrder(evt){
      evt.preventDefault();

      var error = ipcRenderer.send('register', 'purchaseOrder', this.order);
      if(error != undefined)
        alert(error);
      // else  
      //   this.$router.push({ name: 'clientIndex', params: { clientName: this.clienteNombre, clientEdited:this.editingStatus ? 1 : 0 } }) 
    },
    updateProductList(product){
        this.order.products.push(product)
    },

    getProvidersForSelect(providers){
      var prov = [{value:null, text:'Selecciona un proveedor'}];
      providers.forEach(provider => {
        prov.push({value:provider.id, text:provider.comercialName})
      });
      return prov;
    },
    
    chk(){
      console.log(this.order.pendingFee)
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
