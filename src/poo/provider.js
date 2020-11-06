const { Sabelotodo } = require('./sabelotodo')
const {getOwnProperties} = require ('./ownProperties')

class Provider extends Sabelotodo{
    constructor(provider){
        super("providers");
        //if(typeof provider != 'undefined'){
            this.id = parseInt(provider.id);
            this.comercialName = provider.comercialName;
            this.rfc = provider.rfc;
            this.address = provider.address;
            this.phone = parseInt(provider.phone);
            this.email = provider.email;
            //}
          }

    async save(){
      try {
          return await this.create(getOwnProperties(this));//GetOwn
      }catch (error){
          if(error.code === 'ER_DUP_ENTRY')
            throw 'Ya hay un prooverdor con este id';
          else
            throw 'Algo salio mal';
      }
    }

    async edit(){
        //try {
            return await this.update(getOwnProperties(this));//GetOwn
       // } catch (error) {
            console.log(error)
       // }
      }
}

module.exports = { Provider }