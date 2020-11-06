<template>
  <div>
    <b-card>
      <b-card-header>
        {{this.titulo}}
      </b-card-header>
    <b-card-body>
     <b-form @submit="onSubmit">

      <b-form-group label="Cliente ID" label-for="id">
        <b-form-input
          id="id"
          v-model="form.id"
          type="number"
          required
          :disabled = editingStatus></b-form-input>
      </b-form-group>

      <b-form-group label="Nombre del cliente" label-for="firstName">
        <b-form-input
          id="firstName"
          v-model="form.firstName"
          type="text"
          required
        ></b-form-input>
      </b-form-group>   
      
      <b-form-group label="Apellidos" label-for="lastName">
        <b-form-input
          id="lastName"
          v-model="form.lastName"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Apep" label-for="apep">
        <b-form-input
          id="apep"
          v-model="form.apep"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Nombre Comercial" label-for="comercialName">
        <b-form-input
          id="comercialName"
          v-model="form.comercialName"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Direcion" label-for="address">
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
      <b-button variant="danger" v-if="!editingStatus">Limpiar</b-button>
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

  props:['clientId'],

  async mounted(){
    if(this.clientId != undefined){// if it get an id product it means that we are edting
      const result = await ipcRenderer.invoke('find', "clients" ,this.clientId)
      this.editingStatus = true;
      this.form = result;
    }
  },

  methods: {
   async onSubmit(evt){
      evt.preventDefault();
      var error;

      if(!this.editingStatus)
         error = ipcRenderer.send('register', 'client', this.form);
      else
        ipcRenderer.send('edit', 'client', this.form);

      if(error != undefined)
        alert(error);
      else
          this.$router.push({ name: 'clientIndex', params: { clientName: this.clienteNombre, clientEdited:this.editingStatus ? 1 : 0 } }) 

       // window.location = `/client_index/${this.clienteNombre}/${this.editingStatus ? 1 : 0}` ;
    },
    async onReset(){
         await ipcRenderer.send('register', 'client', this.form);
    },
    async productRegister(){

    }
  },
  computed: {
    titulo: function(){
     return this.editingStatus ? 'Actualizacion de clientes' : 'Registro de clientes';
    },
    clienteNombre: function(){
      return this.form.firstName + " " + this.form.lastName;
    }
  }
}
</script>>
