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
      open: props.open,
      view: 'Rides'
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

  determineView = () => {
    var view = null;
    switch(this.state.view) {
      case "Rides":
        view = <Rides />;
        break;
      default: 
        view = <Rides />;
    }
    return view;
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
          {this.determineView()}
        </Grid>
      </Sidebar>
    );
  }
}

export default App;
