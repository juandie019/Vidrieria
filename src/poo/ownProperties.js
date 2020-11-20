const { Connection } = require("./database");

getOwnProperties = (object) =>{//this cleans inherited properties for corret database insertion
    var newObj = {}
    Object.keys(object).forEach(key => {
        if(key != 'connection' && key != 'table'){
            newObj[key] = object[key]
        }
    });
    return newObj;
}

removeProperties = (object, properties=[]) => {
    var propsToRemove = ['connection', 'table'];
    var newObj = {}
    Array.prototype.push.apply(propsToRemove, properties);

    Object.keys(object).forEach(key => {
        if(!propsToRemove.includes(key)){
            newObj[key] = object[key]
        }
    });
    return newObj;
}

module.exports = {getOwnProperties, removeProperties}