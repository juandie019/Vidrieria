<template>
  <div>
    <b-card>
        <b-card-header>
            <b-row>
                <b-col class= "mt-2">
                    <b-card-sub-title>Lista de Clientes</b-card-sub-title>
                </b-col>
                <b-col class="text-right">
                    <b-link class="text-right" to="/client_form"><b-icon icon="person-plus-fill" aria-hidden="flase" class="mr-1"></b-icon>Registrar Cliente</b-link>     
                </b-col>
            </b-row>
        </b-card-header>
        <b-card-body>
            <b-table
                :items = "clients"
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
            sortBy:'firstName',
            sortDesc: false,
            fields:[
                {key: 'id', sortable:false, label:'ID'},
                {key: 'firstName', sortable:true, label:'Nombre'},
                {key: 'lastName', sortable:true, label:'Apellidos'},
                {key: 'apep', sortable:false, label:'Apep'},
                {key: 'comercialName', sortable:false, label:'Negocio'},
                {key: 'address', sortable:false, label:'Direccion'},
                {key: 'email', sortable:false, label:'email'},
                {key: 'phone', sortable:false, label:'Telefono'},
                {key: 'editar', sortable:false, label:''}
                ],
            clients:[]
        }
    },
    props:['clientName', 'clientEdited'], //when redirecting from register/edit, it gets client name to notify

    async created(){
        this.clients = await ipcRenderer.invoke('index', 'clients')
    },

    mounted(){
       if(this.clientName !== undefined)
         this.showToast();
    },

    methods:{
        showToast() {
            const action = this.clientEdited == 1 ?  'ACTUALIZO' : 'REGISTRO';
          
            this.$bvToast.toast(this.clientName, {
                id: 'toast',
                title: `SE ${action}`,
                solid: true
            })
        },
        sendToEdit(id){
           this.$router.push({ name: 'clientForm', params: { clientId: id } }) 
        }
    }

}
</script>
