//database 연결구조
const db = require("mysql");
const config = require("./db_info").dev;

module.exports.conn = function () {
  const conn = db.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });
  conn.connect(function (err) {
    if (err) {
      console.error("에러 connect:" + err.stack);
      return;
    }
    console.log("Mysql DB Connect Successful! ID : " + conn.threadId);
  });
  return conn;
};

// conn.query('SELECT * from Users', (error, rows, fields) => {
//   if (error) throw error;
//   console.log('User info is: ', rows);
// });
// conn.end();
