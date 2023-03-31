import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matches.model';
import buildLeaderboard from '../utils/buildLeaderboard';

export default class LeaderboardService {
  protected matchesModel = MatchesModel;

  public async getHomeTeamsLeaderboard() {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } }],
      attributes: { exclude: ['id', 'awayTeamId'] },
    });

    const teamsIds = [...new Map(matches.map((item) =>
      [item.homeTeamId, item.homeTeamId])).values()];

    const leaderBoard = buildLeaderboard(matches, teamsIds);

    return leaderBoard;
  }
}
