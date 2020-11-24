import UserDAO from '../dao/UserDAO';
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

    var user = await UserDAO.getUser(email);
    var password_hash = await bcrypt.hash(password, 8);

    if(bcrypt.compare(password_hash, user.password)){
      return res.json({
        user: user,
        token: jwt.sign({ iduser: user.iduser }, process.env.SECRET),
      });
    }else{
      return res.send('Login invalid!');
    }
  }
}

export default new UserController();
