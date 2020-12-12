require("dotenv-safe").config();
const pg = require('pg');

class Connection {
  constructor() {
    this.pool = new pg.Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'school',
      password: '12345678',
      port: 5432,
    });
  }
}

export default new Connection();
