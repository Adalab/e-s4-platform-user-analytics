import React, {Component} from "react";

class TableSessionList extends Component {
  render() {
    const {userData} = this.props;
    const row = userData.map((item,index) => 
    <tr className="table__tr" key={index}>
        <td className="table__td">{item.user__username}</td>
        <td className="table__td">{item.min_timestamp}</td>
        <td className="table__td">{item.duration_sec}</td>
        <td className="table__td">{item.request_count}</td>
    </tr>
    );
    return (
        <table className="table">
            <thead className="table__thead">
                <tr className="table__tr">
                    <th className="table__th">
                        <div className="table__content">
                            <p className="table__title">Username</p>
                            <div className="table__icons">
                                <i className="zmdi zmdi-chevron-up"></i>
                                <i className="zmdi zmdi-chevron-down"></i>
                            </div>
                        </div>
                    </th>
                    <th className="table__th">
                        <div className="table__content">
                            <p className="table__title">Time Started (local TZ)</p>
                            <div className="table__icons">
                                <i className="zmdi zmdi-chevron-up"></i>
                                <i className="zmdi zmdi-chevron-down"></i>
                            </div>
                        </div>
                    </th>
                    <th className="table__th">
                        <div className="table__content">
                            <p className="table__title">Duration</p>
                            <div className="table__icons">
                                <i className="zmdi zmdi-chevron-up"></i>
                                <i className="zmdi zmdi-chevron-down"></i>
                            </div>
                        </div>
                    </th>
                    <th className="table__th">
                        <div className="table__content">
                            <p className="table__title">Request Count</p>
                            <div className="table__icons">
                                <i className="zmdi zmdi-chevron-up"></i>
                                <i className="zmdi zmdi-chevron-down"></i>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="table__tbody">
                {row}
            </tbody>
        </table>
    );
  }
}

export default TableSessionList;