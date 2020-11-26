import Axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Schedule() {
  const [weekNum, setWeekNum] = useState(0);
  const [games, setGames] = useState([]);

  const weekList = [];
  for (let i = 1; i <= 17; i++) {
    weekList.push(i);
  }

  // default query url - returns week
  const scheduleUrl =
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";

  // user selected week query url
  const weekUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${weekNum}`;

  useEffect(() => {
    if (!weekNum) {
      Axios.get(scheduleUrl)
        .then((res) => {
          setWeekNum(res.data.week.number);
          setGames(res.data.events);
        })
        .catch((err) => console.error(err));
    } else {
      Axios.get(weekUrl)
        .then((res) => setGames(res.data.events))
        .catch((err) => console.error(err));
    }
  }, [weekNum, weekUrl]);

  function handleChange(e) {
    setWeekNum(e.target.value);
  }

  return (
    <>
      <Row>
        <Col>
          <h2>Week {weekNum}</h2>
        </Col>
        <Col className="text-right">
          <label>Show Week:</label>
          <select name="weekNum" id="weekNum" onChange={handleChange}>
            {weekList.map((n) => {
              if (weekNum === n) {
                return (
                  <option key={n} value={n} selected>
                    {n}
                  </option>
                );
              }
              return (
                <option key={n} value={n}>
                  {n}
                </option>
              );
            })}
          </select>
        </Col>
      </Row>
      <Row>
        <Table size="sm" className="text-center">
          <thead>
            <tr className="text-center">
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
                    .map((team, i) => {
                      const teamStyle = {
                        backgroundColor: `#${team.team.color}`,
                        color: "white",
                      };
                      return i === 0 ? (
                        <Fragment key={team.team.uid}>
                          <td style={teamStyle}>
                            <img
                              src={team.team.logo}
                              alt={team.team.abbreviation}
                              width="25"
                              className="float-left"
                            />
                            {team.team.displayName}
                          </td>
                          <td style={teamStyle} className="text-nowrap">
                            {game.status.type.id >= 2
                              ? team.score
                              : team.records[0].summary}
                          </td>
                        </Fragment>
                      ) : (
                        <Fragment key={team.team.uid}>
                          <td style={teamStyle} className="text-nowrap">
                            {game.status.type.id >= 2
                              ? team.score
                              : team.records[0].summary}
                          </td>
                          <td style={teamStyle}>
                            <img
                              src={team.team.logo}
                              alt={team.team.abbreviation}
                              width="25"
                              className="float-right"
                            />
                            {team.team.displayName}
                          </td>
                        </Fragment>
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
      </Row>
    </>
  );
}

export default Schedule;
