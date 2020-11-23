
import UserDAO from '../dao/UserDAO';

class UserController {
  async listAllUsers (req, res) {
    var result = await UserDAO.listAllUsers();

    return res.json(result);
  }
}

export default new UserController();
