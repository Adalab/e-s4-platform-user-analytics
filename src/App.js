import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SessionList from './components/SessionList';
import ChartsUsage from './components/ChartsUsage';
import './App.scss';

const userData = {
  "from_date": "2019-01-01T12:18:31.240Z",
  "to_date": "2019-01-31T12:18:31.240Z",
  "sessions": [
    {
      "user__username": "jade@stylesage.co",
      "max_timestamp": "2019-01-28T17:32:49.570Z",
      "user__job_title": "",
      "min_timestamp": "2019-12-28T15:02:34.682Z",
      "duration_sec": 7934.888322,
      "user": 17,
      "request_count": 50,
      "session_key": "4d3z5dnb34rlojytunofjzma0j8nggyq"
    },
    {
      "user__username": "jade@stylesage.co",
      "max_timestamp": "2019-01-22T15:34:32.548Z",
      "user__job_title": "",
      "min_timestamp": "2019-01-22T15:33:26.764Z",
      "duration_sec": 49.783448,
      "user": 17,
      "request_count": 19,
      "session_key": "dieyd3xze1ovzq4zdgexyt3rqeg4uq6p"
    },
    {
      "user__username": "jade@stylesage.co",
      "max_timestamp": "2019-01-09T15:08:27.590Z",
      "user__job_title": "",
      "min_timestamp": "2019-01-09T14:40:17.034Z",
      "duration_sec": 1690.556118,
      "user": 17,
      "request_count": 106,
      "session_key": "eiqk9g55mpkg3hq29q1mu5ozkck13ka6"
    }
  ]
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" render={props => <SessionList match={props.match} userData={userData} />} />
          <Route path="/charts-usage" render={() => <ChartsUsage />} />
        </Switch>
      </div>
    );
  }
}

export default App;