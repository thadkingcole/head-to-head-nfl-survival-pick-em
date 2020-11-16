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
      {console.log(games)}
      <h2>Week {weekNum}</h2>
      <Table size="sm">
        <thead>
          <tr className="text-nowrap">
            <th>Away</th>
            <th></th>
            <th>Home</th>
            <th></th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Schedule;
