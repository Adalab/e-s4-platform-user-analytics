import React, { Component } from "react";

class Sidebar extends Component {
    render() {
        return (
            <aside className="app__aside">
                <ul className="aside__list">
                    <li className="aside__item">
                        <a className="aside__item-link" href="#">Overview</a>
                    </li>
                    <li className="aside__item">
                        <a className="aside__item-link" href="#">Session List</a>
                    </li>
                    <li className="aside__item">
                        <a className="aside__item-link" href="#">Charts Usage</a>
                    </li>
                </ul>
            </aside>
        );
    }
}

export default Sidebar;