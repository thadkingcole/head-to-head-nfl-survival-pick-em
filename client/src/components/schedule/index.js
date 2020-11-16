import Axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function Schedule() {
  const [weekNum, setWeekNum] = useState(0);
  const [games, setGames] = useState([]);

  const scheduleUrl =
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";

  // get this week's game on page first load
  useEffect(() => {
    Axios.get(scheduleUrl)
      .then((res) => {
        setWeekNum(res.data.week.number);
        setGames(res.data.events);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Week {weekNum}</h2>
      <Table size="sm">
        <thead>
          <tr className="text-nowrap">
            <th colSpan="2">Away</th>
            <th colSpan="2">Home</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            return (
              <tr key={game.uid}>
                {game.competitions[0].competitors
                  // shallow copy to display away then home
                  .slice(0)
                  .reverse()
                  .map((team) => {
                    const teamStyle = {
                      backgroundColor: `#${team.team.color}`,
                      color: "white",
                    };
                    return (
                      <>
                        <td style={teamStyle}>
                          <img
                            src={team.team.logo}
                            alt={team.team.abbreviation}
                            width="25"
                            className="float-left"
                          />
                          {team.team.displayName}
                        </td>
                        <td style={teamStyle} className="text-center">
                          {game.status.type.id >= 2
                            ? team.score
                            : team.records[0].summary}
                        </td>
                      </>
                    );
                  })}
                {(() => {
                  switch (game.status.type.id) {
                    // scheduled game (not yet played)
                    case "1":
                      return <td>{game.status.type.shortDetail}</td>;

                    // game in progress
                    case "2":
                      return (
                        <td>
                          {game.status.displayClock} {game.status.period}Q
                        </td>
                      );

                    // completed game
                    case "3":
                      return <td>Final</td>;

                    // other
                    default:
                      return;
                  }
                })()}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Schedule;
