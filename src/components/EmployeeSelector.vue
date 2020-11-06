<template>
  <div>

    <b-skeleton type="avatar"></b-skeleton><br>
    <b-skeleton></b-skeleton><br>
    <b-skeleton></b-skeleton><br>
    <b-skeleton></b-skeleton><br><br>
    <b-skeleton type="input"></b-skeleton><br>
    <b-skeleton type="input"></b-skeleton><br>
    <b-skeleton type="button" class="float-right"></b-skeleton>

    <b-modal ref="my-modal" :hide-footer="!canBeClosed" no-close-on-esc no-close-on-backdrop hide-header-close title="Selecciona un perfil">
      <b-list-group v-for="(employee, index) in employees" :key = index flush> 
        <b-list-group-item button @click="changeEmployee(index)">
          <b-row align-h="between">
            <b-col cols="6">
              {{employee.name}}
            </b-col>
            <b-col cols="4">
              {{employee.id}}
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>

      <template #modal-footer>
        <div class="w-100">
          <b-button variant="secondary" size="sm" class="float-right" @click="closeModal">
            Cerrar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
const {ipcRenderer} = window.require('electron')

export default {
  name: 'employeeSelector',
  props: ['canBeClosed'],
  data(){
    return{
      employees:[]
    }
  },
  async created(){
    this.employees = await ipcRenderer.invoke('index', 'employees')
  },

  mounted(){
   this.$refs['my-modal'].show()
  },

  methods:{
    changeEmployee(index){
      ipcRenderer.send('updateSignedEmployee', this.employees[index].id);

      this.$root.employee = this.employees[index].name
      this.$refs['my-modal'].hide()
      
      this.$router.push({name:'Home'});
    },
    closeModal(){
      this.$refs['my-modal'].hide()
      this.$router.go(-1);
    }
  }
}
</script>

