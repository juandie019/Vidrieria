<template>
  <div>
    <b-card>
        <b-card-header>
            <b-row>
                <b-col class= "mt-2">
                    <b-card-sub-title>Lista de productos</b-card-sub-title>
                </b-col>
                <b-col class="text-right">
                    <b-link class="text-right" to="/product_form"><b-icon icon="basket" aria-hidden="flase" class="mr-1"></b-icon>Registrar producto</b-link>     
                </b-col>
            </b-row>
        </b-card-header>
        <b-card-body>
            <b-table
                :items = "products"
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
            sortDesc: true,
            fields:[
                {key: 'id', sortable:false, label:'ID'},
                {key: 'name', sortable:true, label:'Nombre'},
                {key: 'price', sortable:true, label:'Precio'},
                {key: 'size', sortable:false, label:'Tamaño'},
                {key: 'pieces', sortable:false, label:'Piezas'},
                {key: 'thickness', sortable:false, label:'Grosor'},
                {key: 'color', sortable:false, label:'Color'},
                {key: 'shape', sortable:false, label:'Forma'},
                {key: 'editar', sortable:false, label:''}
                ],
            products:[]
        }
    },
    props:['productName', 'productEdited'], //when redirecting from register/edit, it gets product name to notify

    async created(){
        this.products = await ipcRenderer.invoke('index', 'products')
    },

    mounted(){
       if(this.productName !== undefined)
         this.showToast();
    },

    methods:{
        showToast() {
            const action = this.productEdited == 1 ?  'ACTUALIZO' : 'REGISTRO';
          
            this.$bvToast.toast(this.productName, {
                id: 'toast',
                title: `SE ${action}`,
                solid: true
            })
        },
        sendToEdit(id){
           this.$router.push({ name: 'productForm', params: { productId: id } }) 
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