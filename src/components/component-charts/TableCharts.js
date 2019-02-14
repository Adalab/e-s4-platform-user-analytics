import React, { Component } from "react";

class TableCharts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            table: []
        }
    }

    chartNames() {
        const matrix = this.props.chartList.reduce((acc, item) => {
            const matrixIndex = acc.findIndex(chart => chart[0] === item.details.chart_name)

            if (matrixIndex === -1) {

                const accMatrix = [];

                accMatrix.push(item.details.chart_name);
                accMatrix.push(1);
                accMatrix.push([item.request.user__username]);

                acc.push(accMatrix);

            } else {

                acc[matrixIndex][1] += 1;

                if (acc[matrixIndex][2].indexOf(item.request.user__username) === -1) {
                    acc[matrixIndex][2].push(item.request.user__username);
                }
            }

            return acc;
        }, [[]]);

        const table = matrix.splice(1);

        return table;
    }

    render() {
        const matrix = this.chartNames();

        let table;

        if (matrix.length !== 0) {
            table = matrix
            .sort(function (a, b) {
                
                return b[1] - a[1];
            })
            .map((row, index) => {
                return (
                    <tr className="table__tr" key={index}>
                        <td className="table__td">{row[0]}</td>
                        <td className="table__td">{row[1]}</td>
                        <td className="table__td">{(row[1] / this.props.chartList.length * 100).toFixed(1)}</td>
                        <td className="table__td">{row[2].length}</td>
                    </tr>
                )
            });
        };

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
                    {table}
                </tbody>
            </table>
        );
    }
}

export default TableCharts;