import ILeaderboard from '../interfaces/leaderboard.interface';

export default function joinLeaderboards(
  homeTeam: ILeaderboard,
  awayTeam: ILeaderboard,
) {
  const totalPoints = Number(homeTeam?.totalPoints) + Number(awayTeam?.totalPoints);
  const totalGames = Number(homeTeam?.totalGames) + Number(awayTeam?.totalGames);
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return {
    name: homeTeam?.name,
    totalPoints,
    totalGames,
    totalVictories: Number(homeTeam?.totalVictories) + Number(awayTeam?.totalVictories),
    totalDraws: Number(homeTeam?.totalDraws) + Number(awayTeam?.totalDraws),
    totalLosses: Number(homeTeam?.totalLosses) + Number(awayTeam?.totalLosses),
    goalsFavor: Number(homeTeam?.goalsFavor) + Number(awayTeam?.goalsFavor),
    goalsOwn: Number(homeTeam?.goalsOwn) + Number(awayTeam?.goalsOwn),
    goalsBalance: Number(homeTeam?.goalsBalance) + Number(awayTeam?.goalsBalance),
    efficiency,
  };
}
