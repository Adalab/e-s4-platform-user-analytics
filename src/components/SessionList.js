import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import UserFilter from './UserFilter';


class SessionList extends Component {
    render() {
        const {userData, handlePageChange, activePage} = this.props;
        const row = userData.map((item,index) => 
        <tr key={index}>
            <td>{item.user__username}</td>
            <td>{item.min_timestamp}</td>
            <td>{item.duration_sec}</td>
            <td>{item.request_count}</td>
        </tr>
        );
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
                                {row}
                            </tbody>
                        </table>
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