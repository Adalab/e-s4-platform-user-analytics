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
            <h2>Welcome to Platform user Analytics</h2>
          </div>
          <div className="overview__buttons">
          <Link to="/session-list" className="aside__item-link">
            <div type="button" className="frame-btn frame-btn-left">View list of last sessions on the platform.
              <span class="frame-btn__outline frame-btn__outline--tall">
                  <span class="frame-btn__line frame-btn__line--tall"></span>
                  <span class="frame-btn__line frame-btn__line--flat"></span>
              </span>
              <span class="frame-btn__outline frame-btn__outline--flat">
                  <span class="frame-btn__line frame-btn__line--tall"></span>
                  <span class="frame-btn__line frame-btn__line--flat"></span>
              </span>
              <span class="frame-btn__solid"></span>
              <span class="frame-btn__text"></span>
            </div>
          </Link>
          <Link to="/charts-usage" className="aside__item-link">
            <div type="button" className="frame-btn"> View the use of the charts in the platform.
              <span class="frame-btn__outline frame-btn__outline--tall">
                <span class="frame-btn__line frame-btn__line--tall"></span>
                <span class="frame-btn__line frame-btn__line--flat"></span>
                  </span>
                <span class="frame-btn__outline frame-btn__outline--flat">
                    <span class="frame-btn__line frame-btn__line--tall"></span>
                    <span class="frame-btn__line frame-btn__line--flat"></span>
                </span>
                <span class="frame-btn__solid"></span>
                <span class="frame-btn__text"></span>
            </div>
          </Link>
          </div>
        </section>
    );
  }
}

export default Overview;
