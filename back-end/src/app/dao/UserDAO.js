import Connection from './Connection';

class UserDAO {
  async listAllUsers(req, res) {
    const result = await Connection.pool.query("SELECT * FROM school.school;");

    return result.rows;
  }

  async getUser(email) {
      const result = await Connection.pool.query(`SELECT * FROM school.user WHERE email = '${email}'`);
    
      return result.rows[0];
    }

  async register(userModel) {
      const result = await Connection.pool.query(`INSERT INTO school.user( email, password, name, age, genre, status, profile) VALUES (
        '${userModel.email}', 
        '${userModel.password}', 
        '${userModel.name}', 
        '${userModel.age}', 
        '${userModel.genre}', 
        '${userModel.status}', 
        '${userModel.profile}')`
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

  async linkStudentToClass(idclass, iduser) {
    const result = await Connection.pool.query(`
    INSERT INTO school.class_details(
      idclass, idstudent, evaluation1, evaluation2, evaluation3, status)
      VALUES (
        ${idclass}, 
        ${iduser}, 
        ${0}, 
        ${0}, 
        ${0}, 
        'T'
        );
    `);
    return result.rows;
  }

  async checkIfStudentLinkedToClass(idclass, iduser) {
    const result = await Connection.pool.query(`
    SELECT *
	    FROM school.class_details WHERE idclass = ${idclass} AND idstudent = ${iduser};
    `)
    return result.rows.length === 1;
  }
}

export default new UserDAO();
