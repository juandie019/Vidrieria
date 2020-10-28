const mysql = require('promise-mysql');

class Connection{
  constructor(){
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'vidrieria'
    });
  }
}

module.exports = { Connection };
