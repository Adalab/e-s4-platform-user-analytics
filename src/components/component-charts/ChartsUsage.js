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
        this.getCalendar = this.getCalendar.bind(this);
    }

    componentDidMount() {
        this.fetchCharts(this.state.timelapse);
    }

    fetchCharts(timelapse) {
        let toDate = new Date();
        let fromDate = new Date().setDate(toDate.getDate() - timelapse);
        fromDate = new Date(fromDate).toISOString();
        toDate = new Date(toDate).toISOString();

        console.log('fromDate: ', fromDate);
        console.log('toDate: ', toDate);

        requestCharts(fromDate, toDate)
            .then(data => {
                this.setState({
                    chartList: data.open_chart_events,
                    userData: data,
                    currentDate: toDate
                });

                this.renderChartList(data.open_chart_events);
            });
    }

    getCalendar() {
        const now = new Date();

        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const today = now.getFullYear()+"-"+(month)+"-"+(day);

        return today;
    }

    handleChangeDate(e) {
        const period = e.currentTarget.value;
        const ct = new Date();
        let fd = new Date();

        switch(period) {
            case 'last-week':
                fd.setDate(fd.getDate() - 7);
                break;
            case 'last-month':
                fd.setMonth(fd.getMonth() - 1);
                break;
            case 'last-two-months':
                fd.setMonth(fd.getMonth() - 2);
                break;
            case 'set-date':
            
                break;
            case 'always':
                fd = new Date(2015, 0, 1, 0, 0);
                break;
        }
        
        const timelapse = (ct - fd)/(1000*60*60*24);

        this.setState({
            timelapse: Math.round(timelapse)
        });

        this.fetchCharts(Math.round(timelapse));
    }

    

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
                                    <input defaultChecked={true} onClick={this.handleChangeDate} type="radio" id="last-week" name="date" value="last-week" />
                                    <label htmlFor="last-week">last week</label>
                                </div>
                                <div>
                                    <input  onClick={this.handleChangeDate} type="radio" id="last-month" name="date" value="last-month" />
                                    <label htmlFor="last-month">last month</label>
                                </div>
                                <div>
                                    <input onClick={this.handleChangeDate} type="radio" id="last-two-months" name="date" value="last-two-months" />
                                    <label htmlFor="last-two-months">last 2 months</label>
                                </div>
                                <div>
                                    <input onClick={this.handleChangeDate} type="radio" id="set-date" name="date" value="set-date" />
                                    <label htmlFor="last-two-months">set date</label>
                                </div>
                                <div>
                                    <input id="from-date" type="date" name="date??" value={this.getCalendar()} />
                                    <label htmlFor="from-date">from date</label>
                                </div>
                                <div>
                                    <input id="to-date" type="date" name="date??" value={this.getCalendar()} />
                                    <label htmlFor="to-date">to date</label>
                                </div>
                                <div>
                                    <input onClick={this.handleChangeDate} type="radio" id="always" name="date" value="always" />
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