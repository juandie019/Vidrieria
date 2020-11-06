<template>
  <div>
    <b-card>
      <b-card-header>
        {{this.title}}
      </b-card-header>
    <b-card-body>
     <b-form @submit="onSubmit">

      <b-form-group label="Empleado ID" label-for="id">
        <b-form-input
          id="id"
          v-model="form.id"
          type="number"
          required
          :disabled = editingStatus></b-form-input>
      </b-form-group>

      <b-form-group label="Nombre del empleado" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>   
      
      <b-form-group label="NSS" label-for="nss">
        <b-form-input
          id="nss"
          v-model="form.nss"
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

      <b-form-group label="Telefono" label-for="phone">
        <b-form-input
          id="phone"
          v-model="form.phone"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Puesto" label-for="position">
        <b-form-input
          id="position"
          v-model="form.position"
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

  props:['employeeId'],

  async mounted(){
    if(this.employeeId != undefined){// if it get an id employee it means that we are edting
      const result = await ipcRenderer.invoke('find', "employees" ,this.employeeId)
      this.editingStatus = true;
      this.form = result;
    }
  },

  methods: {
   async onSubmit(evt){
      evt.preventDefault();
      var error;

      if(!this.editingStatus)
        error = ipcRenderer.send('register', 'employee', this.form);
      else
        ipcRenderer.send('edit', 'employee', this.form);

      if(error != undefined)
        alert(error);
      else
        this.$router.push({ name: 'employeeIndex', params: { employeeName: this.form.name, employeeEdited:this.editingStatus ? 1 : 0 } }) 
    },
    async onReset(){
         await ipcRenderer.send('register', 'employee', this.form);
    },
    async productRegister(){

    }
  },
  computed: {
    title: function(){
     return this.editingStatus ? 'Actualizacion de empleados' : 'Registro de empleados';
    },
  }
}
</script>>
