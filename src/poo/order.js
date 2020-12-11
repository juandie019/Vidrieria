const {getOwnProperties, removeProperties} = require ('./ownProperties');
const { Sabelotodo } = require('./sabelotodo')
const { Product } = require('./product')
const { Invoice } = require('./invoice')
var moment = require('moment');

const { getSignedEmployee } = require('electron');
const invoice = require('./invoice');

class Order extends Sabelotodo{
    constructor(order){
        super("orders");
        //if(typeof client != 'undefined'){
            this.idEmployee = order.idEmployee;
            this.invoiceRequired = order.invoice;
            this.products = order.products;
            this.idClient = order.client.id;
            this.createdAt = moment().format("YYYY-MM-DD");
            this.total = order.products.reduce((total, item) => { return total + (item.price * item.quantity)}, 0.0)
    }

    async save(){
      try {
        const response = await this.create2(undefined , {
          createdAt:this.createdAt,
          idEmployee: this.idEmployee,
          idClient: this.idClient,
          total: this.total,
        })

        await this.saveDetails(this.products, response.insertId)

        if(this.invoiceRequired)
          this.makeInvoice({products:this.products, idClient:this.idClient});

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

    async saveDetails(products, idorder){
      products.forEach(async product => {
        await this.create2('orders_details' , {
          idorder:idorder,
          idProduct: product.id,
          quantity: product.quantity,
          total: product.total
        })
        await this.updateProductStock(product.id, -product.quantity)
      });
    }

    async updateProductStock(productId, quantity){
      var product = new Product(await this.find(productId, 'products'))
      await product.updateStock(quantity);
    }

    async makeInvoice(order){
      var invoice = new Invoice(order)
      await invoice.save();
    }
}

module.exports = { Order }