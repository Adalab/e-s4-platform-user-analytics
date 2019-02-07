import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Overview from './Component-Overview/Overview';
import SessionList from './Component-SessionList/SessionList';
import ChartsUsage from './Component-Charts/ChartsUsage';
import './App.scss';


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