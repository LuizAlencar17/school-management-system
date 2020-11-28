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
      return result;
  }

  async getClassByUser(iduser) {
      const result = await Connection.pool.query(`
      SELECT 
        us.name as teacher,
        cl.name,
        cl.code,
        cd.evaluation1, 
        cd.evaluation2, 
        cd.evaluation3,
        cd.status
      FROM 
        school.class_details cd, 
        school.class cl, 
        school.user us
      WHERE 
        cd.idstudent = ${iduser} 
      AND 
        cl.idclass = cd.idclass
      AND 
        us.iduser = cl.idteacher
      `)
      return result.rows;
  }
}

export default new UserDAO();
