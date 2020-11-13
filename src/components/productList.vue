<template>
  <div>
   <b-table :items = "products" :fields = "fields" responsive="sm" head-variant="dark">
    <template #cell(price)="data">
      {{ '$' + data.value.toFixed(2) }}
    </template>
    <template #cell(total)="data">
      {{ '$' + data.value.toFixed(2) }}
   </template>
   <template #cell(editar)="row">
        <b-button @click="sendToEdit(row.item.id)" size="sm">
        <b-icon icon="pen" aria-hidden="true"></b-icon>
      </b-button>
    </template>
    <template v-slot:custom-foot>
        <b-tr>
          <b-td></b-td>
          <b-td></b-td>
          <b-td>Total</b-td>
          <b-td>{{totalProducts}}</b-td>
          <b-td>{{total}}</b-td>
          <b-td></b-td>
        </b-tr>
      </template>
   </b-table>
  </div>
</template>

<script>
  const {ipcRenderer} = window.require('electron')

  export default {
    name: 'productFinder',
    data(){
      return{
            fields:[
                {key: 'id', sortable:false, label:'ID'},
                {key: 'name', sortable:false, label:'Nombre'},
                {key: 'price', sortable:false, label:'Precio'},
                {key: 'quantity', sortable:false, label:'Cantidad'},
                {key: 'total', sortable:false, label:'Total'},
                {key: 'editar', sortable:false, label:''}
            ],
            clients:[]
      }
    },
    props: {
      products:{
          Array,
      }
    },
    methods:{
      async findProduct(){
         const result = await ipcRenderer.invoke('find', "products" ,this.id)
         console.log(result);
      }
    },
    computed:{
      total(){
        return '$' + this.products.reduce((total, item) => { return total + (item.price * item.quantity)}, 0.0).toFixed(2)
      },
      totalProducts(){
        return this.products.reduce((total, item) => { return total +  parseInt(item.quantity)}, 0.0)
      }
      
    }
  }
  //for total
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>