<template>
  <div>
    <b-card>
        <b-card-header>
            <b-row>
                <b-col class= "mt-2">
                    <b-card-sub-title>Lista de Provedores</b-card-sub-title>
                </b-col>
                <b-col class="text-right">
                    <b-link class="text-right" to="/provider_form"><b-icon icon="person-plus-fill" aria-hidden="flase" class="mr-1"></b-icon>Registrar Proveedor</b-link>     
                </b-col>
            </b-row>
        </b-card-header>
        <b-card-body>
            <b-table
                :items = "providers"
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
                {key: 'comercialName', sortable:true, label:'Negocio'},
                {key: 'rfc', sortable:false, label:'RFC'},
                {key: 'address', sortable:false, label:'Direccion'},
                {key: 'phone', sortable:false, label:'Telefono'},
                {key: 'email', sortable:false, label:'email'},
                {key: 'editar', sortable:false, label:''}
                ],
            providers:[]
        }
    },
    props:['providerName', 'providerEdited'], //when redirecting from register/edit, it gets client name to notify

    async created(){
        this.providers = await ipcRenderer.invoke('index', 'providers')
    },

    mounted(){
       if(this.providerName !== undefined)
         this.showToast();
    },

    methods:{
        showToast() {
            const action = this.providerEdited == 1 ?  'ACTUALIZO' : 'REGISTRO';
          
            this.$bvToast.toast(this.providerName, {
                id: 'toast',
                title: `SE ${action}`,
                solid: true
            })
        },
        sendToEdit(id){
           this.$router.push({ name: 'providerForm', params: { providerId: id } }) 
        }
    }

}
</script>
