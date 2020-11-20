<template>
  <div>
    <b-card>
        <b-card-header>
            <b-row>
                <b-col class= "mt-2">
                    <b-card-sub-title>Lista de Ventas</b-card-sub-title>
                </b-col>
                <!-- <b-col class="text-right">
                    <b-link class="text-right" to="/client_form"><b-icon icon="person-plus-fill" aria-hidden="flase" class="mr-1"></b-icon>Registrar Cliente</b-link>     
                </b-col> -->
            </b-row>
        </b-card-header>
        <b-card-body>
            <b-table
                :items = "sales"
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
                {key: 'name', sortable:true, label:'Nombre'},
                {key: 'description', sortable:true, label:'Descripcion'},
                {key: 'total', sortable:false, label:'Total'},
                {key: 'createdAt', sortable:false, label:'Fecha'},
                {key: 'editar', sortable:false, label:''}
                ],
            sales:[]
        }
    },
    props:['saleName', 'saleEdited'], //when redirecting from register/edit, it gets client name to notify

    async created(){
        this.sales = await ipcRenderer.invoke('index', 'sales')
        console.log(this.sales);
    },

    mounted(){
       if(this.saleName !== undefined)
         this.showToast();
    },

    methods:{
        showToast() {
            const action = this.saleEdited == 1 ?  'ACTUALIZO' : 'REGISTRO';
          
            this.$bvToast.toast(this.saleName, {
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
