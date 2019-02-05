import React, { Component } from "react";
import { Link } from 'react-router-dom';


class Sidebar extends Component {
    render() {
        return (
            <aside className="app__aside">
                <ul className="aside__list">
                    <Link to="/" className="aside__item-link">
                        <li className="aside__item">Overview</li>
                    </Link>
                    <Link to="/session-list" className="aside__item-link">
                        <li className="aside__item">Session List</li>
                    </Link>
                    <Link to="/charts-usage" className="aside__item-link">
                        <li className="aside__item">Charts Usage</li>
                    </Link>
                </ul>
            </aside>
        );
    }
}

export default Sidebar;