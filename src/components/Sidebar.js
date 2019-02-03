import React, { Component } from "react";

class Sidebar extends Component {
    render() {
        return (
            <aside className="aside__sidebar">
                <ul>
                    <li>
                        <a href="">Overview</a>
                    </li>
                    <li>
                        <a href="">Session List</a>
                    </li>
                    <li>
                        <a href="">Charts Usage</a>
                    </li>
                </ul>
            </aside>
        );
    }
}

export default Sidebar;