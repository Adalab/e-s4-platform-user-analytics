import React, { Component } from "react";

class TableCharts extends Component {
    
    chartNames() {
        const { renderTimesUsed, renderTimesPercentage, renderChartUsers } = this.props;

        const row = this.props.chartNames.map((item,index) => {
            return (
                <tr className="table__tr" key={index}>
                    <td className="table__td">{item}</td>
                    <td className="table__td">{renderTimesUsed(item)}</td>
                    <td className="table__td">{renderTimesPercentage(renderTimesUsed(item))}</td>
                    <td className="table__td">{renderChartUsers(item)}</td>
                </tr>
            );
        });
        return row;
    }
    
    render() {
        
        return (
            <table className="table" id="table">
                <thead className="table__thead">
                    <tr className="table__tr-title">
                        <th className="table__th">
                            <p className="table__title">Chart</p>
                        </th>
                        <th className="table__th">
                            <p className="table__title">Times Used</p>
                        </th>
                        <th className="table__th">
                            <p className="table__title">%</p>
                        </th>
                        <th className="table__th">
                            <p className="table__title">Users</p>
                        </th>
                    </tr>
                </thead>
                <tbody className="table__tbody">
                   {this.chartNames()}
                </tbody>
            </table>
        );
    }
}

export default TableCharts;