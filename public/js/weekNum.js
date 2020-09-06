// * global variables
const weekEl = document.getElementById("week");
const gamesEl = document.getElementById("games");

// TODO get current week from "standings" sportradar endpoint

// * functions
function getWeekGames() {
  // * takes weekNum and returns array of NFL games in the given week
  // remove any games in gamesEl
  while (gamesEl.hasChildNodes()) {
    gamesEl.removeChild(gamesEl.firstChild);
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
        const gameEL = document.createElement("div");
        // TODO change to table vice list
        // include game score if available
        if (game.score) {
          gameEL.innerText = `${game.time} ${game.away} ${game.score.away} @ ${game.home} ${game.score.home}`;
        } else {
          gameEL.innerText = `${game.time} ${game.away} @ ${game.home}`;
        }
        gamesEl.appendChild(gameEL);
      });
    });
}

// * event listeners
getWeekGames();
weekEl.onchange = getWeekGames;
