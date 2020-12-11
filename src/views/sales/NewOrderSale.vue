<template>
  <div>
    <b-card>
      <b-card-header>
        <b-row>
          <b-col cols="3" class="mt-2">
            Pedido
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
        <b-col cols="5" class="">
          <client-finder @clientFound = "updateClient"></client-finder>        
        </b-col>
        <b-col cols="5" class="mt-2 ml-auto">
          <b-row>
             <b-form-checkbox v-model="order.pendingFee" value=1 unchecked-value=0 class="mr-4 ml-3">Pagado</b-form-checkbox>
             <b-form-checkbox v-model="order.invoice" value=1 unchecked-value=0 >Facturar</b-form-checkbox>
          </b-row>
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
import clientFinder from '@/components/clientFinder.vue'
import productList from '@/components/productList.vue'

export default {
  data() {
    return{
      order:{
        createdAt:'',
        invoice: 0,
        pendingFee:0,
        client:{},
        products:[]
      },
    }
  },
  components:{productFinder, clientFinder, productList},

  async mounted(){
    this.order.idEmployee = this.$root.employee.id
    console.log('mounted',this.order)
  },

  methods: {
    saveOrder(evt){
      evt.preventDefault();

      var error = ipcRenderer.send('register', 'order', this.order);
      if(error != undefined)
        alert(error);
       else  
        this.$router.push({ name: 'saleIndex', params: { saleName: this.order.name, saleEdited:false} }) 
    },
    updateProductList(product){
        this.order.products.push(product)
    },
    updateClient(client){
      console.log(client)
      this.order.client.id = client.id;
      this.order.client.name = client.fisrtName;
    },
  },
}
</script>>
