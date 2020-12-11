<template>
  <div>
   <b-form >
     <b-row>
      <b-col cols= "8">
        <b-input id="id" v-model="id" placeholder="Cliente ID"></b-input>
      </b-col>
      <b-col cols= "4">
        <b-button variant="secondary" @click="findClient">Buscar</b-button>
      </b-col>
     </b-row>
  </b-form>
  </div>
</template>

<script>
  const {ipcRenderer} = window.require('electron')

  export default {
    name: 'clientFinder',
    data(){
      return{
        id:'',
      }
    },
 
    methods:{
      async findClient(){
         const client = await ipcRenderer.invoke('find', "clients" ,this.id)
         this.$emit('clientFound', client);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
