import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './component-overview/Overview';
import SessionList from './component-list/SessionList';
import ChartsUsage from './component-charts/ChartsUsage';
import './styles.scss';


class App extends Component {

  render() {

    return (
      <div className="app">
        <Header />
        <div className="page__wrapper">
          <Sidebar />
          <Switch>
            <Route exact path="/" render={() => <Overview />} />
            <Route path="/session-list" render={() => <SessionList />} />
            <Route path="/charts-usage" render={() => <ChartsUsage />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;