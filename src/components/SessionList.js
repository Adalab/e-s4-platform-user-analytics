import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import UserFilter from './UserFilter';
import TableSessionList from "./TableSessionList";
import { requestSessions } from './../services/SessionsService';

class SessionList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            activePetition: false,
            queryUsername: '',
            sessionsList: [],
            duplicatedArray: false,
            filter: ''
        }

        this.fetchSessions = this.fetchSessions.bind(this);
        this.getQueryUsername = this.getQueryUsername.bind(this);
        this.orderResultsUsername = this.orderResultsUsername.bind(this);
        this.orderResultsTimeStarted = this.orderResultsTimeStarted.bind(this);
        this.orderResultsDuration = this.orderResultsDuration.bind(this);
        this.orderResultsRequestCount = this.orderResultsRequestCount.bind(this);
        this.orderUsername = this.orderUsername.bind(this);
        this.orderTimeStarted = this.orderTimeStarted.bind(this);
        this.orderDuration = this.orderDuration.bind(this);
        this.orderRequestCount = this.orderRequestCount.bind(this);
    }

    componentDidMount() {
        this.fetchSessions();
    }

    fetchSessions() {
        console.log(requestSessions);
        requestSessions()
            .then(data => {
                this.setState({
                    sessionsList: data,
                    duplicatedArray: true
                });
                console.log(data)
            });
    }

    getQueryUsername(e) {
        const userName = e.currentTarget.value;
        const filteredList = this.filterUserame(userName);
        let orderedList;

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
        }

        this.setState({
            queryUsername: userName,
            sessionsList: orderedList
        })
    }

    filterUserame(userName) {
        const originalList = this.state.userData.sessions;

        const filteredList = originalList.filter(item => {
            return item.user__username.includes(userName);
        });

        return filteredList;
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
        const { handlePageChange, activePage } = this.props;
        const { sessionsList, duplicatedArray } = this.state;

        return (
            <div className="app__container">
                <main className="app__main">
                    <div className="breadcrumb__container">
                        <ul className="breadcrumb__container-list">
                            <li className="breadcrumb__container-item">
                                <Link to="/">Overview</Link>
                            </li>>
                            <li className="breadcrumb__container-item">
                                <span>Sessions</span>
                            </li>
                        </ul>
                    </div>
                    <div className="panel__session">
                        <i className="zmdi zmdi-format-list-bulleted icon"></i>
                        <h2 className="panel__session-title">Sessions between *2019-01-06, 23:48 and 2019-01-28, 16:09*</h2>
                    </div>
                    <UserFilter getQueryUsername={this.getQueryUsername} />
                    <div className="table__container">
                        {(duplicatedArray.length !== 0)
                            ? (<TableSessionList
                                orderResultsUsername={this.orderResultsUsername}
                                orderResultsTimeStarted={this.orderResultsTimeStarted}
                                orderResultsDuration={this.orderResultsDuration}
                                orderResultsRequestCount={this.orderResultsRequestCount}

                                activePage={activePage}
                                handlePageChange={handlePageChange}
                                sessionsList={sessionsList} />)
                            : (<p>Looking for data...</p>)}
                    </div>
                </main>
                <footer className="app__footer-session">
                    <div className="entries__container">
                        <p>
                            Show
                            <select className="entries__select">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                            entries per page
                        </p>
                    </div>
                    <div className="pagination__container">
                        <Pagination
                            innerClassName={<ul className="pagination">f</ul>}
                            activeClassName={<li className="pagination__list-item"></li>}
                            firstPageText={<li className="pagination__list-item">First</li>}
                            prevPageText={<li className="pagination__list-item">Previous</li>}
                            nextPageText={<li className="pagination__list-item">Next</li>}
                            lastPageText={<li className="pagination__list-item">Last</li>}
                            activePage={activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={450}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                        />
                    </div>
                </footer>
            </div>
        );
    }
}

export default SessionList;