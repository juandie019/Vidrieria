const { Sabelotodo } = require('./sabelotodo')
const {getOwnProperties} = require ('./ownProperties')

class Product extends Sabelotodo{
    constructor(product){
        super("products");
        //if(typeof product != 'undefined'){
            this.id = parseInt(product.id);
            this.name = product.name;
            this.price = parseInt(product.price);
            this.size = parseInt(product.size);
            this.pieces = parseInt(product.pieces);
            this.color = product.color;
            this.thickness = product.thickness;
            this.shape = product.shape;
        //}
    }

    async save(){
      try {
          return await this.create(getOwnProperties(this));//GetOwn
      }catch (error){
          if(error.code === 'ER_DUP_ENTRY')
            throw 'Ya hay un producto con este id';
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

module.exports = { Product }