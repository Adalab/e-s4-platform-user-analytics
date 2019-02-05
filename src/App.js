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
      activePetition: false,
      activePage: 15
    }

    this.fetchSessions = this.fetchSessions.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.fetchSessions();
  }

  fetchSessions() {
    requestSessions()
      .then(data => {
        this.setState({
          userData: data,
          activePetition: true
        });
      })
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber
    });
  }

  render() {

    const { userData, activePetition, activePage } = this.state;

    return (
      <div className="app">
        <Header />
        <div className="page__wrapper">
          <Sidebar />
          {(activePetition) ? (<Switch>
            <Route exact path="/" render={props => <SessionList match={props.match} userData={userData} activePage={activePage} handlePageChange={this.handlePageChange} />} />
            <Route path="/charts-usage" render={() => <ChartsUsage />} />
          </Switch>) : (<p>Looking for data...</p>)}
        </div>
      </div>
    );
  }
}

export default App;