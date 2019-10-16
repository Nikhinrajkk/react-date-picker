var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
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
    };

    this.daysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();

    this.hidePopup = () => {
      const { showPopup } = this.state;
      this.setState({
        showPopup: !showPopup,
        showDatePicker: true,
        showMonthPicker: false,
        showYearPicker: false
      });
    };

    this.onDateSelect = evt => {
      const { selectedMonth, selectedYear } = this.state;
      const day = parseInt(evt.target.innerText, 10);
      const date = `${day}/${selectedMonth + 1}/${selectedYear}`;

      this.setState({
        selectedDay: day,
        selectedDate: date
      });
      this.hidePopup();
      if (this.props.onDateSelect) {
        this.props.onDateSelect(date);
      }
    };

    this.onMonthSelect = evt => {
      const { selectedDay, selectedYear } = this.state;
      const month = evt.target.innerText;
      const monthIndex = monthArray.findIndex(item => item.includes(month));
      this.setState({
        selectedMonth: monthIndex,
        selectedDate: `${selectedDay}/${monthIndex + 1}/${selectedYear}`,
        showMonthPicker: false,
        showDatePicker: true
      });
    };

    this.onYearSelect = evt => {
      const { selectedDay, selectedMonth } = this.state;
      const year = parseInt(evt.target.innerText, 10);

      this.setState({
        selectedYear: year,
        selectedDate: `${selectedDay}/${selectedMonth + 1}/${year}`,
        showYearPicker: false,
        showDatePicker: true
      });
    };

    this.onPrevMonthClick = () => {
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

    this.onNextMonthClick = () => {
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

    this.onMonthPickerSelect = () => {
      this.setState({
        showYearPicker: false,
        showMonthPicker: true,
        showDatePicker: false
      });
    };

    this.onYearPickerSelect = () => {
      this.setState({
        showYearPicker: true,
        showMonthPicker: false,
        showDatePicker: false
      });
    };

    this.getSelectionStyles = (selection, defaultSelection) => {
      const { color } = this.props;

      if (selection === defaultSelection) {
        if (color) {
          return { backgroundColor: color, color: 'white' };
        }
        return { backgroundColor: '#1ca6d9', color: 'white' };
      }
      return {};
    };

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

    const {
      iconURL,
      selectorStyle = {},
      input = false,
      iconPosition = 'right'
    } = this.props;

    const monthDays = this.daysInMonth(selectedMonth, selectedYear);
    const startDay = new Date(`${selectedMonth + 1}/1/${selectedYear}`).getDay();
    let dateArray = [];
    dateArray = new Array(42).fill(null);
    for (let index = startDay, startDate = 1; startDate <= monthDays; index += 1, startDate += 1) {
      dateArray[index] = startDate;
    }

    const yearArray = Array.from(Array(12), (year = selectedYear - 5, i) => year + i);

    const iconPositionStyle = iconPosition === 'left' ? { flexDirection: 'row-reverse' } : {};
    const iconStyle = iconPosition === 'left' ? { marginLeft: 0, marginRight: 5 } : {};

    return React.createElement(
      'div',
      {
        className: 'date-picker-wrapper'
      },
      input ? React.createElement('input', {
        type: 'text',
        value: selectedDate,
        onClick: () => this.hidePopup(),
        style: selectorStyle,
        className: 'date-picker-selector'
      }) : React.createElement(
        'div',
        {
          className: 'date-picker-selector',
          style: _extends({ cursor: 'pointer' }, selectorStyle, iconPositionStyle),
          onClick: () => this.hidePopup(),
          role: 'presentation'
        },
        selectedDate,
        iconURL && React.createElement('img', { src: this.props.iconURL, alt: 'icon', style: iconStyle })
      ),
      showPopup && React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'date-picker-popup' },
          React.createElement(
            'div',
            { className: 'arrow-up' },
            React.createElement('div', { className: 'inner-triangle' })
          ),
          React.createElement(
            'div',
            { className: 'title-wrapper' },
            React.createElement(
              'span',
              null,
              React.createElement(
                'span',
                {
                  onClick: () => this.onMonthPickerSelect(),
                  role: 'presentation'
                },
                monthArray[selectedMonth]
              ),
              React.createElement(
                'span',
                {
                  onClick: evt => this.onYearPickerSelect(evt),
                  role: 'presentation'
                },
                `  ${selectedYear}`
              )
            ),
            React.createElement(
              'div',
              { className: 'arrow-wrapper' },
              React.createElement('div', {
                className: 'left-arrow',
                onClick: () => this.onPrevMonthClick(),
                role: 'presentation'
              }),
              React.createElement('div', {
                className: 'right-arrow',
                onClick: () => this.onNextMonthClick(),
                role: 'presentation'
              })
            )
          ),
          showDatePicker && React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'week-name-wrapper' },
              React.createElement(
                'div',
                null,
                'Su'
              ),
              React.createElement(
                'div',
                null,
                'Mo'
              ),
              React.createElement(
                'div',
                null,
                'Tu'
              ),
              React.createElement(
                'div',
                null,
                'We'
              ),
              React.createElement(
                'div',
                null,
                'Th'
              ),
              React.createElement(
                'div',
                null,
                'Fr'
              ),
              React.createElement(
                'div',
                null,
                'Sa'
              )
            ),
            React.createElement(
              'div',
              { className: 'date-wrapper' },
              dateArray.map((day, index) => React.createElement(
                'div',
                {
                  onClick: evt => this.onDateSelect(evt),
                  role: 'presentation',
                  key: `${index}-${day}`,
                  className: day !== null ? `date-item` : 'date-space',
                  style: day !== null ? this.getSelectionStyles(day, selectedDay) : {}
                },
                day
              ))
            )
          ),
          showMonthPicker && React.createElement(
            'div',
            { className: 'month-wrapper' },
            monthArray.map((month, index) => React.createElement(
              'div',
              {
                onClick: evt => this.onMonthSelect(evt),
                role: 'presentation',
                key: month,
                className: 'month-item',
                style: this.getSelectionStyles(index, selectedMonth)
              },
              month.substring(0, 3)
            ))
          ),
          showYearPicker && React.createElement(
            'div',
            { className: 'year-wrapper' },
            yearArray.map(year => React.createElement(
              'div',
              {
                onClick: evt => this.onYearSelect(evt),
                role: 'presentation',
                key: year,
                className: 'year-item',
                style: this.getSelectionStyles(year, selectedYear)
              },
              year
            ))
          )
        )
      )
    );
  }
}

DatePicker.propTypes = {
  defaultDate: PropTypes.string
};

DatePicker.defaultProps = {
  defaultDate: ''
};

export default DatePicker;