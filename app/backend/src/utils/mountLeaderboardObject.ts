import IMatch from '../interfaces/matches.interface';
import { getHomeMathesData, getAwayMatchesData } from './getMatchesData';

export default function mountLeaderboardObject(id: number, matches: IMatch[], teamType: string) {
  const isHome = teamType === 'homeTeam';
  const matchesData = isHome ? getHomeMathesData(id, matches) : getAwayMatchesData(id, matches);

  const { totalPoints, playedMatches, matchesWon,
    matchesDraw, goalsFavor, goalsOwn, goalsBalance } = matchesData;

  const efficiency = ((totalPoints / (playedMatches.length * 3)) * 100).toFixed(2);

  const name = isHome ? playedMatches[0].homeTeam?.teamName : playedMatches[0].awayTeam?.teamName;

  return {
    name,
    totalPoints,
    totalGames: playedMatches.length,
    totalVictories: matchesWon.length,
    totalDraws: matchesDraw.length,
    totalLosses: playedMatches.length - matchesWon.length - matchesDraw.length,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency,
  };
}
