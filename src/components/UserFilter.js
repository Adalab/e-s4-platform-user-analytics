import React, { Component } from "react";

class UserFilter extends Component {
    render() {
        const { getQueryUsername } = this.props;

        return (
            <div className="search__container">
                <div className="search__input-container">
                    <label htmlFor="username"></label>
                    <input type="text" id="username" className="search__input" placeholder="search" name="username" onKeyUp={getQueryUsername} />
                </div>
                <p className="search__info-total">Showing **1124/1124** entries</p>
            </div>
        );
    }
}

export default UserFilter;