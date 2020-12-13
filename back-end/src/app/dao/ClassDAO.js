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
  async createClass(classData) {
    const result = await Connection.pool.query(`
    INSERT INTO school.class(
      idteacher, name, code, status)
      VALUES (
        ${classData.idteacher}, 
        '${classData.name}', 
        '${classData.code}', 
        'T');
    `);
    return result.rows;
  }

  async deleteClass(idclass) {
    const result = await Connection.pool.query(`
    DELETE FROM school.class
    WHERE idclass = ${idclass}
    `);
    return result.rows;
  }

  async checkCode(code) {
    const result = await Connection.pool.query(`
    SELECT idclass
    FROM school.class
    WHERE code = '${code}';
    `);
    return result.rows.length > 0;
  }
}

export default new ClassDAO();
