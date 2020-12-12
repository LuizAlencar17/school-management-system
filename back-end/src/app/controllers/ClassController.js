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
      res.status(400).send('Error');
    }
  }
  
}
export default new ClassController();
