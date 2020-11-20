<template>
  <div>
    <b-card>
      <b-card-header>
        <b-row>
          <b-col cols="3">
            <b-form-input v-model="sale.name" placeholder="Nombre de la nota"></b-form-input>
          </b-col>
          <b-col cols="6" class="ml-auto">
            <product-finder @productFound = "updateProductList">
            </product-finder>
          </b-col>
        </b-row>
      </b-card-header>
    <b-card-body>
       <product-list :products = "sale.products">
       </product-list>
    </b-card-body>
    <b-card-footer>
      <b-row>
        <b-col cols="3" class="mr-auto">
          <b-form-input v-model="sale.description" placeholder="Descripcion"></b-form-input>
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
      sale:{
        createdAt:'',
        name:'',
        description:'',
        products:[]
      },
    }
  },
  components:{productFinder, productList},

  async mounted(){
    this.sale.idEmployee = this.$root.employee.id
    console.log('mounted',this.sale)
  },

  methods: {
    saveOrder(evt){
      evt.preventDefault();

      var error = ipcRenderer.send('register', 'sale', this.sale);
      if(error != undefined)
        alert(error);
       else  
        this.$router.push({ name: 'saleIndex', params: { saleName: this.sale.name, saleEdited:false} }) 
    },
    updateProductList(product){
        this.sale.products.push(product)
    },

    getProvidersForSelect(providers){
      var prov = [{value:null, text:'Selecciona un proveedor'}];
      providers.forEach(provider => {
        prov.push({value:provider.id, text:provider.comercialName})
      });
      return prov;
    },
    
    chk(){
      console.log(this.sale.pendingFee)
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
