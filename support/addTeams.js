// * add NFL teams to the sequelize team model
// should only need to be done once

// * required modules
const db = require("../models");
const teams = require("./teams.json"); // team data should not change very often

db.sequelize.sync().then(() => {
  // 1) check to see whether the team model is empty
  db.Team.count().then((teamCount) => {
    // if teamCount is not 0, no teams will be added
    if (teamCount !== 0) {
      console.log(`number of teams is ${teamCount}, exiting script...`);
      return;
    }

    // 2) get team data from sportradar api (imported from ./teams.json)
    // ! ./teams.json has been heavily altered from its original format as the
    // ! return from sportradar api for NFL league hierarchy
    // ! this should be fine because team data changes very rarely
    // ! and when it happens it will be only be 1 or 2 changes at a time
    // ! this is maintainable

    teams.forEach((team) => {
      db.Team.create({
        name: team.name,
        location: team.market,
        abbr: team.alias,
        color1: team.color1,
        color2: team.color2,
      });
    });
  });
});
