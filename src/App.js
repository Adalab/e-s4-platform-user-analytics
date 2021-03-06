import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/component-overview/Overview';
import SessionList from './components/component-list/SessionList';
import ChartsUsage from './components/component-charts/ChartsUsage';
import './styles.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenButton: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const hiddenStatus = (this.state.hiddenButton === 'displace') ? '' : 'displace';

    this.setState({
      hiddenButton: hiddenStatus
    });
  }

  render() {
    return (
      <div className="app">
        <Header onClick={this.handleClick} />
        <div className="page__wrapper">
          <Sidebar hiddenButton={this.state.hiddenButton === 'displace' ? false : true} />
          <Switch>
            <Route exact path="/" render={() => <Overview hiddenButton={this.state.hiddenButton} />} />
            <Route path="/session-list" render={() => <SessionList hiddenButton={this.state.hiddenButton} />} />
            <Route path="/charts-usage" render={() => <ChartsUsage hiddenButton={this.state.hiddenButton} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
