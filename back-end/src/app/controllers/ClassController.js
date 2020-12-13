import ClassDAO from '../dao/ClassDAO';
import ClassDetailsDAO from '../dao/ClassDetailsDAO';

class ClassController {
  async getClassInformationFromTeacher (req, res) {
    try{
      var classes = await ClassDAO.getClassInformationFromTeacher(req.body.idteacher);
      if(classes.length === 0){
        return res.status(400).send('You don\'t have classes');
      }
      for(var i=0; i<classes.length; i++){
        var classDetails = await ClassDetailsDAO.getClassDetailsInformationByIdClass(classes[i].idclass);
        classes[i]['students'] = classDetails;
      }
      return res.status(200).json(classes);
    }catch(e){
      res.status(400).send('Error. Try again');
    }
  }

   async createClass (req, res) {
    try{
      // New code
      var classCode = Math.random().toString(36).substring(8);
      while(await ClassDAO.checkCode(classCode)){
        // New code
        classCode = Math.random().toString(36).substring(8);
      }
      req.body['code'] = classCode;
      await ClassDAO.createClass(req.body);
      return res.status(200).json('Class successfully created');
    }catch(e){
      res.status(400).send('Error. Try again');
    }
  }

  async deleteClass (req, res) {
    try{
      await ClassDAO.deleteClass(req.body.idclass);
      return res.status(200).json('Class successfully deleted');
    }catch(e){
      res.status(400).send('Error. Try again');
    }
  }
  
}
export default new ClassController();
