<template>
  <div>
   <b-form >
     <b-row>
      <b-col cols= "6">
        <b-input id="id" v-model="id" placeholder="Producto ID"></b-input>
      </b-col>
      <b-col cols= "4">
        <b-input id="quantity" v-model="quantity" placeholder="Cantidad"></b-input>
      </b-col>
        <b-button variant="secondary" @click="findProduct">Agregar</b-button>
     </b-row>
  </b-form>
  </div>
</template>

<script>
  const {ipcRenderer} = window.require('electron')

  export default {
    name: 'productFinder',
    data(){
      return{
        id:'',
        quantity: ''
      }
    },
    props: {
      emplyees: Array
    },
    methods:{
      async findProduct(){
         const product = await ipcRenderer.invoke('find', "products" ,this.id)
         product.quantity = this.quantity;
         product.total = product.price * product.quantity;
         this.$emit('productFound', product);
         console.log(product);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
