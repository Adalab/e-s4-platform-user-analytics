import React, { Component } from "react";

class Header extends Component {
    
    render() {
        return (
            <React.Fragment>
                <header className="app__header">
                <div className="button__container">
                    <div className="div__btn btn" type="button" onClick={this.props.onClick}>
                            <i className="zmdi zmdi-menu"></i>
                        </div>
                </div>
                <h1 className="app__header-title"> <span className="span-style">Style</span><span className="span-sage">Sage</span></h1>
                </header>
            </React.Fragment>
        );
    }
}

export default Header;