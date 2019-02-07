import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TableCharts from './TableCharts';

class ChartsUsage extends Component {


    render() {
        return (
            <div className="app__container">
                <main className="app__main">
                    <div className="breadcrumb__container">
                        <ul className="breadcrumb__container-list">
                            <li className="breadcrumb__container-item">
                                <Link to="/">Overview</Link>
                            </li>>
                            <li className="breadcrumb__container-item">
                                <span>ChartsUsage</span>
                            </li>
                        </ul>
                    </div>
                    <div className="charts__container">
                        <div className="table__container">
                            <TableCharts />
                        </div>
                        <div className="chart__filters">
                            <div className="chart__filters-options">
                                    <h3>OPTIONS</h3>
                                    <label>
                                        <input type="radio"></input> exclude support users (x@stylesage.com)
                                    </label>
                            </div>
                            <div className="chart__filters-range">
                                <h3>DATE RANGE</h3>
                                <p> From: | To:</p>
                                <div>
                                    <label>
                                        <input type="radio" />last week
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" />last month
                                    </label>
                                </div>
                               <div>
                                    <label>
                                        <input type="radio"/>last 2 months
                                    </label>
                               </div>
                               <div>
                                    <label>
                                        <input type="radio" /> set date
                                    </label> 
                               </div>
                                <div>
                                    <label>
                                        <input type="radio" /> always
                                    </label>
                                </div>
                                
                            </div>
                                    
                            <div className="chart__filters-groups">
                                <h3>USER GROUPS</h3>
                                <p>select all | select active | clear all</p>
                                <div>
                                    <label for="flightoption1">
                                        <input id="flightoption1" type="checkbox" value="chooseseat" name="flightoptions" />>
                                        ejemplo
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                    
                </main>
            </div>
        );
    }
}

export default ChartsUsage;