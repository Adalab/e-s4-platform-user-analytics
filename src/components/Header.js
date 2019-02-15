import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {

  render() {
    const { onClick } = this.props;

    return (
      <React.Fragment>
        <header className="app__header">
          <div className="button__container">
            <div className="div__btn btn" type="button" onClick={onClick}>
              <i className="zmdi zmdi-menu"></i>
            </div>
          </div>
          <h1 className="app__header-title"> StyleSage</h1>
        </header>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Header;
