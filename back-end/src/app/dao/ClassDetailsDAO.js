import Connection from './Connection';

class ClassDetailsDAO {
  async getClassDetailsInformationByIdClass(idclass) {
    const result = await Connection.pool.query(`
    SELECT 
    cd.idclass_details, 
    cd.idclass, 
    cd.idstudent, 
    u.name,
    u.email,
    cd.evaluation1, 
    cd.evaluation2, 
    cd.evaluation3, 
    cd.status
    FROM school.class_details cd
    INNER JOIN school.user u
    ON u.iduser = cd.idstudent
    AND ${idclass} = idclass;
    `);
    return result.rows;
  }
}

export default new ClassDetailsDAO();
