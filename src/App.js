import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import SessionList from './components/SessionList';
import ChartsUsage from './components/ChartsUsage';
import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 15
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber
    });
  }

  render() {

    const { activePage } = this.state;

    return (
      <div className="app">
        <Header />
        <div className="page__wrapper">
          <Sidebar />
          <Switch>
            <Route exact path="/" render={() => <Overview />} />
            <Route path="/session-list" render={props => <SessionList match={props.match} activePage={activePage} handlePageChange={this.handlePageChange} />} />
            <Route path="/charts-usage" render={() => <ChartsUsage />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;