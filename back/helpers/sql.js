import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'HOSTNAME',
  user: 'USERNAME',
  password: 'PASSWORD',
  database: 'DB_NAME'
});

connection.connect((err) => {
  if (!err) {
    console.log('sqlDB connected');
  } else {
    console.log('Error connecting database');
  }
});

module.exports = connection;
