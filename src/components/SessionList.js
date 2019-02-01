import React, { Component } from "react";

class SessionList extends Component {

    renderTime(timestamp) {
        const sessionStart = new Date(timestamp);
        
        const year = sessionStart.getFullYear();
        let month = (sessionStart.getMonth() + 1).toString();
        let day = sessionStart.getDate().toString();
        let hour = sessionStart.getHours().toString();
        let minutes = sessionStart.getMinutes().toString();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        if (hour.length < 2) {
            hour = '0' + hour;
        }

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        return (
            year + '-' + month + '-' + day + ',' + hour + ':' + minutes
        )
    };

    renderDuration(duration){
        const seconds = parseInt(duration%60);
        const totalMins = parseInt(duration/60);
        const mins = parseInt(totalMins%60);
        const hours = parseInt(totalMins/60);

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


    render() {
        return (
            <li>
                {this.props.userData.sessions.map((item, index) => {
                    return (
                        <ul key={index}>
                            <p> Username: {item.user__username}</p>
                            <p>Time Started (local TZ): {this.renderTime(item.min_timestamp)}</p>
                            <p>Duration: {this.renderDuration(item.duration_sec)}</p>
                            <p>Request Count: {item.request_count}</p>
                        </ul>
                    );
                })}
            </li>);
    }
}

export default SessionList;