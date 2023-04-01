import IMatch from '../interfaces/matches.interface';

function getHomeMathesData(id: number, matches: IMatch[]) {
  const playedMatches = matches.filter((mat) => mat.homeTeamId === id);
  const matchesWon = playedMatches.filter((mat) => mat.homeTeamGoals > mat.awayTeamGoals);
  const matchesDraw = playedMatches.filter((mat) => mat.homeTeamGoals === mat.awayTeamGoals);

  let goalsFavor = 0; let goalsOwn = 0;
  playedMatches.forEach((mat) => {
    goalsFavor += mat.homeTeamGoals; goalsOwn += mat.awayTeamGoals;
  });

  const goalsBalance = goalsFavor - goalsOwn;
  const totalPoints = (matchesWon.length * 3) + matchesDraw.length;

  return {
    totalPoints, playedMatches, matchesWon, matchesDraw, goalsFavor, goalsOwn, goalsBalance,
  };
}

function getAwayMatchesData(id: number, matches: IMatch[]) {
  const playedMatches = matches.filter((mat) => mat.awayTeamId === id);
  const matchesWon = playedMatches.filter((mat) => mat.awayTeamGoals > mat.homeTeamGoals);
  const matchesDraw = playedMatches.filter((mat) => mat.awayTeamGoals === mat.homeTeamGoals);

  let goalsFavor = 0; let goalsOwn = 0;
  playedMatches.forEach((mat) => {
    goalsFavor += mat.awayTeamGoals; goalsOwn += mat.homeTeamGoals;
  });

  const goalsBalance = goalsFavor - goalsOwn;
  const totalPoints = (matchesWon.length * 3) + matchesDraw.length;

  return {
    totalPoints, playedMatches, matchesWon, matchesDraw, goalsFavor, goalsOwn, goalsBalance,
  };
}

export { getHomeMathesData, getAwayMatchesData };
