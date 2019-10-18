import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const monthArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      showDatePicker: true,
      showMonthPicker: false,
      showYearPicker: false,
      selectedDate: '',
      selectedDay: 0,
      selectedMonth: 0,
      selectedYear: 0
    };
  }

  componentDidMount = () => {
    let currentDate = new Date();

    if (this.props.date) {
      const splitDate = this.props.date.split('/');
      const stdDateFormat = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
      currentDate = new Date(stdDateFormat);
    }

    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    this.setState({
      selectedDate: this.props.date ? this.props.date : `${day}/${month + 1}/${year}`,
      selectedDay: day,
      selectedMonth: month,
      selectedYear: year
    });
  }

  daysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();

  hidePopup = () => {
    const { showPopup } = this.state;
    this.setState({
      showPopup: !showPopup,
      showDatePicker: true,
      showMonthPicker: false,
      showYearPicker: false
    });
  };

  formatDate = (day, month, year) => {
    const { seperator, monthSelector } = this.props;
    if (monthSelector) {
      return `${monthArray[month].substring(0, 3)}${seperator}${year}`;
    }
    return `${day}${seperator}${month}${seperator}${year}`;
  }


  onDateSelect = (evt) => {
    const { selectedMonth, selectedYear } = this.state;
    const day = parseInt(evt.target.innerText, 10);
    const date = `${day}/${selectedMonth + 1}/${selectedYear}`;

    this.setState({
      selectedDay: day,
      selectedDate: date
    });
    this.hidePopup();
    if (this.props.onDateSelect) {
      this.props.onDateSelect(this.formatDate(day, selectedMonth + 1, selectedYear));
    }
  };

  onMonthSelect = (evt) => {
    const { selectedDay, selectedYear } = this.state;
    const month = evt.target.innerText;
    const monthIndex = monthArray.findIndex(item => item.includes(month));
    if (this.props.monthSelector) {
      this.setState({
        selectedMonth: monthIndex,
        selectedDate: `${selectedDay}/${monthIndex + 1}/${selectedYear}`,
        showMonthPicker: false,
        showPopup: false
      });
    } else {
      this.setState({
        selectedMonth: monthIndex,
        selectedDate: `${selectedDay}/${monthIndex + 1}/${selectedYear}`,
        showMonthPicker: false,
        showDatePicker: true
      });
    }
  };

  onYearSelect = (evt) => {
    const { selectedDay, selectedMonth } = this.state;
    const year = parseInt(evt.target.innerText, 10);

    this.setState({
      selectedYear: year,
      selectedDate: `${selectedDay}/${selectedMonth + 1}/${year}`,
      showYearPicker: false,
      showDatePicker: true
    });
  };

  onPrevMonthClick = () => {
    const { selectedMonth, selectedYear } = this.state;
    let month = 0;
    let year = selectedYear;

    if (selectedMonth === 0) {
      month = 11;
      year = selectedYear - 1;
    } else {
      month = selectedMonth - 1;
    }
    this.setState({
      selectedYear: year,
      selectedMonth: month
    });
  };

  onNextMonthClick = () => {
    const { selectedMonth, selectedYear } = this.state;
    let month = 0;
    let year = selectedYear;

    if (selectedMonth === 11) {
      month = 0;
      year = selectedYear + 1;
    } else {
      month = selectedMonth + 1;
    }
    this.setState({
      selectedYear: year,
      selectedMonth: month
    });
  };

  onMonthPickerSelect = () => {
    if (!this.props.monthSelector) {
      this.setState({
        showYearPicker: false,
        showMonthPicker: true,
        showDatePicker: false
      });
    }
  };

  onYearPickerSelect = () => {
    this.setState({
      showYearPicker: true,
      showMonthPicker: false,
      showDatePicker: false
    });
  };

  getSelectionStyles = (selection, defaultSelection) => {
    const { color } = this.props;

    if (selection === defaultSelection) {
      if (color) {
        return { backgroundColor: color, color: 'white' };
      }
      return { backgroundColor: '#1ca6d9', color: 'white' };
    }
    return {};
  }


  renderDatePicker = () => {
    const { selectedDay, selectedMonth, selectedYear } = this.state;

    const monthDays = this.daysInMonth(selectedMonth, selectedYear);
    const startDay = new Date(`${selectedMonth + 1}/1/${selectedYear}`).getDay();
    let dateArray = [];
    dateArray = new Array(42).fill(null);
    for (let index = startDay, startDate = 1; startDate <= monthDays; index += 1, startDate += 1) {
      dateArray[index] = startDate;
    }

    return (
      <div>
        <div className="week-name-wrapper">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        <div className="date-wrapper">
          {dateArray.map((day, index) => (
            <div
              onClick={evt => this.onDateSelect(evt)}
              role="presentation"
              key={`${index}-${day}`}
              className={day !== null
                ? `date-item` : 'date-space'}
              style={day !== null ? this.getSelectionStyles(day, selectedDay) : {}}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderMonthPicker = () => {
    const { selectedMonth } = this.state;
    return (
      <div className="month-wrapper">
        {monthArray.map((month, index) => (
          <div
            onClick={evt => this.onMonthSelect(evt)}
            role="presentation"
            key={month}
            className="month-item"
            style={this.getSelectionStyles(index, selectedMonth)}
          >
            {month.substring(0, 3)}
          </div>
        ))}
      </div>
    )
  }

  renderYearPicker = () => {
    const { selectedYear } = this.state;

    const yearArray = Array.from(Array(12), (year = selectedYear - 5, i) => year + i);

    return (
      <div className="year-wrapper">
        {yearArray.map(year => (
          <div
            onClick={evt => this.onYearSelect(evt)}
            role="presentation"
            key={year}
            className="year-item"
            style={this.getSelectionStyles(year, selectedYear)}
          >
            {year}
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {
      showYearPicker,
      showMonthPicker,
      showDatePicker,
      selectedDay,
      selectedMonth,
      selectedYear,
      showPopup
    } = this.state;

    const {
      iconURL,
      selectorStyle = {},
      input = false,
      iconPosition = 'right',
      monthSelector = false,
    } = this.props;


    const iconPositionStyle = iconPosition === 'left' ? { flexDirection: 'row-reverse' } : {};
    const iconStyle = iconPosition === 'left' ? { marginLeft: 0, marginRight: 5 } : {};

    return (
      <div
        className="date-picker-wrapper"
      >
        {input
          ? (
            <input
              type="text"
              value={this.formatDate(selectedDay, selectedMonth + 1, selectedYear)}
              onClick={() => this.hidePopup()}
              style={selectorStyle}
              className="date-picker-selector"
            />)
          : (
            <div
              className="date-picker-selector"
              style={{ cursor: 'pointer', ...selectorStyle, ...iconPositionStyle }}
              onClick={() => this.hidePopup()}
              role="presentation"
            >
              {this.formatDate(selectedDay, selectedMonth + 1, selectedYear)}
              {iconURL
                && (
                  <img src={this.props.iconURL} alt="icon" style={iconStyle} />
                )}
            </div>)
        }

        {showPopup
          && (
            <div>
              <div className="date-picker-popup">
                <div className="arrow-up">
                  <div className="inner-triangle" />
                </div>
                <div className="title-wrapper">
                  <span>
                    <span
                      onClick={() => this.onMonthPickerSelect()}
                      role="presentation"
                    >
                      {monthArray[selectedMonth]}
                    </span>
                    <span
                      onClick={evt => this.onYearPickerSelect(evt)}
                      role="presentation"
                    >
                      {`  ${selectedYear}`}
                    </span>

                  </span>
                  <div className="arrow-wrapper">
                    <div
                      className="left-arrow"
                      onClick={() => this.onPrevMonthClick()}
                      role="presentation"
                    />
                    <div
                      className="right-arrow"
                      onClick={() => this.onNextMonthClick()}
                      role="presentation"
                    />
                  </div>
                </div>
                {showDatePicker && !monthSelector && this.renderDatePicker()}
                {(showMonthPicker || (!showYearPicker && monthSelector)) && this.renderMonthPicker()}
                {showYearPicker && this.renderYearPicker()}
              </div>
            </div>
          )}
      </div>
    );
  }
}

DatePicker.propTypes = {
  defaultDate: PropTypes.string,
  monthSelector: PropTypes.bool,
  seperator: PropTypes.string
};

DatePicker.defaultProps = {
  defaultDate: '',
  monthSelector: false,
  seperator: '/'
};

export default DatePicker;
