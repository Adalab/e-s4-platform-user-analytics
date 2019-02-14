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
            allGroupsList: [
                'Die Antwoord',
                'Explosions in the Sky',
                'Justice',
                'Radical Face',
                'Ratatat',
                'RHCP',
                'Stromae'
            ],
            groupsList: [],
            filterOptionsChecked: true,
            timelapse: 7,
            fromDate: new Date(),
            toDate: new Date(),
        }

        this.handleOptions = this.handleOptions.bind(this);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleDateFrom = this.handleDateFrom.bind(this);
        this.handleDateTo = this.handleDateTo.bind(this);

        this.handleUserGroups = this.handleUserGroups.bind(this);
    }

    componentDidMount() {
        this.fetchCharts(this.state.timelapse);

        const groups = this.state.allGroupsList;
        this.setState({
            groupsList: groups
        });
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

                this.renderUserGroups(data.open_chart_events);
                this.filterAll();
            });
    }

    handleOptions(e) {
        const optionsTarget = e.currentTarget.checked;

        this.setState({
            filterOptionsChecked: optionsTarget
        }, () => this.filterAll());
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

        if (groupsList.indexOf(e.currentTarget.value) === -1) {
            groupsList.push(userGroupsTarget);

        } else {
            groupsList.splice(userGroupsTarget, 1);
        }

        this.setState({
            groupsList: groupsList
        }, () => this.filterAll());
    }

    //Este es bien
    renderUserGroups() {
        const sortedSet = this.state.allGroupsList;
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
            userGroupsInputs: userGroupsInputs
        });
    }

    filterAll() {
        const originalCharts = this.state.userData.open_chart_events;
        const supportChecked = this.state.filterOptionsChecked;

        const removedStyleUser = originalCharts.filter(item => {
            if (supportChecked) {
                return !item.request.user__username.includes('stylesage');
            } else {
                return item;
            }
        });

        const filteredCharts = removedStyleUser.filter(chart => {
            const isGroupPresent = this.state.allGroupsList.map(group => {
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
    }

    render() {
        const { chartList } = this.state;
        const userGroupsInputs = this.state.userGroupsInputs;

        return (
            <div className="app__container">
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
                        <div className="table__container">
                            <TableCharts chartList={chartList} />
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
                                            <input defaultChecked={true} onClick={this.handleChangeDate} type="radio" id="last-week" name="date" value="last-week" className="input__type-radio" />
                                            last week
                                        </label>
                                    </div>
                                    <div >
                                        <label htmlFor="last-month">
                                            <input onClick={this.handleChangeDate} type="radio" id="last-month" name="date" value="last-month" className="input__type-radio" />
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
                                            <input onClick={this.handleChangeDate} type="radio" id="always" name="date" value="always" className="input__type-radio" />
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
                                        {userGroupsInputs}
                                        {/* <li key={index}>
                                            <label htmlFor={item}>
                                                <input onChange={this.handleUserGroups} id={item} type="checkbox" value={item} name={item} defaultChecked={true} />
                                                {item}
                                            </label>
                                        </li> */}
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