import ILeaderboard from '../interfaces/leaderboard.interface';

export default function sortLeaderboard(leaderBoard: ILeaderboard[]): ILeaderboard[] {
  const sortedLeaderboard = leaderBoard.sort((teamA, teamB) => {
    if (teamA.totalPoints > teamB.totalPoints) return -1;
    if (teamA.totalPoints < teamB.totalPoints) return 1;

    if (teamA.totalVictories > teamB.totalVictories) return -1;
    if (teamA.totalVictories < teamB.totalVictories) return 1;

    if (teamA.goalsBalance > teamB.goalsBalance) return -1;
    if (teamA.goalsBalance < teamB.goalsBalance) return 1;

    if (teamA.goalsFavor > teamB.goalsFavor) return -1;
    if (teamA.goalsFavor < teamB.goalsFavor) return 1;

    return 0;
  });

  return sortedLeaderboard;
}
