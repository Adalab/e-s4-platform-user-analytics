import React, { Component } from "react";

class TableCharts extends Component {
    
    mapResults() {
        const row = this.props.chartData.map((item,index) => {
            return (
                <tr className="table__tr" key={index}>
                    <td className="table__td">{item.details.chart_name}</td>
                </tr>
            );
        });
        return row;
    }
    
    render() {
        
        return (
            <table className="table">
                <thead className="table__thead-chart">
                    <tr className="table__tr">
                        <th className="table__th">
                            Chart
                        </th>
                        <th className="table__th">
                            Times Used
                        </th>
                        <th className="table__th">
                            %
                        </th>
                        <th className="table__th">
                            Users
                        </th>
                    </tr>
                </thead>
                <tbody className="table__tbody-chart">
                   {this.mapResults()}
    
                </tbody>
            </table>
        );
    }
}

export default TableCharts;