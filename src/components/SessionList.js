import React, { Component } from "react";

class SessionList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            sessionsList: []
        }

        this.renderTime = this.renderTime.bind(this);
        this.orderRequestCount = this.orderRequestCount.bind(this);
        this.getQueryUserName = this.getQueryUserName.bind(this);
        this.searchUsername = this.searchUsername.bind(this);
    }

    componentDidMount() {
        const { sessions } = this.props.userData;
        const sessionsList = sessions.slice();

        this.setState({
            sessionsList: sessionsList
        })
    }

    renderTime(timestamp) {
        const sessionStart = new Date(timestamp);

        const year = sessionStart.getFullYear();
        const month = this.addZero((sessionStart.getMonth() + 1).toString());
        const day = this.addZero(sessionStart.getDate().toString());
        const hour = this.addZero(sessionStart.getHours().toString());
        const minutes = this.addZero(sessionStart.getMinutes().toString());

        return (
            year + '-' + month + '-' + day + ',' + hour + ':' + minutes
        )
    }

    addZero(par) {
        if (par.length < 2) {
            par = '0' + par;
        }
        return par;
    }

    renderDuration(duration) {
        const seconds = parseInt(duration % 60);
        const totalMins = parseInt(duration / 60);
        const mins = parseInt(totalMins % 60);
        const hours = parseInt(totalMins / 60);

        let durationString;

        if (hours !== 0) {
            durationString = hours + 'h' + mins + 'm' + seconds + 's';
        } else if (mins !== 0) {
            durationString = mins + 'm' + seconds + 's';
        } else {
            durationString = seconds + 's';
        }
        return durationString;
    }

    orderResultsDuration(list) {
        const sortedList = list.sort((a, b) => {
            return b.duration_sec - a.duration_sec;
        });
        return sortedList;
    }

    orderResultsTimeStarted(list) {
        const sortedList = list.sort((a, b) => {
            const timeA = new Date(a.min_timestamp);
            const timeB = new Date(b.min_timestamp);
            return (timeB - timeA);
        });
        return sortedList;
    }

    sortName(items) {
        items.sort(function (a, b) {
            var nameA = a.user__username.toUpperCase();
            var nameB = b.user__username.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        })
    }

    orderResultsUserName(list) {
        const sortedList = list.sort(this.sortName(list));
        return sortedList;
    }

    orderRequestCount(list) {
        const sortedList = list.sort((a, b) => {
            return b.request_count - a.request_count;
        });
        return sortedList;
    }

    mapResults(list) {
        const mappedSessions = list.map((item, index) => {
            return (
                <li key={index}>
                    <p> Username: {item.user__username}</p>
                    <p>Time Started (local TZ): {this.renderTime(item.min_timestamp)}</p>
                    <p>Duration: {this.renderDuration(item.duration_sec)}</p>
                    <p>Request Count: {item.request_count}</p>
                </li>
            );
        })
        return mappedSessions;
    }

    getQueryUserName(e) {
        const userName = e.currentTarget.value;
        console.log('hola');

        this.searchUsername(userName);

        this.setState({
            query: userName
        })
    }

    searchUsername(userName) {

        const originalList = this.props.userData.sessions;

        const filteredList = originalList.filter(item => {
            return item.user__username.includes(userName);
        });

        this.setState({
            sessionsList: filteredList
        });
    }

    render() {
        this.orderRequestCount(this.state.sessionsList);
        return (
            <React.Fragment>
                <input onKeyUp={this.getQueryUserName}></input>
                <ul>
                    {this.mapResults(this.state.sessionsList)}
                </ul>
            </React.Fragment>
        );
    }
}

export default SessionList;