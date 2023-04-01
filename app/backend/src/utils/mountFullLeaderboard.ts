import IMatch from '../interfaces/matches.interface';
import joinLeaderboards from './joinLeaderboards';
import mountLeaderboardObject from './mountLeaderboardObject';

export default function mountFullLeaderboard(
  matches: IMatch[],
  homeTeamsIds: number[],
  awayTeamsIds: number[],
) {
  const homeLeaderboard = homeTeamsIds.map((id) => mountLeaderboardObject(id, matches, 'homeTeam'));

  const awayLeaderboard = awayTeamsIds.map((id) => mountLeaderboardObject(id, matches, 'awayTeam'));

  const fullLeaderboard = homeLeaderboard.map((homeTeam) => {
    const sameTeam = awayLeaderboard
      .find((awayTeam) => awayTeam.name === homeTeam.name) || homeTeam;

    const joinedTeam = joinLeaderboards(homeTeam, sameTeam);

    return joinedTeam;
  });

  return fullLeaderboard;
}
