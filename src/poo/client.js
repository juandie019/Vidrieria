const { Sabelotodo } = require('./sabelotodo')
const {getOwnProperties} = require ('./ownProperties')

class Client extends Sabelotodo{
    constructor(client){
        super("clients");
        //if(typeof client != 'undefined'){
            this.id = parseInt(client.id);
            this.firstName = client.firstName;
            this.lastName = client.lastName;
            this.apep = client.apep;
            this.comercialName = client.comercialName;
            this.address = client.address;
            this.email = client.email;
            this.phone = parseInt(client.phone);
        //}
    }

    async save(){
      try {
          return await this.create(getOwnProperties(this));//GetOwn
      }catch (error){
          if(error.code === 'ER_DUP_ENTRY')
            throw 'Ya hay un cliente con este id';
          else
            throw 'Algo salio mal';
      }
    }

    async edit(){
        //try {
            return await this.update(getOwnProperties(this));//GetOwn
       // } catch (error){
            console.log(error)
       // }
      }
}

module.exports = { Client }