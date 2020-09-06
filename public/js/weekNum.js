// * global variables
const weekEl = document.getElementById("week");
const gamesTable = document.getElementById("games");

// TODO get current week from "standings" sportradar endpoint

// * functions
function getWeekGames() {
  // * takes weekNum and returns array of NFL games in the given week
  // remove any games in gamesTable
  while (gamesTable.hasChildNodes()) {
    gamesTable.removeChild(gamesTable.firstChild);
  }
  // get the week number from the dropdown list
  const weekNum = weekEl.value;
  // send to our server api
  fetch(`/week/${weekNum}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((game) => {
        // display gametime in client's local time
        game.time = moment(game.time).local().format("dd M/D h:mm a");

        // create top row for away team
        const awayRow = document.createElement("tr");
        // put game time in first cell
        const gameTime = document.createElement("td");
        gameTime.innerText = game.time;
        // put away team in 2nd cell
        const awayTeam = document.createElement("td");
        awayTeam.innerText = game.away;
        // make space for away score
        const awayScore = document.createElement("td");
        // put away row all together
        awayRow.appendChild(gameTime);
        awayRow.appendChild(awayTeam);
        awayRow.appendChild(awayScore); // will be filled in later

        // create bottom row for home team
        const homeRow = document.createElement("tr");
        homeRow.className = "border-bottom";
        // put "@" symbol in first cell
        const atEl = document.createElement("td");
        atEl.innerText = "@";
        atEl.className = "text-right";
        // put home team in 2nd cell
        const homeTeam = document.createElement("td");
        homeTeam.innerText = game.home;
        // make space for home score
        const homeScore = document.createElement("td");
        // put home row together
        homeRow.appendChild(atEl);
        homeRow.appendChild(homeTeam);
        homeRow.appendChild(homeScore); // will be filled in later

        // include game score if available
        if (game.score) {
          awayScore.innerText = game.score.away;
          homeScore.innerText = game.score.home;
        }

        // put both rows on table
        gamesTable.appendChild(awayRow);
        gamesTable.appendChild(homeRow);
      });
    });
}

// * event listeners
getWeekGames();
weekEl.onchange = getWeekGames;
