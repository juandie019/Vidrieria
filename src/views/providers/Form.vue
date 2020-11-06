<template>
  <div>
    <b-card>
      <b-card-header>
        {{this.titulo}}
      </b-card-header>
    <b-card-body>
     <b-form @submit="onSubmit">

      <b-form-group label="Proveedor ID" label-for="id">
        <b-form-input
          id="id"
          v-model="form.id"
          type="number"
          required
          :disabled = editingStatus></b-form-input>
      </b-form-group>

      <b-form-group label="Nombre Comercial" label-for="comercialName">
        <b-form-input
          id="comercialName"
          v-model="form.comercialName"
          type="text"
          required
        ></b-form-input>
      </b-form-group>   
      
      <b-form-group label="RFC" label-for="rfc">
        <b-form-input
          id="rfc"
          v-model="form.rfc"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Direccion" label-for="address">
        <b-form-input
          id="address"
          v-model="form.address"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Correo" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Telefono" label-for="phone">
        <b-form-input
          id="phone"
          v-model="form.phone"
          type="number"
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

  props:['providerId'],

  async mounted(){
    if(this.providerId != undefined){// if it get an id provider it means that we are edting
      const result = await ipcRenderer.invoke('find', "providers" ,this.providerId)
      this.editingStatus = true;
      this.form = result;
    }
  },

  methods: {
   async onSubmit(evt){
      evt.preventDefault();
      var error;

      if(!this.editingStatus)
         error = ipcRenderer.sendSync('register', 'provider', this.form);
      else
        ipcRenderer.sendSync('edit', 'provider', this.form);

      if(error != undefined)
        alert(error);
      else
          this.$router.push({ name: 'providerIndex', params: { providerName: this.form.comercialName, providerEdited:this.editingStatus ? 1 : 0 } }) 
    },
  },
  computed: {
    titulo: function(){
     return this.editingStatus ? 'Actualizacion de proveedor' : 'Registro de proveedores';
    },
  }
}
</script>>
