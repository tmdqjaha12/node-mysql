const Core = require("./db/core");

class Index_model extends Core {
  count;

  constructor() {
    super();
    this.count = 0;
  }

  async getUserList(params = "") {
    const result = await this.excute("SELECT * FROM `users`");
    return result;
  }
}

module.exports = new Index_model();
