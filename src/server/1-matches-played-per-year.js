function calculateMatchesPlayedPerYear(matches) {
  let matchesPlayed = {};
  matches.forEach((match) => {
    if (matchesPlayed[match.season]) {
      matchesPlayed[match.season] += 1;
    } else {
      matchesPlayed[match.season] = 1;
    }
  });
  return matchesPlayed;
}

export default calculateMatchesPlayedPerYear;
