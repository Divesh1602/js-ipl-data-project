function calculateTop10EconomicalBowler2015(delveries, matches) {
  let bowler_data = {};
  const match_id = matches
    .filter((match) => match.season === '2015')
    .map((match) => match.id);

  delveries.forEach((delivery) => {
    if (match_id.includes(delivery.match_id)) {
      if (bowler_data[delivery.bowler]) {
        bowler_data[delivery.bowler][0] += parseInt(delivery.total_runs);
        bowler_data[delivery.bowler][1] += 1;
      } else {
        bowler_data[delivery.bowler] = [parseInt(delivery.total_runs), 1];
      }
    }
  });

  let bowler_economy_list = {};
  Object.entries(bowler_data).forEach(([bowler_name, economy]) => {
    if (economy[1] >= 120) {
      const bowlers_economy = (economy[0] / (economy[1] / 6)).toFixed(2);
      bowler_economy_list[bowler_name] = parseFloat(bowlers_economy);
    }
  });

  const top10bowlers = Object.entries(bowler_economy_list)
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .slice(0, 10);
  let top10bowlersobject = {};
  top10bowlers.forEach((bowler) => {
    top10bowlersobject[bowler[0]] = bowler[1];
  });
  return top10bowlersobject;
}

export default calculateTop10EconomicalBowler2015;
