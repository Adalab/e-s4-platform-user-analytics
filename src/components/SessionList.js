import React, { Component } from "react";

class SessionList extends Component {

    constructor(props) {
        super(props);
    }

    renderTime(timestamp) {
        const sessionStart = new Date(timestamp);

        const year = this.addZero(sessionStart.getFullYear());
        let month = this.addZero((sessionStart.getMonth() + 1).toString());
        let day = this.addZero(sessionStart.getDate().toString());
        let hour = this.addZero(sessionStart.getHours().toString());
        let minutes = this.addZero(sessionStart.getMinutes().toString());

        return (
            year + '-' + month + '-' + day + ',' + hour + ':' + minutes
        )
    };

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
    };

    orderResultsDuration(sessionsList) {
        const sortedList = sessionsList.sort((a,b)=> {
            return b.duration_sec - a.duration_sec;
        });
        return sortedList;
    }


    orderResultsTimeStarted(sessionsList) {
        // const sessionStart = new Date(sessionsList.min_timestamp);
        const sortedList = sessionsList.sort((a,b)=> {
            const timeA = new Date(a.min_timestamp);
            const timeB = new Date(b.min_timestamp);
            return (timeB.value - timeA.value);
        });
        return sortedList;
    }

    sortName(items) {
        items.sort(function(a, b) {
        var nameA = a.user__username.toUpperCase(); // ignore upper and lowercase
        var nameB = b.user__username.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }   
        })
    }

    orderResultsUserName(sessionsList) {
        const sortedList = sessionsList.sort(this.sortName(sessionsList));
        return sortedList;
    }

    mapResults(sessionsList) {
        const mappedSessions = sessionsList.map((item, index) => {
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


    render() {
        const { sessions } = this.props.userData;
        const sessionsList = sessions.slice();
        this.orderResultsTimeStarted(sessionsList);
        return (
            <ul>
                {this.mapResults(sessionsList)}
            </ul>);
    }
}

export default SessionList;