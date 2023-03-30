import messageObject from '../interfaces/messageObject.interface';
import IMatch from '../interfaces/matches.interface';
import MatchesModel from '../database/models/Matches.model';
import TeamsModel from '../database/models/Teams.model';

export default class MatchesService {
  protected model = MatchesModel;

  public async getAllMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }] });

    return matches;
  }

  public async getInProgressMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: true },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });

    return matches;
  }

  public async getEndedMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });

    return matches;
  }

  public async finishMatch(matchId: number): Promise<messageObject> {
    await this.model.update({ inProgress: false }, { where: { id: matchId } });

    return ({ message: 'Finished' });
  }

  public async updateMatch(matchId: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id: matchId } });
  }
}
