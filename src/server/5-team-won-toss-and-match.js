function calculateTeamWonTossAndMatch(matches) {
  let teamWonTossAndMatch = {};
  matches.forEach((match) => {
    if (match.winner === match.toss_winner) {
      if (teamWonTossAndMatch[match.winner]) {
        teamWonTossAndMatch[match.winner] += 1;
      } else {
        teamWonTossAndMatch[match.winner] = 1;
      }
    }
  });
  return teamWonTossAndMatch;
}

export default calculateTeamWonTossAndMatch;
