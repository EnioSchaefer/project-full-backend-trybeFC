import * as bcjs from 'bcryptjs';
import messageObject from '../interfaces/messageObject.interface';
import IUser from '../interfaces/users.interface';
import UsersModel from '../database/models/Users.model';

export default class UsersService {
  protected model = UsersModel;

  public async userLogin(
    receivedEmail: string,
    receivedPassword: string,
  ): Promise<IUser | messageObject> {
    const userDB = await this.model.findOne({ where: { email: receivedEmail } });

    if (!userDB) return ({ message: 'Invalid email or password' });

    const matchPassword = bcjs.compareSync(receivedPassword, userDB.password);

    if (!matchPassword) return ({ message: 'Invalid email or password' });

    const { password, ...userWithoutPassword } = userDB;

    return userWithoutPassword;
  }
}
