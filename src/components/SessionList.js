import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import UserFilter from './UserFilter';
import TableSessionList from "./TableSessionList";


class SessionList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryUsername: "",
            sessionsList: [],
            duplicatedArray: false
        }

        this.getQueryUsername = this.getQueryUsername.bind(this);
        this.orderResultsUsername = this.orderResultsUsername.bind(this);
        this.orderResultsTimeStarted = this.orderResultsTimeStarted.bind(this);
        this.orderResultsDuration = this.orderResultsDuration.bind(this);
        this.orderResultsRequestCount = this.orderResultsRequestCount.bind(this);
        //this.sortName = this.sortName.bind(this);

    }

    componentDidMount() {
        const { sessions } = this.props.userData;
        const sessionsList = sessions.slice();

        this.setState({
            sessionsList: sessionsList,
            duplicatedArray: true
        });
    }

    getQueryUsername(e) {
        const userName = e.currentTarget.value;

        this.filterUserame(userName);

        this.setState({
            queryUsername: userName
        })
    }

    filterUserame(userName) {
        const originalList = this.props.userData.sessions;

        const filteredList = originalList.filter(item => {
            return item.user__username.includes(userName);
        });
        
        this.setState({
            sessionsList: filteredList
        });
        console.log(this.state.sessionsList);
    }

    sortName(items) {
        items.sort(function (a, b) {
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
    }

    orderResultsUsername() {
        const sortedList = this.sortName(this.state.sessionsList);
        console.log(sortedList)
        this.setState({
            sessionsList: sortedList
        }) 
    }

    orderResultsTimeStarted(list) {
        const sortedList = list.sort((a, b) => {
            const timeA = new Date(a.min_timestamp);
            const timeB = new Date(b.min_timestamp);
            return (timeB - timeA);
        });

        return sortedList;
    }

    orderResultsDuration(list) {
        const sortedList = list.sort((a, b) => {
            return b.duration_sec - a.duration_sec;
        });

        return sortedList;
    }

    orderResultsRequestCount(list) {
        const sortedList = list.sort((a, b) => {
            return b.request_count - a.request_count;
        });

        return sortedList;
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
                                <Link to="/">Sessions</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="panel__session">
                        <i className="zmdi zmdi-format-list-bulleted icon"></i>
                        <h2 className="panel__session-title">Sessions between *DATA</h2>
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