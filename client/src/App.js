import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Schedule from "./components/schedule";
import Available from "./components/teams/Available";
import Picked from "./components/teams/Picked";
import axios from "axios";

function App() {
  const [allTeams, setAllTeams] = useState([]);

  const allTeamsUrl =
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?limit=32";

  useEffect(() => {
    axios
      .get(allTeamsUrl)
      .then((res) => setAllTeams(res.data.sports[0].leagues[0].teams))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Jumbotron>
        <Container>
          <h1>2 player NFL survival pick'em</h1>
          <p>NFL survival pick'em... with a twist!</p>
          <p>Currently under construction. Stay tuned!</p>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <Schedule />
          </Col>
          <Col>
            <Available teams={allTeams} />
            <Picked teams={allTeams} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
