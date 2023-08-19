import user from '../schemas/user';
import IUser from '../interfaces/user';

const saveUser = async (userData: IUser) => {
  try {
    return await user.create(userData);
  } catch (error) {
    console.error(error);
  }
};

const findUser = async (username: string) => {
  try {
    return await await user.findOne({ username }).exec();
  } catch (error) {
    console.error(error);
  }
};

export { saveUser, findUser };
