import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import UserFilter from './UserFilter';
import TableSessionList from "./TableSessionList";


class SessionList extends Component {
    render() {
        const {userData, handlePageChange, activePage} = this.props;
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
                        <TableSessionList activePage={activePage} handlePageChange={handlePageChange} userData={userData} />
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