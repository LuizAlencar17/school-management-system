import UserDAO from '../dao/UserDAO';
import UserModel from '../models/UserModel';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

require("dotenv-safe").config();

class UserController {
  async listAllUsers (req, res) {
    var result = await UserDAO.listAllUsers();

    return res.json(result);
  }

  async login (req, res) {
    const { email, password } = req.body;

    try {
      var user = await UserDAO.getUser(email);
  
      if(await bcrypt.compare(password, user.password)){
        return res.status(200).json({
          token: jwt.sign({ user: user }, process.env.SECRET),
        });
        
      }else{
        return res.status(400).send('Login invalid!');
      }
   }
   catch (e) {
    return res.status(400).send('Login invalid!');
   }
  }

  async register (req, res) {
    var userModel = new UserModel(
      req.body.email,
      await bcrypt.hash(req.body.password, 8),
      req.body.name,
      req.body.age,
      req.body.genre,
      req.body.status,
      req.body.profile,
    );

    var result = await UserDAO.register(userModel);
    if(result){
      return res.status(200).send("User successfully registered");
    }else{
      return res.status(400).send("User not registered");
    }
  }

  async getClassByUser (req, res) {
    var result = await UserDAO.getClassByUser(req.body.id);
    if(result){
      return res.status(200).send(result);
    }else{
      return res.status(400).send("User not registered");
    }
  }

  async linkStudentToClass (req, res) {
    const { email, idclass } = req.body;
    var user = await UserDAO.getUser(email);
    if(await UserDAO.checkIfStudentLinkedToClass(idclass, user.iduser)){
      return res.status(400).send('This student is already in that class!');
    }
    try{
      var result = await UserDAO.linkStudentToClass(idclass, user.iduser);
      return res.status(200).send('Student successfully linked!');
    }catch (e) {
      return res.status(400).send('An error has occurred. Check if the email is correct!');
    }
  }

  
}
export default new UserController();
