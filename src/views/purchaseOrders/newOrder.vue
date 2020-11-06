<template>
  <div>
    <b-card>
      <b-card-header>
        <b-form-select v-model="order.providerId" :options="providers"></b-form-select>
      </b-card-header>
    <b-card-body>

      <b-button type="submit" variant="primary">Guardar</b-button>
      <!-- <b-button variant="danger" v-if="!editingStatus">Limpiar</b-button> -->
    </b-card-body>
    </b-card>
  </div>
</template>

<script>
const {ipcRenderer} = window.require('electron')
export default {
  data() {
    return{
      order:{
        createdAt:'',
        shipingDay:'',
        providerId: null,
        productos:[]
      },
      providers:[],
    }
  },

  async mounted(){
    console.log(this.providers)
    this.providers = this.getProvidersForSelect(this.providers = await ipcRenderer.invoke('index', 'providers'))
  },

  methods: {
   async onSubmit(evt){
      var error;
      evt.preventDefault();

      if(!this.editingStatus){
         error = ipcRenderer.sendSync('register', 'product', this.form);
        }
      else
        ipcRenderer.sendSync('edit', 'product', this.form);
        
      if(error != undefined)
        alert(error);
      // else
      //   this.$router.push({ name: 'productIndex', params: { productName: this.form.id, productEdited: this.editingStatus ? 1 : 0} }) 

    },
    async onReset(){
        // await ipcRenderer.send('registrarProducto', this.form);
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
