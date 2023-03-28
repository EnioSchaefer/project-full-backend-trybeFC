import ITeam from '../../interfaces/team.interface';
import TeamsModel from '../models/Teams.model';

class TeamsService {
  public model = TeamsModel;

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }
}

export default TeamsService;
