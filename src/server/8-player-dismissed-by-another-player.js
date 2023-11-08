function calculatePlayerDismissedByAnotherPlayer(deliveries) {
  let dismissal_data = {};
  deliveries.forEach((delivery) => {
    if (delivery.player_dismissed !== '') {
      if (dismissal_data[delivery.bowler]) {
        if (dismissal_data[delivery.bowler][delivery.player_dismissed]) {
          dismissal_data[delivery.bowler][delivery.player_dismissed] += 1;
        } else {
          dismissal_data[delivery.bowler][delivery.player_dismissed] = 1;
        }
      } else {
        dismissal_data[delivery.bowler] = {};
        dismissal_data[delivery.bowler][delivery.player_dismissed] = 1;
      }
    }
  });

  let dismissal_list = [];
  Object.entries(dismissal_data).forEach(([bowler, player]) => {
    const obj_data = Object.entries(player)
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, 1);
    dismissal_list.push([bowler, obj_data[0][0], obj_data[0][1]]);
  });
  const sorted_dismissal_list = dismissal_list
    .sort((a, b) => {
      return b[2] - a[2];
    })
    .slice(0, 1);
  return {
    bowler: sorted_dismissal_list[0][0],
    batsman: sorted_dismissal_list[0][1],
    dismissals: sorted_dismissal_list[0][2],
  };
}

export default calculatePlayerDismissedByAnotherPlayer;
