require("dotenv-safe").config();

class Connection {
  constructor() {
    this.pool = new require('pg').Pool({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.PORT
    });
  }
}

export default new Connection();
