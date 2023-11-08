function calculateStrikeRateOfaBatsman(deliveries, matches, batsman) {
  const batsman_deliveries = deliveries.filter((delivery) => {
    return delivery.batsman === batsman;
  });

  let batsman_data = {};

  batsman_deliveries.forEach((delivery) => {
    const match = matches.find((match) => {
      return match.id === delivery.match_id;
    });

    if (match) {
      if (batsman_data[match.season]) {
        batsman_data[match.season][0] += parseInt(delivery.batsman_runs);
        if (
          (parseInt(delivery.wide_runs) ||
            parseInt(delivery.legbye_runs) ||
            parseInt(delivery.noball_runs)) !== 0
        ) {
          batsman_data[match.season][1] += 0;
        } else {
          batsman_data[match.season][1] += 1;
        }
      } else {
        if (
          (parseInt(delivery.wide_runs) ||
            parseInt(delivery.legbye_runs) ||
            parseInt(delivery.noball_runs)) !== 0
        ) {
          batsman_data[match.season] = [parseInt(delivery.batsman_runs), 0];
        } else {
          batsman_data[match.season] = [parseInt(delivery.batsman_runs), 1];
        }
      }
    }
  });
  let batsmanStrikeRate = {};
  Object.entries(batsman_data).forEach(([season, rate_data]) => {
    const strike_rate = parseFloat(
      ((rate_data[0] / rate_data[1]) * 100).toFixed(2)
    );
    batsmanStrikeRate[season] = strike_rate;
  });
  return batsmanStrikeRate;
}

export default calculateStrikeRateOfaBatsman;
