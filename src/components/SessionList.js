import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination"; 
import UserFilter from './UserFilter';

class SessionList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          activePage: 15
           
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
            <React.Fragment>
                <header className="app__header">Header</header>
                <main className="app__main">
                    <div className="breadcrumb__container">
                        <ul className="breadcrumb__container--list">
                            <li className="breadcrumb__container--item">
                                <Link to="/">Overview</Link>
                            </li>>
                            <li className="breadcrumb__container--item">
                                <Link to="/">Sessions</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="panel__session">
                        <i></i>
                        <h2 className="panel__session--title">Sessions between *DATA</h2>
                    </div>
                    <div className="username__filter">
                        <UserFilter />
                    </div>
                    <div className="table__container">
                        <table className="table__container--results">
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
                </main>
                <footer className="app__footer--session">
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
                        innerClassName={<ul className="pagination__list"></ul>}
                        activeClassName={<li className="pagination__list--item"></li>}
                        firstPageText={<li className="pagination__list--item">First</li>}
                        prevPageText={<li className="pagination__list--item">Previous</li>}
                        nextPageText={<li className="pagination__list--item">Next</li>}
                        lastPageText={<li className="pagination__list--item">Last</li>}
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        />
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default SessionList;