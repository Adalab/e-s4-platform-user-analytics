import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SessionList from './components/SessionList';
import ChartsUsage from './components/ChartsUsage';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        activePage: 15,
        userData: [
            {
                "user__username": "jade@stylesage.co",
                "max_timestamp": "2019-01-28T17:32:49.570Z",
                "user__job_title": "",
                "min_timestamp": "2019-01-28T15:20:34.682Z",
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
                "duration_sec": 65.783448,
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
    this.handlePageChange = this.handlePageChange.bind(this);
}

handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({
        activePage: pageNumber
    });
}
  render() {
    return (
      <div className="app">
        <Header />
        <div className="page__wrapper">
          <Sidebar />
        <Switch>
          <Route exact path="/" render={() => <SessionList activePage={this.state.activePage} handlePageChange={this.handlePageChange} userData={this.state.userData} />} />
          <Route path="/charts-usage" render={() => <ChartsUsage />} />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;