import fs from 'fs';
import csv from 'csv-parser';

import calculateMatchesPlayedPerYear from '../server/1-matches-played-per-year.js';
import calculateMatchesWonPerTeamPerYear from '../server/2-matches-won-per-team-per-year.js';
import calculateExtraRunsConceded from '../server/3-extra-runs-conceded-per-team-in-2016.js';
import calculateTop10EconomicalBowler2015 from '../server/4-top-10-economical-bowler-2015.js';
import calculateTeamWonTossAndMatch from '../server/5-team-won-toss-and-match.js';
import calculateHighestNoOsPotmEachSeason from '../server/6-highest-no-of-potm-each-season.js';
import calculateStrikeRateOfaBatsman from '../server/7-strike-rate-of-a-batsman.js';
import calculatePlayerDismissedByAnotherPlayer from '../server/8-player-dismissed-by-another-player.js';
import calculateBowlerWithBestEconomyInSuperover from '../server/9-bowler-with-best-economy-in-super-over.js';

const matchesFilePath = '../data/matches.csv';
const deliveriesFilePath = '../data/deliveries.csv';

const matches = [];
const deliveries = [];

fs.createReadStream(matchesFilePath) // Reading matches.csv
  .pipe(csv({}))
  .on('data', (match) => {
    matches.push(match);
  })
  .on('end', () => {
    // Fininshed reading matches.csv
    fs.createReadStream(deliveriesFilePath) // Reading deliveries.csv
      .pipe(csv({}))
      .on('data', (delivery) => {
        deliveries.push(delivery);
      })
      .on('end', () => {
        // Fininshed reading deliveries.csv

        // Problem 1: Number of matches played per year for all the years in IPL.
        const matchesPlayedPerYear = calculateMatchesPlayedPerYear(matches);
        saveJSONdata(matchesPlayedPerYear, './output/matchesPerYear.json');

        // Problem 2: Number of matches won per team per year in IPL.
        const matchesWonPerTeamPerYear =
          calculateMatchesWonPerTeamPerYear(matches);
        saveJSONdata(
          matchesWonPerTeamPerYear,
          './output/matchesWonPerTeamPerYear.json'
        );

        // Problem 3: Extra runs conceded per team in the year 2016
        const extraRunsConceded = calculateExtraRunsConceded(
          deliveries,
          matches
        );
        saveJSONdata(
          extraRunsConceded,
          './output/extraRunsConcededPerTeamIn2016.json'
        );

        // Problem 4: Top 10 economical bowlers in the year 2015
        const top10bowlers = calculateTop10EconomicalBowler2015(
          deliveries,
          matches
        );
        saveJSONdata(top10bowlers, './output/top10EconomicalBowlers2015.json');

        // Problem 5: Find the number of times each team won the toss and also won the match
        const teamWonTossAndMatch = calculateTeamWonTossAndMatch(matches);
        saveJSONdata(teamWonTossAndMatch, './output/teamWonTossAndMatch.json');

        // Problem 6: Find a player who has won the highest number of Player of the Match awards for each season
        const highestNoOfPotmEachSeason =
          calculateHighestNoOsPotmEachSeason(matches);
        saveJSONdata(
          highestNoOfPotmEachSeason,
          './output/highestNoOfPotmEachSeason.json'
        );

        // Problem 7: Find the strike rate of a batsman for each season
        const batsmanStrikeRate = calculateStrikeRateOfaBatsman(
          deliveries,
          matches,
          'MS Dhoni'
        );
        saveJSONdata(batsmanStrikeRate, './output/batsmanStrikeRate.json');

        // Problem 8: Find the highest number of times one player has been dismissed by another player
        const playerDismissedByAnotherPlayer =
          calculatePlayerDismissedByAnotherPlayer(deliveries);
        saveJSONdata(
          playerDismissedByAnotherPlayer,
          './output/playerDismissedByAnotherPlayer.json'
        );

        // Problem 9: Find the bowler with the best economy in super overs
        const bowlerWithBestEconomyInSuperover =
          calculateBowlerWithBestEconomyInSuperover(deliveries);
        saveJSONdata(
          bowlerWithBestEconomyInSuperover,
          './output/bowlerWithBestEconomyInSuperover.json'
        );
      });
  });

function saveJSONdata(data, filepath) {
  const JSONdata = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(filepath, JSONdata);
    console.log(`File has been saved to path ${filepath}`);
  } catch (error) {
    console.log('Error occurred when saving JSON data:', error);
  }
}
