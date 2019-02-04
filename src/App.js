import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SessionList from './components/SessionList';
import ChartsUsage from './components/ChartsUsage';
import { requestSessions } from './services/SessionsService';
import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      activePetition: false
    }

    this.fetchSessions = this.fetchSessions.bind(this);
  }

  componentDidMount() {
    this.fetchSessions();
  }

  fetchSessions() {
    requestSessions()
      .then(data => {
        console.log(data);
        this.setState({
          userData: data,
          activePetition: true
        });
      })
  }

  render() {

    const { userData, activePetition } = this.state;

    return (
      <div className="app">
        <Header />
        <Sidebar />
        {(activePetition) ? (<Switch>
          <Route exact path="/" render={props => <SessionList match={props.match} userData={userData} />} />
          <Route path="/charts-usage" render={() => <ChartsUsage />} />
        </Switch>) : (<p>Looking for data...</p>)}
      </div>
    );
  }
}

export default App;