import Connection from './Connection';

class UserDAO {
  async listAllUsers(req, res) {
    const result = await Connection.pool.query("SELECT * FROM school.user");

    return result.rows;
  }
}

export default new UserDAO();
