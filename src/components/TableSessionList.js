import React, { Component } from "react";

class TableSessionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
           row: '' 
        }   

        this.mapResults = this.mapResults.bind(this);
    }

    mapResults(list) {
        const row = list.map((item, index) => {
            return (
                <tr className="table__tr" key={index}>
                    <td className="table__td">{item.user__username}</td>
                    <td className="table__td">{this.renderTime(item.min_timestamp)}</td>
                    <td className="table__td">{this.renderDuration(item.duration_sec)}</td>
                    <td className="table__td">{item.request_count}</td>
                </tr>
            );
        });

        return row;
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

    renderDuration(duration) {
        const seconds = parseInt(duration % 60);
        const totalMins = parseInt(duration / 60);
        const mins = parseInt(totalMins % 60);
        const hours = parseInt(totalMins / 60);

        let durationString;

        if (hours !== 0) {
            durationString = hours + 'h' + mins + 'm' + seconds + 's';
        } else if (mins !== 0) {
            durationString = mins + 'm' + seconds + 's';
        } else {
            durationString = seconds + 's';
        }

        return durationString;
    }

    render() {
        const { sessionsList, orderResultsUsername, orderResultsTimeStarted, orderResultsDuration, orderResultsRequestCount } = this.props;
        
        return (
            <table className="table">
                <thead className="table__thead">
                    <tr className="table__tr">
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Username</p>
                                <div className="table__icons">
                                    <i className="zmdi zmdi-chevron-up" data-arrow="up" onClick={orderResultsUsername}></i>
                                    <i className="zmdi zmdi-chevron-down" data-arrow="down" onClick={orderResultsUsername}></i>
                                </div>
                            </div>
                        </th>
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Time Started (local TZ)</p>
                                <div className="table__icons">
                                    <i className="zmdi zmdi-chevron-up" data-arrow="up" onClick={orderResultsTimeStarted}></i>
                                    <i className="zmdi zmdi-chevron-down" data-arrow="down" onClick={orderResultsTimeStarted}></i>
                                </div>
                            </div>
                        </th>
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Duration</p>
                                <div className="table__icons">
                                    <i className="zmdi zmdi-chevron-up" data-arrow="up" onClick={orderResultsDuration}></i>
                                    <i className="zmdi zmdi-chevron-down" data-arrow="down" onClick={orderResultsDuration}></i>
                                </div>
                            </div>
                        </th>
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Request Count</p>
                                <div className="table__icons">
                                    <i className="zmdi zmdi-chevron-up" data-arrow="up" onClick={orderResultsRequestCount}></i>
                                    <i className="zmdi zmdi-chevron-down" data-arrow="down" onClick={orderResultsRequestCount}></i>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="table__tbody">
                    {this.mapResults(sessionsList)}
                </tbody>
            </table>
        );
    }
}

export default TableSessionList;