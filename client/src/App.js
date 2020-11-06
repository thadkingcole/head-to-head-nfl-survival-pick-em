import "./App.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Available from "./components/teams/Available";
import Picked from "./components/teams/Picked";
import axios from "axios";

function App() {
  axios
    .get("https://site.api.espn.com/apis/v2/sports/football/nfl/standings")
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));

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
            <Available />
          </Col>
          <Col>
            <Picked />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
