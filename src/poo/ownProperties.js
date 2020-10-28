
getOwnProperties = (object) =>{//this cleans inherited properties for corret database insertion
    var newObj = {}
    Object.keys(object).forEach(key => {
        if(key != 'connection' && key != 'table'){
            newObj[key] = object[key]
        }
    });
    return newObj;
}

module.exports = {getOwnProperties}