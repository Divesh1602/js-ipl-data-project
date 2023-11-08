function calculateBowlerWithBestEconomyInSuperover(deliveries) {
  let bowler_data = {};

  deliveries.forEach((delivery) => {
    if (parseInt(delivery.is_super_over) === 1) {
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
    const bowlers_economy = (economy[0] / (economy[1] / 6)).toFixed(2);
    bowler_economy_list[bowler_name] = parseFloat(bowlers_economy);
  });

  const bestbowler = Object.entries(bowler_economy_list)
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .slice(0, 1);

  return {
    bowler: bestbowler[0][0],
    economy: bestbowler[0][1],
  };
}

export default calculateBowlerWithBestEconomyInSuperover;
