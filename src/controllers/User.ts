import User from "../models/User";

class Auth {
  // Register user
  register = async (req: any, res: any) => {
    try {
      const user = {
        userName: req.body.userName,
        password: req.body.password,
      }
      await User.create(user);
      
      res.send(`Register successfully ${user.userName}`);
    } catch (error) {
      console.error(error);
    }
  };
}

export default new Auth();
