import React, { Component } from "react";
import { Link } from 'react-router-dom';
import UserFilter from './UserFilter';
import TableSessionList from "./TableSessionList";
import Pagination from "./Pagination";
import { requestSessions } from '../../services/SessionsService';

class SessionList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            activePetition: false,
            queryUsername: '',
            sessionsList: [],
            duplicatedArray: false,
            filter: '',
            resultsNumber: '0'
        }

        this.renderTime = this.renderTime.bind(this);
        this.getQueryUsername = this.getQueryUsername.bind(this);

        this.orderResultsUsername = this.orderResultsUsername.bind(this);
        this.orderResultsTimeStarted = this.orderResultsTimeStarted.bind(this);
        this.orderResultsDuration = this.orderResultsDuration.bind(this);
        this.orderResultsRequestCount = this.orderResultsRequestCount.bind(this);
    }

    componentDidMount() {
        this.fetchSessions();
    }

    fetchSessions() {
        requestSessions()
            .then(data => {
                this.setState({
                    userData: data,
                    sessionsList: data.sessions,
                    duplicatedArray: true,
                    resultsDate: "",
                    resultsNumber: ""
                });

                this.calculateResultsNumber(this.state.sessionsList);
                this.calculateFromToDate(this.state.userData);
            });
    }

    calculateFromToDate() {
        const fromDateToDate = this.renderTime(this.state.userData.from_date) + ' and ' + this.renderTime(this.state.userData.to_date);

        this.setState({
            resultsDate: fromDateToDate
        });
    }

    calculateResultsNumber(list) {
        const resultsNumber = parseInt(list.length) + '/' + parseInt(this.state.userData.sessions.length);

        this.setState({
            resultsNumber: resultsNumber
        });
    }

    addZero(par) {
        if (par.length < 2) {
            par = '0' + par;
        }

        return par;
    }

    renderTime(timestamp) {
        const sessionStart = new Date(timestamp);

        const year = sessionStart.getFullYear();
        const month = this.addZero((sessionStart.getMonth() + 1).toString());
        const day = this.addZero(sessionStart.getDate().toString());
        const hour = this.addZero(sessionStart.getHours().toString());
        const minutes = this.addZero(sessionStart.getMinutes().toString());

        return (
            year + '-' + month + '-' + day + ',' + hour + ':' + minutes
        );
    }

    filterUserame(userName) {
        const originalList = this.state.userData.sessions;

        const filteredList = originalList.filter(item => {
            return item.user__username.includes(userName);
        });

        return filteredList;
    }

    getQueryUsername(e) {
        const userName = e.currentTarget.value;
        const filteredList = this.filterUserame(userName);
        let orderedList = '';

        switch (this.state.filter) {
            case 'Username-up':
                orderedList = this.orderUsername(filteredList);
                break;

            case 'Username-down':
                orderedList = this.orderUsername(filteredList).reverse();
                break;

            case 'TimeStarted-up':
                orderedList = this.orderTimeStarted(filteredList);
                break;

            case 'TimeStarted-down':
                orderedList = this.orderTimeStarted(filteredList).reverse();
                break;

            case 'Duration-up':
                orderedList = this.orderDuration(filteredList);
                break;

            case 'Duration-down':
                orderedList = this.orderDuration(filteredList).reverse();
                break;

            case 'RequestCount-up':
                orderedList = this.orderRequestCount(filteredList);
                break;

            case 'RequestCount-down':
                orderedList = this.orderRequestCount(filteredList).reverse();
                break;

            default:
                orderedList = filteredList;
                break;
        };

        this.calculateResultsNumber(orderedList);
        this.setState({
            queryUsername: userName,
            sessionsList: orderedList
        })
    }

    orderUsername(list) {
        const sortedList = list.sort(
            function (a, b) {
                const nameA = a.user__username.toUpperCase();
                const nameB = b.user__username.toUpperCase();

                if (nameA < nameB) {
                    return -1;

                } else if (nameA > nameB) {
                    return 1;

                } else {
                    return 0;
                }
            });

        return sortedList;
    }

    orderResultsUsername(e) {
        const sortedList = this.orderUsername(this.state.sessionsList);

        if (e.currentTarget.getAttribute('data-arrow') === 'down') {
            this.setState({
                sessionsList: sortedList.reverse(),
                filter: 'Username-down'
            });

        } else {
            this.setState({
                sessionsList: sortedList,
                filter: 'Username-up'
            });
        }
    }

    orderTimeStarted(list) {
        const sortedList = list.sort((a, b) => {
            const timeA = new Date(a.min_timestamp);
            const timeB = new Date(b.min_timestamp);
            return (timeA - timeB);
        });

        return sortedList;
    }

    orderResultsTimeStarted(e) {
        const sortedList = this.orderTimeStarted(this.state.sessionsList);

        if (e.currentTarget.getAttribute('data-arrow') === 'down') {
            this.setState({
                sessionsList: sortedList.reverse(),
                filter: 'TimeStarted-down'
            });

        } else {
            this.setState({
                sessionsList: sortedList,
                filter: 'TimeStarted-up'
            });
        }
    }

    orderDuration(list) {
        const sortedList = list.sort((a, b) => {
            return a.duration_sec - b.duration_sec;
        });

        return sortedList;
    }

    orderResultsDuration(e) {
        const sortedList = this.orderDuration(this.state.sessionsList);

        if (e.currentTarget.getAttribute('data-arrow') === 'down') {
            this.setState({
                sessionsList: sortedList.reverse(),
                filter: 'Duration-down'
            });

        } else {
            this.setState({
                sessionsList: sortedList,
                filter: 'Duration-up'
            });
        }
    }

    orderRequestCount(list) {
        const sortedList = list.sort((a, b) => {
            return a.request_count - b.request_count;
        });

        return sortedList;
    }

    orderResultsRequestCount(e) {
        const sortedList = this.orderRequestCount(this.state.sessionsList);

        if (e.currentTarget.getAttribute('data-arrow') === 'down') {
            this.setState({
                sessionsList: sortedList.reverse(),
                filter: 'RequestCount-down'
            });

        } else {
            this.setState({
                sessionsList: sortedList,
                filter: 'RequestCount-up'
            });
        }
    }

    render() {
        const { sessionsList, duplicatedArray, resultsDate, resultsNumber } = this.state;

        return (
            <div className="app__container">
                <main className="app__main">
                    <div className="breadcrumb__container">
                        <ul className="breadcrumb__container-list">
                            <li className="breadcrumb__container-item">
                                <Link to="/" className="breadcrumb__link">Overview</Link>
                            </li>>
                            <li className="breadcrumb__container-item">
                                <span>Sessions</span>
                            </li>
                        </ul>
                    </div>
                    <div className="panel__session">
                        <i className="zmdi zmdi-apps"></i>  
                        <h2 className="panel__session-title">Sessions between {resultsDate}</h2>
                    </div>
                    <UserFilter getQueryUsername={this.getQueryUsername} resultsNumber={resultsNumber} />
                    <div className="table__container">
                        {(duplicatedArray.length !== 0)
                            ? (
                            <Pagination
                                renderTime={this.renderTime}
                                orderResultsUsername={this.orderResultsUsername}
                                orderResultsTimeStarted={this.orderResultsTimeStarted}
                                orderResultsDuration={this.orderResultsDuration}
                                orderResultsRequestCount={this.orderResultsRequestCount}
                                sessionsList={sessionsList} >
                                <TableSessionList />
                            </Pagination>                                
                            ) : (<p>Looking for data...</p>)}
                    </div>
                </main>
            </div>
        );
    }
}

export default SessionList;