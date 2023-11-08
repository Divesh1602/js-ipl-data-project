function calculateHighestNoOsPotmEachSeason(matches) {
  let playerOfTheMatchData = {};

  matches.forEach((match) => {
    if (playerOfTheMatchData[match.season]) {
      if (playerOfTheMatchData[match.season][match.player_of_match]) {
        playerOfTheMatchData[match.season][match.player_of_match] += 1;
      } else {
        playerOfTheMatchData[match.season][match.player_of_match] = 1;
      }
    } else {
      playerOfTheMatchData[match.season] = {};
      playerOfTheMatchData[match.season][match.player_of_match] = 1;
    }
  });

  let highestNoOsPotmEachSeason = [];
  Object.entries(playerOfTheMatchData).forEach(([season, player_data]) => {
    const data_obj = Object.entries(player_data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1);
    const obj = {
      season: season,
      player: data_obj[0][0],
      count: data_obj[0][1],
    };
    highestNoOsPotmEachSeason.push(obj);
  });
  return highestNoOsPotmEachSeason;
}

export default calculateHighestNoOsPotmEachSeason;
