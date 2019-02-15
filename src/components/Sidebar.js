import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';


class Sidebar extends Component {

  visibility() {
    const { hiddenButton } = this.props;
    const hiddenClass = (hiddenButton === true) ? 'hidden' : 'NO-hidden';
    return hiddenClass;
  }
  render() {
    return (
      <aside className={`app__aside ${this.visibility()}`}>
        <div className="app__aside-header">
          <i className="zmdi zmdi-chart"></i>
          <p className="app__aside-title">User analytics</p>
        </div>
        <ul className="aside__list">
          <li className="aside__item">
            <Link to="/" className="aside__item-link">Overview</Link>
          </li>
          <li className="aside__item">
            <Link to="/session-list" className="aside__item-link">Session List</Link>
          </li>
          <li className="aside__item">
            <Link to="/charts-usage" className="aside__item-link">Charts Usage</Link>
          </li>
        </ul>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  hiddenButton: PropTypes.bool.isRequired
}

export default Sidebar;
