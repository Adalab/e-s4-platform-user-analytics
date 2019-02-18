import React, { Component } from "react";
import PropTypes from "prop-types";

class UserFilter extends Component {
  render() {
    const { getQueryUsername, resultsNumber } = this.props;

    return (
      <div className="search__container">
        <div className="search__input-container">
          <label htmlFor="username">
            <span className="icon__search"> <i className="zmdi zmdi-search"></i></span>
            <input type="text" id="username" className="search__input" placeholder="search" name="username" onKeyUp={getQueryUsername} />
         </label>
        </div>
        <p className="search__info-total">Showing {resultsNumber} entries</p>
      </div>
    );
  }
}

UserFilter.propTypes = {
  getQueryUsername: PropTypes.func.isRequired,
  resultsNumber: PropTypes.string.isRequired
}

export default UserFilter;
