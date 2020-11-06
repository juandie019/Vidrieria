const { Sabelotodo } = require('./sabelotodo')
const {getOwnProperties} = require ('./ownProperties')

class Employee extends Sabelotodo{
    constructor(employee){
        super("employees");
        //if(typeof client != 'undefined'){
            this.id = parseInt(employee.id);
            this.name = employee.name;
            this.nss = employee.nss;
            this.address = employee.address;
            this.phone = parseInt(employee.phone);
            this.email = employee.email;
            this.position = employee.position;
        //}
    }

    async save(){
      try {
          return await this.create(getOwnProperties(this));//GetOwn
      }catch (error){
          if(error.code === 'ER_DUP_ENTRY')
            throw 'Ya hay un empleado con este id';
          else
            throw 'Algo salio mal';
      }
    }

    async edit(){
        try {
            return await this.update(getOwnProperties(this));//GetOwn
        } catch (error) {
            console.log(error)
        }
      }
}

module.exports = { Employee }