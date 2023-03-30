import ITeam from '../interfaces/team.interface';
import TeamsModel from '../database/models/Teams.model';

class TeamsService {
  protected model = TeamsModel;

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  public async getTeamById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);

    return team;
  }
}

export default TeamsService;
