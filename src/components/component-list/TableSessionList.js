import React, { Component } from "react";
import PropTypes from "prop-types";

class TableSessionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      row: ''
    }

    this.mapResults = this.mapResults.bind(this);
  }

  mapResults(list) {
    const { renderTime } = this.props;

    const row = list.map((item, index) => {
      return (
        <tr className="table__tr" key={index}>
          <td className="table__td table__td--user">{item.user__username}</td>
          <td className="table__td table__td--times">{renderTime(item.min_timestamp)}</td>
          <td className="table__td table__td--sec">{this.renderDuration(item.duration_sec)}</td>
          <td className="table__td table__td-req">{item.request_count}</td>
        </tr>
      );
    });

    return row;
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
      <table className="table" id="table">
        <thead className="table__thead">
          <tr className="table__tr-title">
            <th className="table__th table__th-col1">
              <div className="table__content table__content-col1">
                <p className="table__title">Username</p>
                <div className="table__icons">
                  <i className="zmdi zmdi-chevron-up" data-arrow="up" onClick={orderResultsUsername}></i>
                  <i className="zmdi zmdi-chevron-down" data-arrow="down" onClick={orderResultsUsername}></i>
                </div>
              </div>
            </th>
            <th className="table__th table__th-col2">
              <div className="table__content table__content-col2">
                <p className="table__title">Times Started (local TZ)</p>
                <div className="table__icons">
                  <i className="zmdi zmdi-chevron-up" data-arrow="up" onClick={orderResultsTimeStarted}></i>
                  <i className="zmdi zmdi-chevron-down" data-arrow="down" onClick={orderResultsTimeStarted}></i>
                </div>
              </div>
            </th>
            <th className="table__th table__th-col3">
              <div className="table__content table__content-col3">
                <p className="table__title">Duration</p>
                <div className="table__icons">
                  <i className="zmdi zmdi-chevron-up" data-arrow="up" onClick={orderResultsDuration}></i>
                  <i className="zmdi zmdi-chevron-down" data-arrow="down" onClick={orderResultsDuration}></i>
                </div>
              </div>
            </th>
            <th className="table__th table__th-col4">
              <div className="table__content table__content-col4">
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

TableSessionList.Proptypes = {
  renderTime: PropTypes.func.isRequired,
  sessionsList: PropTypes.array.isRequired,
  orderResultsUsername: PropTypes.func.isRequired,
  orderResultsTimeStarted: PropTypes.func.isRequired,
  orderResultsDuration: PropTypes.func.isRequired,
  orderResultsRequestCount: PropTypes.func.isRequired
}

export default TableSessionList;
