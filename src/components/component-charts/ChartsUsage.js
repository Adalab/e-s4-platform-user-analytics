import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { requestCharts } from './../../services/ChartsService';
import TableCharts from './TableCharts';

class ChartsUsage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            chartList: [],
            chartNames: [],
            allGroupsList: [],
            groupsList: [],
            filterOptionsChecked: true,
            timelapse: 7,
            fromDate: new Date(),
            toDate: new Date(),
            userGroupsInputs: null
        }

        this.renderTimesUsed = this.renderTimesUsed.bind(this);
        this.renderTimesPercentage = this.renderTimesPercentage.bind(this);
        this.renderChartUsers = this.renderChartUsers.bind(this);

        this.filterOptions = this.filterOptions.bind(this);
        this.handleOptions = this.handleOptions.bind(this);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleDateFrom = this.handleDateFrom.bind(this);
        this.handleDateTo = this.handleDateTo.bind(this);

        this.handleUserGroups = this.handleUserGroups.bind(this);
    }

    componentDidMount() {
        this.fetchCharts(this.state.timelapse);
    }

    fetchCharts(timelapse) {
        let toDate = new Date();
        let fromDate = new Date().setDate(toDate.getDate() - timelapse);

        fromDate = new Date(fromDate).toISOString();
        toDate = new Date(toDate).toISOString();

        requestCharts(fromDate, toDate)
            .then(data => {
                this.setState({
                    chartList: data.open_chart_events,
                    userData: data
                });

                this.filterOptions(this.state.filterOptionsChecked, data.open_chart_events);
                this.renderChartList(data.open_chart_events);
                this.renderUserGroups(data.open_chart_events);
            });
    }

    renderChartList(chartList) {
        const mappedChartList = chartList
            .map(chart => {
            return chart.details.chart_name;
            })
            .sort((a, b) => {

                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                } else {
                    return 0;
                }
            });

        this.setState({
            chartNames: [...new Set(mappedChartList)]
        })
    }

    renderTimesUsed(givenChart) {
        const reducedChartList = this.state.chartList.reduce((acc, item) => {
            if (item.details.chart_name === givenChart) {
                acc++;
            }
            return acc;
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
            })

        return [...new Set(mappedUsersData)].length;
    }

    renderUserGroups(chartList) {
        const mappedGroups = chartList.map(item => item.request.user__group__name);
        const usersSet = [...new Set(mappedGroups)];

        const sortedSet = usersSet
            .sort((a, b) => {
                const groupA = a.toLowerCase();
                const groupB = b.toLowerCase();

                if (groupA > groupB) {
                    return 1;
                } else if (groupA < groupB) {
                    return -1;
                } else {
                    return 0;
                }
            });

        const userGroupsInputs = sortedSet.map((item, index) => {
            return (
                <li key={index}>
                    <label htmlFor={item}>
                        <input onChange={this.handleUserGroups} id={item} type="checkbox" value={item} name={item} defaultChecked={true} />
                        {item}
                    </label>
                </li>
            );
        });

        this.setState({
            allGroupsList: usersSet,
            groupsList: usersSet,
            userGroupsInputs: userGroupsInputs
        });
    }

    filterOptions(checked, originalCharts) {

        const removedStyleUser = originalCharts.filter(item => {
            if (checked) {
                return !item.request.user__username.includes('stylesage');
            } else {
                return item;
            }
        });

        this.setState({
            chartList: removedStyleUser
        });
    }

    handleOptions(e) {
        const optionsTarget = e.currentTarget.checked;
        const chartsToFilter = this.state.userData.open_chart_events;

        this.setState({
            filterOptionsChecked: optionsTarget
        });

        this.filterOptions(optionsTarget, chartsToFilter);
    }

    handleDateTo(e) {
        e.persist();
        this.setState({
            toDate: e.currentTarget.value
        }, () => this.handleChangeDate(e));
    }

    handleDateFrom(e) {
        e.persist();
        this.setState({
            fromDate: e.currentTarget.value
        }, () => this.handleChangeDate(e));
    }

    handleChangeDate(e) {
        let ct = new Date();
        let fd = new Date();
        let period;

        if (e.currentTarget) {
            period = e.currentTarget.value;
        }

        switch (period) {
            case 'last-week':
                fd.setDate(fd.getDate() - 7);
                break;

            case 'last-month':
                fd.setMonth(fd.getMonth() - 1);
                break;

            case 'last-two-months':
                fd.setMonth(fd.getMonth() - 2);
                break;

            case 'always':
                fd = new Date(2015, 0, 1, 0, 0);
                break;

            default:
                ct = new Date(this.state.toDate);
                fd = new Date(this.state.fromDate);
                break;
        }

        const timelapse = Math.round((ct - fd) / (1000 * 60 * 60 * 24));

        this.setState({
            timelapse: timelapse
        });

        this.fetchCharts(timelapse);
    }

    handleUserGroups(e) {
        const userGroupsTarget = e.currentTarget.value;

        const groupsList = this.state.groupsList;

        if (e.currentTarget.checked) {
            groupsList.push(userGroupsTarget);

        } else {
            groupsList.splice(userGroupsTarget, 1);
        }

        this.setState({
            groupsList: groupsList
        });

        this.filterUserGroups(groupsList);
    }

    filterUserGroups(groupsList) {
        const originalCharts = this.state.userData.open_chart_events;

        const filteredCharts = originalCharts.filter(chart => {
            const isGroupPresent = groupsList.map(group => {
                if (chart.request.user__group__name === group) {
                    return true;
                } else {
                    return false;
                }
            });

            let isPresent = false;

            for (let ii = 0; ii < isGroupPresent.length; ii++) {
                if (isGroupPresent[ii] === true) {
                    isPresent = true;
                }
            }

            return isPresent;
        });

        this.setState({
            chartList: filteredCharts
        });

        this.filterOptions(this.state.filterOptionsChecked, filteredCharts);
    }

    visibility() {
        const displace = (this.props.hiddenButton === true) ? '' : 'displace';
        return displace;
    }

    render() {
        const { chartNames, userGroupsInputs } = this.state;

        return (
            <div className={`app__container  ${this.visibility()}`}>
                <main className="app__main">
                    <div className="breadcrumb__container">
                        <ul className="breadcrumb__container-list">
                            <li className="breadcrumb__container-item">
                                <Link to="/" className="breadcrumb__link">Overview</Link>
                            </li>>
                            <li className="breadcrumb__container-item">
                                <span>ChartsUsage</span>
                            </li>
                        </ul>
                    </div>
                    <div className="charts__container">
                        <div className="table__container-chart">
                            <TableCharts chartNames={chartNames} renderTimesUsed={this.renderTimesUsed} renderTimesPercentage={this.renderTimesPercentage} renderChartUsers={this.renderChartUsers} />
                        </div>
                        <div className="chart__filters">
                            <div className="chart__filter chart__filter-options">
                                <div className="chart__filter-header">
                                    <i className="zmdi zmdi-account-add"></i>
                                    <h3 className="chart__filter-title">OPTIONS</h3>
                                </div>
                                <div className="chart__filter-content">
                                    <label>
                                        <input type="checkbox" onClick={this.handleOptions} defaultChecked={false} /> exclude support users (x@stylesage.com)
                                    </label>
                                </div>
                            </div>
                            <div className="chart__filter chart__filter-range">
                                <div className="chart__filter-header">
                                    <i className="zmdi zmdi-calendar-check"></i>
                                    <h3 className="chart__filter-title">DATE RANGE</h3>
                                </div>
                                <div className="chart__filter-content">
                                    <p> From: | To:</p>
                                    <div>
                                        <label htmlFor="last-week" >
                                            <input defaultChecked={true} onClick={this.handleChangeDate} type="radio" id="last-week" name="date" value="last-week" className="input__type-radio"/>
                                            last week
                                        </label>
                                    </div>
                                    <div >
                                        <label htmlFor="last-month">
                                            <input onClick={this.handleChangeDate} type="radio" id="last-month" name="date" value="last-month" className="input__type-radio"/>
                                            last month
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="last-two-months">
                                            <input onClick={this.handleChangeDate} type="radio" id="last-two-months" name="date" value="last-two-months" className="input__type-radio" />
                                            last 2 months
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="last-two-months">
                                            <input onClick={this.handleChangeDate} type="radio" id="set-date" name="date" value="set-date" className="input__type-radio" />
                                            set date
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="from-date">
                                            <input onChange={this.handleDateFrom} id="from-date" type="date" name="date??" />
                                        from date
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="to-date">
                                            <input onChange={this.handleDateTo} id="to-date" type="date" name="date??" />
                                            to date
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="always">
                                            <input onClick={this.handleChangeDate} type="radio" id="always" name="date" value="always" className="input__type-radio"/>
                                            always
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="chart__filter chart__filter-groups">
                                <div className="chart__filter-header">
                                    <i className="zmdi zmdi-accounts"></i>
                                    <h3 className="chart__filter-title">USER GROUPS</h3>
                                </div>
                                <div className="chart__filter-content">
                                    <p>select all | select active | clear all</p>
                                    <ul className="chart__filter-listgroups">
                                        {(userGroupsInputs) ? userGroupsInputs : ""}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    };
};

export default ChartsUsage;