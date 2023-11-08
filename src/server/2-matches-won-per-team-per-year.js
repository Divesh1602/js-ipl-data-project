function calculateMatchesWonPerTeamPerYear(matches) {
  let matchesWon = {};
  matches.forEach((match) => {
    if (matchesWon[match.winner]) {
      if (matchesWon[match.winner][match.season]) {
        matchesWon[match.winner][match.season] += 1;
      } else {
        matchesWon[match.winner][match.season] = 1;
      }
    } else {
      matchesWon[match.winner] = {};
      matchesWon[match.winner][match.season] = 1;
    }
  });
  return matchesWon;
}

export default calculateMatchesWonPerTeamPerYear;
