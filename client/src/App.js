import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

import Rides from './components/views/rides';

import './App.css';

class App extends Component {
  render() {
    return (
      <Grid className="App" fluid>
        <Rides />
      </Grid>
    );
  }
}

export default App;
