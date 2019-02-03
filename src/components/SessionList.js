import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import UserFilter from './UserFilter';


class SessionList extends Component {
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
                    <UserFilter />
                    <div className="table__container">
                        <table className="table__results">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="table__head">
                                            <p>Username</p>
                                            <div className="arrow__container">
                                                <i class="zmdi zmdi-chevron-up"></i>
                                                <i class="zmdi zmdi-chevron-down"></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__head">
                                            <p>Time Started (local TZ)</p>
                                            <div className="arrow__container">
                                                <i class="zmdi zmdi-chevron-up"></i>
                                                <i class="zmdi zmdi-chevron-down"></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__head">
                                            <p>Duration</p>
                                            <div className="arrow__container">
                                                <i class="zmdi zmdi-chevron-up"></i>
                                                <i class="zmdi zmdi-chevron-down"></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__head">
                                            <p>Request Count</p>
                                            <div className="arrow__container">
                                                <i class="zmdi zmdi-chevron-up"></i>
                                                <i class="zmdi zmdi-chevron-down"></i>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    {this.state.userData.map((item, index) => {
                                        return (
                                            <td key={index}>{item.user__username}</td>
                                        )
                                    })}
                                </tr>
                                <tr className="">
                                    {this.state.userData.map((item, index) => {
                                        return (
                                            <td key={index}>{item.min_timestamp}</td>
                                        )
                                    })}
                                </tr>
                                <tr className="">
                                    {this.state.userData.map((item, index) => {
                                        return (
                                            <td key={index}>{item.duration_sec}</td>
                                        )
                                    })}
                                </tr>
                                <tr className="">
                                    {this.state.userData.map((item, index) => {
                                        return (
                                            <td key={index}>{item.request_count}</td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>

                        {/* <ul className="username__list">UserName
                                {this.state.userData.map((item,index) => {
                                return(
                                <li key={index}>{item.user__username}</li>
                                )
                            })}
                            </ul>
                            <ul className="username__list">Time
                                {this.state.userData.map((item,index) => {
                                return(
                                <li key={index}>{item.min_timestamp}</li>
                                )
                            })}
                            </ul>
                            <ul className="username__list">Duration
                                {this.state.userData.map((item,index) => {
                                return(
                                <li key={index}>{item.duration_sec}</li>
                                )
                            })}
                            </ul>
                            <ul className="username__list">Request Count
                                {this.state.userData.map((item,index) => {
                                return(
                                <li key={index}>{item.request_count}</li>
                                )
                            })}
                            </ul> */}
                    </div>
                </main>
                <footer className="app__footer-session">
                    <div className="options__numberspage">
                        <p>
                            Show
                            <select className="select__entries">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                            entries per page
                        </p>
                    </div>
                    <div className="options__pagination">
                        <Pagination
                            innerClassName={<ul className="pagination"></ul>}
                            activeClassName={<li className="pagination__list-item"></li>}
                            firstPageText={<li className="pagination__list-item">First</li>}
                            prevPageText={<li className="pagination__list-item">Previous</li>}
                            nextPageText={<li className="pagination__list-item">Next</li>}
                            lastPageText={<li className="pagination__list-item">Last</li>}
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={450}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                    </div>
                </footer>
            </div>
        );
    }
}

export default SessionList;