import Connection from './Connection';

class UserDAO {
  async listAllUsers(req, res) {
    const result = await Connection.pool.query("SELECT * FROM school.user");

    return result.rows;
  }

  async getUser(email) {
    const result = await Connection.pool.query(`SELECT * FROM school.user WHERE email = '${email}'`);

    return result.rows[0];
  }
}

export default new UserDAO();
