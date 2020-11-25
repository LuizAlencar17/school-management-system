import Connection from './Connection';
import UserModel from '../models/UserModel';

class UserDAO {
  async listAllUsers(req, res) {
    const result = await Connection.pool.query("SELECT * FROM school.user");

    return result.rows;
  }

  async getUser(email) {
      const result = await Connection.pool.query(`SELECT * FROM school.user WHERE email = '${email}'`);
    
      return result.rows[0];
    }

  async register(userModel) {
      const result = await Connection.pool.query(`INSERT INTO school.user( email, password, name, age, genre, status) VALUES (
        '${userModel.email}', 
        '${userModel.password}', 
        '${userModel.name}', 
        '${userModel.age}', 
        '${userModel.genre}', 
        '${userModel.status}')`
      );
  }
}

export default new UserDAO();
