import React, { Component } from "react";
import { Link } from 'react-router-dom';
import UserFilter from './UserFilter';

class SessionList extends Component {
    render() {
        return (
            <div className="main__container">
                <div className="">
                    <nav className="">
                        <Link to="">Overview</Link>
                        <Link to="">Sessions</Link>
                    </nav>
                </div>
                <div className="data__container">
                    <i></i>
                    <h2 className="data__results--title">Sessions between *DATA</h2>
                </div>
                <div className="data__filter">
                    <UserFilter />
                </div>
                <div className="data__results****">
                    <div className="data__table--container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Time Started (local TZ)</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">Request Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>*data.username</td>
                                    <td>*data.time</td>
                                    <td>*data.duration</td>
                                    <td>*data.request</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="options__pagination">
                        <div className="select__entries">
                            <p> Show
                                <select className="select">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                                entries per page
                            </p>
                        </div>
                        <div className="pagination">
                            <nav className="pagination__nav">
                                <Link className="pagination__nav--item" to="/">First</Link>
                                <Link className="pagination__nav--item" to="/">Previous</Link>
                                <Link className="pagination__nav--item" to="/">Next</Link>
                                <Link className="pagination__nav--item" to="/">Last</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SessionList;