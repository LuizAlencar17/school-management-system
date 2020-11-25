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
      var password_hash = await bcrypt.hash(password, 8);
  
      if(bcrypt.compare(password_hash, user.password)){
        return res.status(200).json({
          user: user,
          token: jwt.sign({ iduser: user.iduser }, process.env.SECRET),
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
      );

    var result = await UserDAO.register(userModel);
    var message = "";
    if(result){
      return res.status(200).send("User successfully registered");
    }else{
      return res.status(400).send("User not registered");
    }
  }
}

export default new UserController();
