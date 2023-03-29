import * as bcjs from 'bcryptjs';
import errorObject from '../../interfaces/errorObject.interface';
import IUser from '../../interfaces/users.interface';
import UsersModel from '../models/Users.model';

export default class UsersService {
  protected model = UsersModel;

  public async userLogin(
    receivedEmail: string,
    receivedPassword: string,
  ): Promise<IUser | errorObject> {
    const userDB = await this.model.findOne({ where: { email: receivedEmail } });

    if (!userDB) return ({ message: 'Invalid email or password' });

    const matchPassword = bcjs.compareSync(receivedPassword, userDB.password);

    if (!matchPassword) return ({ message: 'Invalid email or password' });

    const { password, id, ...cleanUser } = userDB;

    return cleanUser;
  }
}
