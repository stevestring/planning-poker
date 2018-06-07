import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Code } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import './bootstrap.min.css';
import NavBar from "./NavBar";
import { Jumbotron } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {



    return (
      <div className="App">
      <NavBar/>

<Jumbotron >

  <h1>TEAM ROOM</h1>
  Online collaboration tools for Agile teams

</Jumbotron>
<Grid>
  <Row className="show-grid">
  <Col xs={0} sm={3} md={3} mdPush={3}/>
  <Col xs={6} sm={3} md={3} mdPush={3}>
      <h3>Join Room</h3>  
      (Team Members)   
      <a href="/lobby"><Image src="/Team.jpg"  responsive="true"/>
      </a>
        </Col>
    <Col xs={6} sm={3} md={3} mdPull={3}>
    <h3>Create Room</h3>  
      (Facilitators)      
      <a href="/create-room"><Image src="/Facilitator.jpg"  responsive="true"/>
      </a>
    </Col>
  </Row>
</Grid>

      </div>
    );
  };




};


export default App;
