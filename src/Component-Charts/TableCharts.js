import React, { Component } from "react";

class TableCharts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            row: ''
        }

   
    }

    // mapResults(list) {
    
    //         return (
    //             <tr className="table__tr" key={index}>
    //                 <td className="table__td"></td>
    //                 <td className="table__td"></td>
    //                 <td className="table__td"></td>
    //                 <td className="table__td"></td>
    //             </tr>
    //         );
    //     }

      
    // }

    render() {

        return (
            <table className="table">
                <thead className="table__thead">
                    <tr className="table__tr">
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Username</p>
                              
                            </div>
                        </th>
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Time Started (local TZ)</p>
                               
                            </div>
                        </th>
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Duration</p>
                               
                            </div>
                        </th>
                        <th className="table__th">
                            <div className="table__content">
                                <p className="table__title">Request Count</p>
                             
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="table__tbody">
                    
                </tbody>
            </table>
        );
    }
}

export default TableCharts;