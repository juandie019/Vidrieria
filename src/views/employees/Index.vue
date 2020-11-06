<template>
  <div>
    <b-card>
        <b-card-header>
            <b-row>
                <b-col class= "mt-2">
                    <b-card-sub-title>Lista de empleados</b-card-sub-title>
                </b-col>
                <b-col class="text-right">
                    <b-link class="text-right" to="/employee_form"><b-icon icon="person-plus-fill" aria-hidden="flase" class="mr-1"></b-icon>Registrar Empleado</b-link>     
                </b-col>
            </b-row>
        </b-card-header>
        <b-card-body>
            <b-table
                :items = "employees"
                :fields = "fields"
                :sort-by.sync = "sortBy"
                :sort-desc.sync = "sortDesc"
                sort-icon-left
                responsive="sm"
            >
            <template #cell(editar)="row">
                <b-button @click="sendToEdit(row.item.id)" size="sm">
                    <b-icon icon="pen" aria-hidden="true"></b-icon>
                </b-button>
            </template>
            </b-table>
        </b-card-body>
    </b-card>
  </div>
</template>

<script>
    const {ipcRenderer} = window.require('electron')

    export default {
    data(){
        return{
            sortBy:'name',
            sortDesc: false,
            fields:[
                {key: 'id', sortable:false, label:'ID'},
                {key: 'name', sortable:true, label:'Nombre'},
                {key: 'position', sortable:false, label:'Puesto'},
                {key: 'nss', sortable:false, label:'NSS'},
                {key: 'address', sortable:false, label:'Direccion'},
                {key: 'phone', sortable:false, label:'Telefono'},
                {key: 'email', sortable:false, label:'email'},
                {key: 'editar', sortable:false, label:''}
                ],
            employees:[]
        }
    },
    props:['employeeName', 'employeeEdited'], //when redirecting from register/edit, it gets client name to notify

    async created(){
        this.employees = await ipcRenderer.invoke('index', 'employees')
    },

    mounted(){
       if(this.employeeName !== undefined)
         this.showToast();
    },

    methods:{
        showToast() {
            const action = this.employeeEdited == 1 ?  'ACTUALIZO' : 'REGISTRO';
          
            this.$bvToast.toast(this.employeeName, {
                id: 'toast',
                title: `SE ${action}`,
                solid: true
            })
        },
        sendToEdit(id){
            this.$router.push({ name: 'employeeForm', params: { employeeId: id } }) 
        }
    }

}
</script>

<style scoped>
    .text-primary{
        color:slategrey;
    }
    .link{
        color: springgreen;
    }
</style>