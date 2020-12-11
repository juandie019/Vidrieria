<template>
  <div>
    <b-card>
      <b-card-header>
        {{this.titulo}}
      </b-card-header>
    <b-card-body>
     <b-form @submit="onSubmit">

      <b-form-group label="Id Producto" label-for="id">
        <b-form-input
          id="id"
          v-model="form.id"
          type="number"
          required
          :disabled = editingStatus></b-form-input>
      </b-form-group>

      <b-form-group label="Nombre" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>   
      
      <b-form-group label="Precio" label-for="price">
        <b-form-input
          id="price"
          v-model="form.price"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Medida" label-for="size">
        <b-form-input
          id="size"
          v-model="form.size"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Piezas" label-for="pieces">
        <b-form-input
          id="pieces"
          v-model="form.pieces"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Grosor" label-for="thickness">
        <b-form-input
          id="thickness"
          v-model="form.thickness"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Color" label-for="color">
        <b-form-input
          id="color"
          v-model="form.color"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Forma" label-for="shape">
        <b-form-input
          id="shape"
          v-model="form.shape"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Guardar</b-button>
    </b-form>
    </b-card-body>
    </b-card>
  </div>
</template>

<script>
const {ipcRenderer} = window.require('electron')
export default {
  data() {
    return{
      form:{},
      editingStatus: false
    }
  },

  props:['productId'],

  async mounted(){
    if(this.productId != undefined){// if it get an id product it means that we are edting
      const result = await ipcRenderer.invoke('find', "products" ,this.productId)
      this.editingStatus = true;
      this.form = result;
    }
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
      else
        this.$router.push({ name: 'productIndex', params: { productName: this.form.id, productEdited: this.editingStatus ? 1 : 0} }) 

    },
    async onReset(){
        // await ipcRenderer.send('registrarProducto', this.form);
    },
    async productRegister(){

    }
  },
  computed: {
    titulo: function(){
     return this.editingStatus ? 'Actualizacion de producto' : 'Registro de productos';
    }
  }
}
</script>>
