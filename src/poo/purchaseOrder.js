const { Sabelotodo } = require('./sabelotodo')
const { Product } = require('./product')
const {getOwnProperties, removeProperties} = require ('./ownProperties');
const product = require('./product');

class PurchaseOrder extends Sabelotodo{
    constructor(order){
        super("purchase_orders");
        //if(typeof client != 'undefined'){
            this.idProvider = order.idProvider;
            this.createdAt = order.createdAt;
            this.shipingDay = order.shipingDay;
            this.products = order.products;
            this.pendingFee = order.pendingFee;
        //}
    }

    async save(){
      try {
        const response = await this.create(removeProperties(this, ['products']));//GetOwn
        return await this.saveProducts(this.products, response.insertId);
      }catch (error){
          if(error.code === 'ER_DUP_ENTRY')
            throw 'Ya hay una orden con este id';
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

    async saveProducts(products, idPurchase){
      
      products.forEach(async product => {
        await this.create2('purchase_details' , {
          idPurchaseOrder:idPurchase,
          idProduct: product.id,
          quantity: product.quantity,
          total: product.total
        })
        await this.updateProductStock(product.id, product.quantity)
      });
    }
    async updateProductStock(productId, quantity){
      var product = new Product(await this.find(productId, 'products'))
      console.log(product);
      //console.log(await this.find(productId, 'products'));
      await product.updateStock(quantity);
    }
}

module.exports = { PurchaseOrder }