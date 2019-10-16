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

    if (this.props.defaultDate) {
      const splitDate = this.props.defaultDate.split('/');
      const stdDateFormat = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
      currentDate = new Date(stdDateFormat);
    }

    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    this.setState({
      selectedDate: this.props.defaultDate ? this.props.defaultDate : `${day}/${month + 1}/${year}`,
      selectedDay: day,
      selectedMonth: month,
      selectedYear: year
    });
  }

  daysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();

  hidePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
      showDatePicker: true,
      showMonthPicker: false,
      showYearPicker: false,
    });
  };


  onDateSelect = (evt) => {
    const { selectedMonth, selectedYear } = this.state;
    const day = parseInt(evt.target.innerText, 10);
    const date = `${day}/${selectedMonth + 1}/${selectedYear}`;

    this.setState({
      selectedDay: day,
      selectedDate: date
    })
    this.hidePopup();
    this.props.onDateSelect && this.props.onDateSelect(date);
  };

  onMonthSelect = (evt) => {
    const { selectedDay, selectedYear } = this.state;
    const month = evt.target.innerText;
    const monthIndex = monthArray.findIndex(item => item.includes(month));
    this.setState({
      selectedMonth: monthIndex,
      selectedDate: `${selectedDay}/${monthIndex + 1}/${selectedYear}`,
      showMonthPicker: false,
      showDatePicker: true
    })
  };

  onYearSelect = (evt) => {
    const { selectedDay, selectedMonth } = this.state;
    const year = parseInt(evt.target.innerText, 10);

    this.setState({
      selectedYear: year,
      selectedDate: `${selectedDay}/${selectedMonth + 1}/${year}`,
      showYearPicker: false,
      showDatePicker: true
    })
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
    })
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
    })
  };

  onMonthPickerSelect = () => {
    this.setState({
      showYearPicker: false,
      showMonthPicker: true,
      showDatePicker: false
    })
  };

  onYearPickerSelect = () => {
    this.setState({
      showYearPicker: true,
      showMonthPicker: false,
      showDatePicker: false
    })
  };

  render() {
    const {
      showYearPicker,
      showMonthPicker,
      showDatePicker,
      selectedDate,
      selectedDay,
      selectedMonth,
      selectedYear,
      showPopup
    } = this.state;

    const monthDays = this.daysInMonth(selectedMonth, selectedYear);
    const startDay = new Date(`${selectedMonth + 1}/1/${selectedYear}`).getDay();
    let dateArray = [];
    dateArray = new Array(42).fill(null);
    for (let index = startDay, startDate = 1; startDate <= monthDays; index += 1, startDate += 1) {
      dateArray[index] = startDate;
    }

    const yearArray = Array.from(Array(12), (year = selectedYear - 5, i) => year + i);


    return (
      <div className="date-picker-wrapper">
        <div
          className="date-picker-selector"
          onClick={() => this.hidePopup()}
          role="presentation"
        >
          {selectedDate}
        </div>
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
                {showDatePicker
                  && (
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
                        {dateArray.map((date, index) => (
                          <div
                            onClick={evt => this.onDateSelect(evt)}
                            role="presentation"
                            className={date !== null
                              ? `date-item ${date === selectedDay
                              && 'selected-date-item'}` : 'date-space'}
                              key={`${index}-${date}`}
                          >
                            {date}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                {showMonthPicker
                  && (
                    <div className="month-wrapper">
                      {monthArray.map((month, index) => (
                        <div
                          onClick={evt => this.onMonthSelect(evt)}
                          role="presentation"
                          className={`month-item ${index === selectedMonth && 'selected-date-item'}`}
                          key={month}
                        >
                          {month.substring(0, 3)}
                        </div>
                      ))}
                    </div>
                  )}
                {showYearPicker
                  && (
                    <div className="year-wrapper">
                      {yearArray.map(year => (
                        <div
                          onClick={evt => this.onYearSelect(evt)}
                          role="presentation"
                          key={year}
                          className={`year-item ${year === selectedYear && 'selected-date-item'}`}
                        >
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}
      </div>
    )
  }
};

DatePicker.propTypes = {
  defaultDate: PropTypes.string
};

DatePicker.defaultProps = {
  defaultDate: ''
};

export default DatePicker;
