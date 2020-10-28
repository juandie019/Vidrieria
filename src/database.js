const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vidrieria'
});

function getConnection() {
  return connection;
}
function print(){
    console.log('nada');
}
module.exports = { getConnection, print };
