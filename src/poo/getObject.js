const { Product } = require('../poo/product')
const { Client } = require('../poo/client')
const { Employee } = require('../poo/employee')
const { Provider } = require('../poo/provider')

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
        default:
            return 'notFound'
    }
}

module.exports = {getObject}