import React, { Component, Fragment } from "react";
import TableSessionList from "./TableSessionList";
import PropTypes from "prop-types";

class Pagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: 1,
      pageCount: 1,
      pageSize: 5,
      controls: [],
      matrixControls: [[]]
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.createButtons = this.createButtons.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  componentDidMount() {
    this.getButtons();
  }

  createButtons(matrixControls, page) {
    const baseClassName = "footer__button-page";

    const arrayPage = matrixControls.filter(arr => arr.indexOf(page) !== -1)[0]

    let arrayBtns;

    if (arrayPage) {
      arrayBtns = arrayPage
        .map(item => {
          return (
            <li className={`${baseClassName} ${baseClassName} ${this.state.currentPage === item ? `${baseClassName}--active` : ''}`} onClick={() => { this.setCurrentPage(item) }} key={item}>{item}</li>
          )
        });
    }

    return arrayBtns;

  }

  getButtons() {
    const startingPage = 1;
    const { sessionsList } = this.props;
    const pageSize = this.state.pageSize;

    let pageCount = parseInt(sessionsList.length / pageSize);

    if (sessionsList.length % pageSize > 0) {
      pageCount++;
    }

    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    });

    this.createControls(pageCount);
  }

  createControls(pageCount) {
    let controls = [];

    for (let i = 1; i <= pageCount; i++) {
      controls.push(i);
    }

    this.setCurrentPage(1);

    let matrixControls = [];

    const shownPageButtons = 4;

    for (let i = 0; i <= controls.length; i += shownPageButtons) {
      matrixControls.push(controls.slice(i, i + shownPageButtons));
    }

    this.setState({
      controls: controls,
      matrixControls: matrixControls
    });
  }

  handleSelect(e) {
    const option = e.currentTarget.value;
    this.setState({
      pageSize: parseInt(option)
    }, () => this.getButtons());

    this.createControls();
  }

  setCurrentPage(num) {
    const { sessionsList } = this.props;
    const pageSize = this.state.pageSize;
    const currentPage = num;
    const upperLimit = currentPage * pageSize;
    const dataSlice = sessionsList.slice((upperLimit - pageSize), upperLimit);

    this.setState({
      dataSlice: dataSlice,
      currentPage: num
    });
  }

  render() {
    const { controls, matrixControls, dataSlice, currentPage } = this.state;

    const baseClassName = "footer__button-page";

    const arIni = [
      (<li className={`${baseClassName}`} key="First" onClick={() => { this.setCurrentPage(1) }}>First</li>),
      (<li className={`${baseClassName}`} key="Previous" onClick={() => { (this.state.currentPage === 1) ? this.setCurrentPage(1) : this.setCurrentPage(this.state.currentPage - 1) }}>Previous</li>)
    ];

    const arEnd = [
      (<div className={`${baseClassName}`} key="Next" onClick={() => { (this.state.currentPage === (controls.length)) ? this.setCurrentPage(controls.length) : this.setCurrentPage(this.state.currentPage + 1) }}>Next</div>),
      (<div className={`${baseClassName}`} key="Last" onClick={() => { this.setCurrentPage(controls.length) }}>Last</div>)
    ];

    return (
      <Fragment>
        <footer className="app__footer">
					<div className="footer__select-page">
						<p>Show
							<select onChange={this.handleSelect} className="select__content-page">
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="20">20</option>
							</select>
							entries per page
						</p>
					</div>
					<div className="footer__button">
						{arIni}
						{this.createButtons(matrixControls, currentPage)}
						{arEnd}
					</div>
				</footer>
          <div className='pagination-results'>
            {(dataSlice) ?
              <TableSessionList
                sessionsList={dataSlice}
                renderTime={this.props.renderTime}
                orderResultsUsername={this.props.orderResultsUsername}
                orderResultsTimeStarted={this.props.orderResultsTimeStarted}
                orderResultsDuration={this.props.orderResultsDuration}
                orderResultsRequestCount={this.props.orderResultsRequestCount}
              /> : 'no results'}
          </div>
      </Fragment>
    );
  }
}

Pagination.Proptypes = {
  sessionsList: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  renderTime: PropTypes.func.isRequired,
  orderResultsUsername: PropTypes.func.isRequired,
  orderResultsTimeStarted: PropTypes.func.isRequired,
  orderResultsDuration: PropTypes.func.isRequired,
  orderResultsRequestCount: PropTypes.func.isRequired
}

export default Pagination;
