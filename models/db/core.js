const { conn } = require("./db_connect.js");

class Core {
  connect;
  constructor() {
    this.connect = conn();
  }

  async excute(queryStr = "") {
    return new Promise((resolve, reject) => {
      this.connect.query(queryStr, (err, result, fields) => {
        if (err) {
          // Returning the error
          reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = Core;
