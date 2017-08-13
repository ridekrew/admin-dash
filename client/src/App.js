import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import Sidebar from 'react-sidebar';

import Rides from './components/views/rides';

import './App.css';

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mql: mql,
      docked: props.docked,
      open: props.open
    }
  }

  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open
    });
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {
    this.setState({sidebarDocked: this.state.mql.matches});
  }

  render() {
    var sidebarContent = (
      <b>Krew Admin</b>
    );

    var sidebarProps = {
      sidebar: this.state.sidebarOpen,
      docked: this.state.sidebarDocked,
      onSetOpen: this.onSetSidebarOpen
    };

    return (
      <Sidebar
        sidebar={sidebarContent}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <Grid className="App" fluid>
          <Rides />
        </Grid>
      </Sidebar>
    );
  }
}

export default App;
