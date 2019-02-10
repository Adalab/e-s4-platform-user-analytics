import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { requestCharts } from './../../services/ChartsService';
import TableCharts from './TableCharts';

class ChartsUsage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: [],
            chartList: [],
            chartNames: [],
            currentDate: '',
            timelapse: 7
        }

        this.renderTimesUsed = this.renderTimesUsed.bind(this);
        this.renderTimesPercentage = this.renderTimesPercentage.bind(this);
        this.renderChartUsers = this.renderChartUsers.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount() {
        this.fetchCharts();
    }

    fetchCharts() {
        const {timelapse} = this.state;
        let toDate = new Date();
       // fecha.setDate(fecha.getDate() + dias);
        let fromDate = new Date().setDate(toDate.getDate() - timelapse);
        fromDate = new Date(fromDate).toISOString();
        toDate = new Date(toDate).toISOString();

        console.log('fromDate: ', fromDate);
        console.log('toDate: ', toDate);

        requestCharts(fromDate, toDate)
            .then(data => {
                console.log('yay!! ', data);
                this.setState({
                    chartList: data.open_chart_events,
                    userData: data,
                    currentDate: toDate
                });

                this.renderChartList(data.open_chart_events);
            });
    }

    ///

// Preguntar qué es más eficiente sacar newDate new function

    getCurrentDate() {

    }

    handleChangeDate(e) {
        const ct = new Date();
        const time = e.currentTarget.value; //change name
        let fromDate = '';

        switch(time) {
            case 'last-month':
                fromDate = ct.setMonth(ct.getMonth() -1);
                this.setState({
                    timelapse: 1
                })
                break;
            default:
                console.log('Life is wonderful');
                break;
        }

        this.fetchCharts();
    }

    ///

    renderChartList(chartList) {
        const mappedChartList = chartList.map(chart => {
            return chart.details.chart_name;
        });

        this.setState({
            chartNames: [...new Set(mappedChartList)]
        })
    }

    renderTimesUsed(chart) {
        const reducedChartList = this.state.chartList.reduce((acc, item) => {
            if (item.details.chart_name === chart) {
                acc++
            }
            return acc
        }, 0);

        return reducedChartList;
    }

    renderTimesPercentage(timesUsed) {
        const timesPercentage = (timesUsed / this.state.chartList.length * 100).toFixed(1);
        return timesPercentage;
    }

    renderChartUsers(givenChart) {
        const originalCharts = this.state.chartList;

        const mappedUsersData = originalCharts
            .filter(chart => chart.details.chart_name === givenChart)
            .map(chart => {
                return chart.request.user__username;
            });

        return [...new Set(mappedUsersData)].length;
    }

    render() {
        const { chartNames } = this.state;

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
                            <TableCharts chartNames={chartNames} renderTimesUsed={this.renderTimesUsed} renderTimesPercentage={this.renderTimesPercentage} renderChartUsers={this.renderChartUsers}/>
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
                                    <input onChange={this.handleChangeDate} type="radio" id="last-week" name="date" value="last-week"
                                            checked />
                                    <label htmlFor="last-week">last week</label>
                                </div>
                                <div>
                                    <input type="radio" id="last-month" name="date" value="last-month"
                                            checked />
                                    <label htmlFor="last-month">last month</label>
                                </div>
                                <div>
                                    <input type="radio" id="last-two-months" name="date" value="last-two-months"
                                            checked />
                                    <label htmlFor="last-two-months">last 2 months</label>
                                </div>
                                <div>
                                    <input type="radio" id="set-date" name="date" value="set-date"
                                            checked />
                                    <label htmlFor="last-two-months">set date</label>
                                </div>
                                <div>
                                    <input type="radio" id="always" name="date" value="always"
                                            checked />
                                    <label htmlFor="always">always</label>
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