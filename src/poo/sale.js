const {getOwnProperties, removeProperties} = require ('./ownProperties');
const { Sabelotodo } = require('./sabelotodo')
const { Product } = require('./product')
var moment = require('moment');

const { getSignedEmployee } = require('electron')

class Sale extends Sabelotodo{
    constructor(sale){
        super("sales");
        //if(typeof client != 'undefined'){
            this.name = sale.name;
            this.idEmployee = sale.idEmployee;
            this.description = sale.description;
            this.products = sale.products;
            this.createdAt = moment().format("YYYY-MM-DD");
            this.total = sale.products.reduce((total, item) => { return total + (item.price * item.quantity)}, 0.0)
        //}
    }

    async save(){
      try {
        const response = await this.create(removeProperties(this, ['products']));//returns an object for dataBase insertion
        return await this.saveProducts(this.products, response.insertId);
      }catch (error){
          if(error.code === 'ER_DUP_ENTRY')
            throw 'Ya hay una venta con este id';
          else
            throw 'Algo salio mal';
      }
    }

    async edit(){
        //try {
            return await this.update(removeProperties(this));//GetOwn
       // } catch (error){
            console.log(error)
       // }
    }

    async index(){
        
    }

    async saveProducts(products, idSale){
      
      products.forEach(async product => {
        await this.create2('sales_details' , {
          idSale:idSale,
          idProduct: product.id,
          total: product.total
        })
        await this.updateProductStock(product.id, -product.quantity)
      });
    }
    async updateProductStock(productId, quantity){
      var product = new Product(await this.find(productId, 'products'))
      console.log(product);
      //console.log(await this.find(productId, 'products'));
      await product.updateStock(quantity);
    }
}

module.exports = { Sale }