const {getOwnProperties, removeProperties} = require ('./ownProperties');
const { Sabelotodo } = require('./sabelotodo')
const { Product } = require('./product')
var moment = require('moment');

class Invoice extends Sabelotodo{
    constructor(order){
        super("invoices");
        //if(typeof client != 'undefined'){
            this.idClient = order.idClient;
            this.createdAt = moment().format("YYYY-MM-DD");
            this.products = order.products;
    }

    async save(){
      try {
        const response = await this.create2(undefined , {
          idClient: this.idClient,
          createdAt:this.createdAt,
        });

        await this.saveDetails(this.products, response.insertId); 


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

    async saveDetails(products, idInvoice){
      console.log('saveDetails', products);

      products.forEach(async product => {
        product = this.applyIVA(product);

        await this.create2('invoice_details' , {
          idInvoice:idInvoice,
          idProduct: product.id,
          iva: product.iva,
          subTotal: product.subTotal,
          total: product.total
        })
      });
    }

    applyIVA(product){
        product.subTotal = product.total;
        product.iva = product.total * 0.016;
        product.total = product.subTotal + product.iva;

        return product;
    }
}

module.exports = { Invoice }