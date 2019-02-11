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
            filterOptionsQuery: '',
            allGroupsList: [],
            groupsList: [],
            userGroupsInputs: null
        }

        this.renderChartList = this.renderChartList.bind(this);
        this.renderTimesUsed = this.renderTimesUsed.bind(this);
        this.renderTimesPercentage = this.renderTimesPercentage.bind(this);
        this.renderChartUsers = this.renderChartUsers.bind(this);
        this.filterOptions = this.filterOptions.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
        this.renderUserGroups = this.renderUserGroups.bind(this);
        this.handleUserGroups = this.handleUserGroups.bind(this);
    }

    componentDidMount() {
        this.fetchCharts();
    }

    fetchCharts() {
        requestCharts()
            .then(data => {
                this.setState({
                    userData: data,
                    chartList: data.open_chart_events
                });

                this.renderChartList(data.open_chart_events);
                this.renderUserGroups(data.open_chart_events);
            });
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
            })

        return [...new Set(mappedUsersData)].length;
    }

    filterOptions(checked) {
        const originalCharts = this.state.userData.open_chart_events;
        const duplicateCharts = originalCharts.slice();
        const removedStyleUser = duplicateCharts.filter(item => {
            if (checked) {
                return !item.request.user__username.includes('stylesage');
            } else {
                return item;
            }
        });

        this.setState({
            chartList: removedStyleUser
        })
    }

    handleOptions(e) {
        const optionsTarget = e.currentTarget.checked;
        this.setState({
            filterOptionsQuery: optionsTarget
        });

        this.filterOptions(optionsTarget);
    }

    renderUserGroups(chartList) {
        const mappedGroups = chartList.map(item => item.request.user__group__name);
        const usersSet = [...new Set(mappedGroups)];

        const userGroupsInputs = usersSet.map((item, index) => {
            return (
                <li key={index}>
                    <label htmlFor={item}>
                        <input onChange={this.handleUserGroups} id={item} type="checkbox" value={item} name={item} />
                        {item}
                    </label>
                </li>
            );
        })

        this.setState({
            allGroupsList: usersSet,
            userGroupsInputs: userGroupsInputs
        });
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
            })

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
    }

    render() {
        const { chartNames, userGroupsInputs } = this.state;
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
                            <TableCharts chartNames={chartNames} renderTimesUsed={this.renderTimesUsed} renderTimesPercentage={this.renderTimesPercentage} renderChartUsers={this.renderChartUsers} />
                        </div>
                        <div className="chart__filters">
                            <div className="chart__filters-options">
                                <h3>OPTIONS</h3>
                                <label>
                                    <input type="checkbox" onClick={this.handleOptions} defaultChecked={false} /> exclude support users (x@stylesage.com)
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
                                <ul>
                                    {(userGroupsInputs) ? userGroupsInputs : ""}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default ChartsUsage;