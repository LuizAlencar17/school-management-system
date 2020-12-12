import Connection from './Connection';

class ClassDAO {
  async getClassInformationFromTeacher(idteacher) {
    const result = await Connection.pool.query(`
    SELECT * 
    FROM 
    school.class
    WHERE ${idteacher} = idteacher;
    `);
    return result.rows;
  }
}

export default new ClassDAO();
