import React, { Component } from "react";

class UserFilter extends Component {
    render() {
        return (
            <div className="username__filter">
                <div className="username__filter-search">
                    <label htmlFor="username"></label>
                    <input type="text" id="username" className="username__filter-field" placeholder="search" name="username" />
                </div>
                <p className="username__results-number">Showing **1124/1124** entries</p>
            </div>
        );
    }
}

export default UserFilter;