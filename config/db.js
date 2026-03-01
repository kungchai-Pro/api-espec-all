const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: '27.254.142.146',
//   user: 'admin',
//   password:'adminPass888!',
//   database: 'tds_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0
// });
// module.exports=pool;

const pool = mysql.createPool({
    host: '27.254.142.146',
    user: 'admin',
    password:'adminPass888!',
    database: 'espec_db',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
  
module.exports=pool;