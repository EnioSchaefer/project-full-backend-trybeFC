import mountFullLeaderboard from '../utils/mountFullLeaderboard';
import sortLeaderboard from '../utils/sortLeaderboard';
import TeamsModel from '../database/models/Teams.model';
import MatchesModel from '../database/models/Matches.model';
import mountLeaderboard from '../utils/mountLeaderboard';

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

    const leaderBoard = mountLeaderboard(matches, teamsIds, 'homeTeam');

    const sortedLeaderboard = sortLeaderboard(leaderBoard);

    return sortedLeaderboard;
  }

  public async getAwayTeamsLeaderboard() {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      attributes: { exclude: ['id', 'HomeTeamId'] },
    });

    const teamsIds = [...new Map(matches.map((item) =>
      [item.awayTeamId, item.awayTeamId])).values()];

    const leaderBoard = mountLeaderboard(matches, teamsIds, 'awayTeam');

    const sortedLeaderboard = sortLeaderboard(leaderBoard);

    return sortedLeaderboard;
  }

  public async getTeamsLeaderboard() {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } }],
      attributes: { exclude: ['id', 'HomeTeamId'] },
    });

    const homeTeamsIds = [...new Map(matches.map((item) =>
      [item.homeTeamId, item.homeTeamId])).values()];

    const awayTeamsIds = [...new Map(matches.map((item) =>
      [item.awayTeamId, item.awayTeamId])).values()];

    const fullLeaderboard = mountFullLeaderboard(matches, homeTeamsIds, awayTeamsIds);

    const sortedFullLeaderboard = sortLeaderboard(fullLeaderboard);

    return sortedFullLeaderboard;
  }
}
