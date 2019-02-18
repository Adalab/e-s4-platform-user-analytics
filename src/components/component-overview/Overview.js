import React, {Component} from "react";
import { Link } from 'react-router-dom';

class Overview extends Component {

  visibility() {
    const { hiddenButton } = this.props;
    const displace = (hiddenButton === true) ? '' : 'displace';
    return displace;
  }
  render() {
    return (
        <section className={`app__overview ${this.visibility()}`}>
          <div className="overview__title">
            <h2>Welcome to Platform User Analytics</h2>
          </div>
          <div className="overview__buttons">
          <Link to="/session-list" className="aside__item-link">
            <div type="button" className="frame-btn frame-btn-left">
              <h3 className="aside__item-title">Session List</h3>
              <p className="aside__item-text">View information on user sessions,including request count and length of stay.</p>
              <span className="frame-btn__outline frame-btn__outline--tall">
                  <span className="frame-btn__line frame-btn__line--tall"></span>
                  <span className="frame-btn__line frame-btn__line--flat"></span>
              </span>
              <span className="frame-btn__outline frame-btn__outline--flat">
                  <span className="frame-btn__line frame-btn__line--tall"></span>
                  <span className="frame-btn__line frame-btn__line--flat"></span>
              </span>
              <span className="frame-btn__solid"></span>
              <span className="frame-btn__text"></span>
            </div>
          </Link>
          <Link to="/charts-usage" className="aside__item-link">
            <div type="button" className="frame-btn">
             <h3 className="aside__item-title">Chart Usage</h3>
              <p className="aside__item-text">View information on chart visualization, including use of charts by groups and date.</p>
              <span className="frame-btn__outline frame-btn__outline--tall">
                <span className="frame-btn__line frame-btn__line--tall"></span>
                <span className="frame-btn__line frame-btn__line--flat"></span>
                  </span>
                <span className="frame-btn__outline frame-btn__outline--flat">
                    <span className="frame-btn__line frame-btn__line--tall"></span>
                    <span className="frame-btn__line frame-btn__line--flat"></span>
                </span>
                <span className="frame-btn__solid"></span>
                <span className="frame-btn__text"></span>
            </div>
          </Link>
          </div>
        </section>
    );
  }
}

export default Overview;
