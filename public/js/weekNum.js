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
        const gameEL = document.createElement("div");
        // TODO change to table vice list
        gameEL.innerText = `${game.time} | ${game.away} @ ${game.home}`;
        gamesEl.appendChild(gameEL);
      });
    });
}

// * event listeners
getWeekGames();
weekEl.onchange = getWeekGames;
