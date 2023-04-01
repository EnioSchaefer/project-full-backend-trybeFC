import Leaderboard from '../interfaces/leaderboard.interface';
import IMatch from '../interfaces/matches.interface';
import mountLeaderboardObject from './mountLeaderboardObject';

export default function mountLeaderboard(
  matches: IMatch[],
  teamsIds: number[],
  teamType: string,
): Leaderboard[] {
  const leaderBoard = teamsIds.map((id) => mountLeaderboardObject(id, matches, teamType));

  return leaderBoard;
}
