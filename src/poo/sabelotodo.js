const { Connection } = require('./database');

class Sabelotodo extends Connection{

    constructor(table){
        super();
        this.table = table;
    }

    async create(element){
        try {
            return await (await this.connection).query(`INSERT INTO ${this.table} SET ?`, element);
        } catch (error) {
            throw error;
        }
    }

    async update(element){
        try {
            return await (await this.connection).query(`UPDATE ${this.table} SET ? WHERE id = ?`, [element, element.id]);
        } catch (error) {
            
        }
    }

    async index(){
        try{
            return await (await this.connection).query(`SELECT * FROM ${this.table}`)
        }catch (error) {
            console.log(error)
        }
    }

    async find(id){
        try{
            const result = await (await this.connection).query(`SELECT * FROM ${this.table} WHERE id = ${id}`);
            return result[0];
        }catch (error){
            console.log(error);
        }
    }
}

module.exports = { Sabelotodo }