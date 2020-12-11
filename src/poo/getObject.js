const { Product } = require('../poo/product')
const { Client } = require('../poo/client')
const { Employee } = require('../poo/employee')
const { Provider } = require('../poo/provider')


// creo que se puede hacer un require condicional

getObject = (objectType, object) =>{//this cleans inherited properties for corret database insertion
    switch (objectType) {
        case 'product':
            return new Product(object)
        case 'client':
            return new Client(object)
        case 'employee':
            return new Employee(object)
        case 'provider':
            return new Provider(object)
        case 'purchaseOrder':
            const { PurchaseOrder } = require('../poo/purchaseOrder')
            return new PurchaseOrder(object)
        case 'sale':
            const { Sale } = require('../poo/sale')
            return new Sale(object)
        case 'order':
            const { Order } = require('../poo/order')
            return new Order(object)
        default:
            return 'notFound'
    }
}

module.exports = {getObject}