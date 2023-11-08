function calculateExtraRunsConceded(delveries, matches) {
  let extraRuns = {};
  const match_id = matches
    .filter((match) => match.season === '2016')
    .map((match) => match.id);

  delveries.forEach((delivery) => {
    if (match_id.includes(delivery.match_id)) {
      if (extraRuns[delivery.bowling_team]) {
        extraRuns[delivery.bowling_team] += parseInt(delivery.extra_runs);
      } else {
        extraRuns[delivery.bowling_team] = parseInt(delivery.extra_runs);
      }
    }
  });

  return extraRuns;
}

export default calculateExtraRunsConceded;
