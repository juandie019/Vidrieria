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
            console.log(error)
            throw error;
        }
    }

    async update(element){
        try {
            return await (await this.connection).query(`UPDATE ${this.table} SET ? WHERE id = ?`, [element, element.id]);
        } catch (error) {
            
        }
    }

    async index(table = this.table){
        try{
            return await (await this.connection).query(`SELECT * FROM ${table}`)
        }catch (error) {
            console.log(error)
        }
    }

    async find(id, table = this.table){
        try{
            const result = await (await this.connection).query(`SELECT * FROM ${table} WHERE id = ${id}`);
            return result[0];
        }catch (error){
            console.log(error);
        }
    }

    async create2(table = this.table, element){
        console.log('segundo create')
        try {
            return await (await this.connection).query(`INSERT INTO ${table} SET ?`, element);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}

module.exports = { Sabelotodo }