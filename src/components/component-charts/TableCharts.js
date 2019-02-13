import React, { Component } from "react";

class TableCharts extends Component {

    renderTimesUsed(givenChart) {
        const reducedChartList = this.props.chartList.reduce((acc, item) => {
            if (item.details.chart_name === givenChart) {
                acc++;
            }
            return acc;
        }, 0);

        return reducedChartList;
    }

    renderChartUsers(givenChart) {
        const originalCharts = this.props.chartList;
        const mappedUsersData = originalCharts
            .filter(chart => chart.details.chart_name === givenChart)
            .map(chart => {
                return chart.request.user__username;
            })

        return [...new Set(mappedUsersData)].length;
    }

    chartNames() {
        const row = this.props.chartNames.reduce((acc, item, index) => {
            
            const timesPercentage = (this.renderTimesUsed(item) / this.props.chartList.length * 100).toFixed(1);

            acc.push(
                <tr className="table__tr" key={index}>
                    <td className="table__td">{item}</td>
                    <td className="table__td">{this.renderTimesUsed(item)}</td>
                    <td className="table__td">{timesPercentage}</td>
                    <td className="table__td">{this.renderChartUsers(item)}</td>
                </tr>
            );
            return acc;
        }, []);
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