import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { requestCharts } from '../services/ChartsService';
import TableCharts from './TableCharts';

class ChartsUsage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: [],
            chartNames: []
        }

        this.renderChartData = this.renderChartData.bind(this);
        this.renderTimesUsed = this.renderTimesUsed.bind(this);
    }

    componentDidMount() {
        this.fetchCharts();
    }

    fetchCharts() {
        requestCharts()
            .then(data => {
                this.setState({
                    chartData: data.open_chart_events
                });

                this.renderChartData(data.open_chart_events);
                // this.getTimesUsed();
            });
    }

    renderChartData(chartData) {
        const mapChartData = chartData.map(item => {
            return item.details.chart_name;
        });

        this.setState({
            chartNames: [...new Set(mapChartData)]
        })
    }

    renderTimesUsed(chart) {
        const reducedChartData = this.state.chartData.reduce((acc, item) => {
            if (item.details.chart_name === chart) {
                acc++}
                return acc
        }, 0);

        return reducedChartData;
    }

    // getTimesUsed() {
    //     const reduceChartNames = this.state.chartData.reduce(function (obj, item) {
    //         obj[item] = (obj[item] || 0) + 1;
    //         return obj;
    //     }, {});

    //     console.log(reduceChartNames);
    // }

    render() {
        return (
            <div className="app__container">
                <main className="app__main">
                    <div className="breadcrumb__container">
                        <ul className="breadcrumb__container-list">
                            <li className="breadcrumb__container-item">
                                <Link to="/">Overview</Link>
                            </li>>
                            <li className="breadcrumb__container-item">
                                <span>ChartsUsage</span>
                            </li>
                        </ul>
                    </div>
                    <div className="charts__container">
                        <div className="table__container">
                            <TableCharts chartNames={this.state.chartNames} renderTimesUsed={this.renderTimesUsed}/>
                        </div>
                        <div className="chart__filters">
                            <div className="chart__filters-options">
                                <h3>OPTIONS</h3>
                                <label>
                                    <input type="radio"></input> exclude support users (x@stylesage.com)
                                    </label>
                            </div>
                            <div className="chart__filters-range">
                                <h3>DATE RANGE</h3>
                                <p> From: | To:</p>
                                <div>
                                    <label>
                                        <input type="radio" />last week
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" />last month
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" />last 2 months
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" /> set date
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" /> always
                                    </label>
                                </div>
                            </div>
                            <div className="chart__filters-groups">
                                <h3>USER GROUPS</h3>
                                <p>select all | select active | clear all</p>
                                <div>
                                    <label htmlFor="flightoption1">
                                        <input id="flightoption1" type="checkbox" value="chooseseat" name="flightoptions" />>
                                        ejemplo
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default ChartsUsage;