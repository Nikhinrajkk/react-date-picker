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
    };

    this.daysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();

    this.togglePopup = () => {
      const { showPopup, blured } = this.state;
      if (!blured) {
        this.setState({
          showPopup: !showPopup,
          showDatePicker: true,
          showMonthPicker: false,
          showYearPicker: false
        }, () => {
          if (!showPopup) {
            this.datePicker.current.focus();
          }
        });
      }
      this.setState({
        blured: false
      });
    };

    this.onBlur = () => {
      this.setState({
        showPopup: false,
        blured: true
      }, () => setTimeout(() => this.setState({ blured: false }), 100));
    };

    this.formatDateDigit = digit => digit < 10 ? `0${digit}` : digit;

    this.formatDate = (day, month, year) => {
      const { seperator, monthSelector, dateFormat } = this.props;
      if (monthSelector) {
        switch (dateFormat) {
          case 'MMYYYY':
            return `${this.formatDateDigit(month + 1)}${seperator}${year}`;
          case 'YYYYMM':
            return `${year}${seperator}${this.formatDateDigit(month + 1)}`;
          case 'MM':
            return `${this.formatDateDigit(month + 1)}`;
          case 'YYYYMon':
            return `${year}${seperator}${monthArray[month].substring(0, 3)}`;
          case 'Mon':
            return monthArray[month].substring(0, 3);
          case 'Month':
            return monthArray[month];
          default:
            return `${monthArray[month].substring(0, 3)}${seperator}${year}`;
        }
      }

      switch (dateFormat) {
        case 'DDMonYYYY':
          return `${this.formatDateDigit(day)}${seperator}${monthArray[month].substring(0, 3)}${seperator}${year}`;
        case 'YYYYMonDD':
          return `${year}${seperator}${monthArray[month].substring(0, 3)}${seperator}${this.formatDateDigit(day)}`;
        case 'DDMonthYYYY':
          return `${this.formatDateDigit(day)}${seperator}${monthArray[month]}${seperator}${year}`;
        case 'YYYYMonthDD':
          return `${year}${seperator}${monthArray[month]}${seperator}${this.formatDateDigit(day)}`;
        case 'DDMMYY':
          return `${this.formatDateDigit(day)}${seperator}${this.formatDateDigit(month + 1)}${seperator}${`${year}`.substring(2, 4)}`;
        case 'YYMMDD':
          return `${`${year}`.substring(2, 4)}${seperator}${this.formatDateDigit(month + 1)}${seperator}${this.formatDateDigit(day)}`;
        case 'YYYYMMDD':
          return `${year}${seperator}${this.formatDateDigit(month + 1)}${seperator}${this.formatDateDigit(day)}`;
        default:
          return `${this.formatDateDigit(day)}${seperator}${this.formatDateDigit(month + 1)}${seperator}${year}`;
      }
    };

    this.onDateSelect = evt => {
      const { selectedMonth, selectedYear } = this.state;
      const day = parseInt(evt.target.innerText, 10);
      if (day) {
        const date = `${day}/${selectedMonth + 1}/${selectedYear}`;

        this.setState({
          selectedDay: day,
          selectedDate: date
        });
        this.setState({
          showPlaceHolder: false
        });
        this.togglePopup();
        this.props.onDateSelect(this.formatDate(day, selectedMonth, selectedYear));
      }
    };

    this.onMonthSelect = evt => {
      const { selectedDay, selectedYear } = this.state;
      const month = evt.target.innerText;
      const monthIndex = monthArray.findIndex(item => item.includes(month));
      if (this.props.monthSelector) {
        this.setState({
          selectedMonth: monthIndex,
          selectedDate: `${selectedDay}/${monthIndex + 1}/${selectedYear}`,
          showMonthPicker: false,
          showPopup: false,
          showPlaceHolder: false
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

    this.onPrevClick = () => {
      const { selectedMonth, selectedYear, showYearPicker } = this.state;
      let month = 0;
      let year = selectedYear;

      if (showYearPicker) {
        year -= 1;
      } else {
        if (selectedMonth === 0) {
          month = 11;
          year = selectedYear - 1;
        } else {
          month = selectedMonth - 1;
        }
      }

      this.setState({
        selectedYear: year,
        selectedMonth: month
      });
    };

    this.onNextClick = () => {
      const { selectedMonth, selectedYear, showYearPicker } = this.state;
      let month = 0;
      let year = selectedYear;

      if (showYearPicker) {
        year += 1;
      } else {
        if (selectedMonth === 11) {
          month = 0;
          year = selectedYear + 1;
        } else {
          month = selectedMonth + 1;
        }
      }

      this.setState({
        selectedYear: year,
        selectedMonth: month
      });
    };

    this.onMonthPickerSelect = () => {
      if (!this.props.monthSelector) {
        this.setState({
          showYearPicker: false,
          showMonthPicker: true,
          showDatePicker: false
        });
      }
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

    this.renderDatePicker = () => {
      const { selectedDay, selectedMonth, selectedYear } = this.state;

      const monthDays = this.daysInMonth(selectedMonth, selectedYear);
      const startDay = new Date(`${selectedMonth + 1}/1/${selectedYear}`).getDay();
      let dateArray = [];
      dateArray = new Array(42).fill(null);
      for (let index = startDay, startDate = 1; startDate <= monthDays; index += 1, startDate += 1) {
        dateArray[index] = startDate;
      }

      return React.createElement(
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
      );
    };

    this.renderMonthPicker = () => {
      const { selectedMonth } = this.state;
      return React.createElement(
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
      );
    };

    this.renderYearPicker = () => {
      const { selectedYear } = this.state;

      const yearArray = Array.from(Array(12), (year = selectedYear - 5, i) => year + i);

      return React.createElement(
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
      );
    };

    this.state = {
      showPopup: false,
      showDatePicker: true,
      showMonthPicker: false,
      showYearPicker: false,
      selectedDate: '',
      selectedDay: 0,
      selectedMonth: 0,
      selectedYear: 0,
      showPlaceHolder: true,
      blured: false
    };

    this.datePicker = React.createRef();
  }

  render() {
    const {
      showYearPicker,
      showMonthPicker,
      showDatePicker,
      selectedDay,
      selectedMonth,
      selectedYear,
      showPopup,
      showPlaceHolder
    } = this.state;

    const {
      iconURL,
      selectorStyle = {},
      input = false,
      iconPosition = 'right',
      monthSelector = false,
      placeHolder,
      disabled
    } = this.props;

    const iconPositionStyle = iconPosition === 'left' ? { flexDirection: 'row-reverse' } : {};
    const iconStyle = iconPosition === 'left' ? { marginLeft: 0, marginRight: 5 } : {};

    return React.createElement(
      'div',
      {
        className: 'date-picker-wrapper'
      },
      input ? React.createElement('input', {
        type: 'text',
        value: placeHolder === '' || !showPlaceHolder ? this.formatDate(selectedDay, selectedMonth, selectedYear) : placeHolder,
        onClick: !disabled ? () => this.togglePopup() : undefined,
        style: _extends({}, selectorStyle, { opacity: disabled ? 0.5 : 1 }),
        className: 'date-picker-selector'
      }) : React.createElement(
        'div',
        {
          className: 'date-picker-selector',
          style: _extends({ cursor: 'pointer' }, selectorStyle, iconPositionStyle, { opacity: disabled ? 0.5 : 1 }),
          onClick: !disabled ? () => this.togglePopup() : undefined,
          role: 'presentation'
        },
        placeHolder === '' || !showPlaceHolder ? this.formatDate(selectedDay, selectedMonth, selectedYear) : placeHolder,
        iconURL && React.createElement('img', { src: this.props.iconURL, alt: 'icon', style: iconStyle })
      ),
      showPopup && React.createElement(
        'div',
        {
          tabIndex: '-1',
          onBlur: this.onBlur,
          ref: this.datePicker
        },
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
                onClick: () => this.onPrevClick(),
                role: 'presentation'
              }),
              React.createElement('div', {
                className: 'right-arrow',
                onClick: () => this.onNextClick(),
                role: 'presentation'
              })
            )
          ),
          showDatePicker && !monthSelector && this.renderDatePicker(),
          (showMonthPicker || !showYearPicker && monthSelector) && this.renderMonthPicker(),
          showYearPicker && this.renderYearPicker()
        )
      )
    );
  }
}

DatePicker.propTypes = {
  onDateSelect: PropTypes.func,
  defaultDate: PropTypes.string,
  input: PropTypes.bool,
  iconURL: PropTypes.string,
  selectorStyle: PropTypes.shape(),
  iconPosition: PropTypes.string,
  monthSelector: PropTypes.bool,
  monthSelector: PropTypes.bool,
  seperator: PropTypes.string,
  dateFormat: PropTypes.string,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool
};

DatePicker.defaultProps = {
  onDateSelect: () => {},
  defaultDate: '',
  input: false,
  iconURL: null,
  selectorStyle: {},
  iconPosition: 'right',
  monthSelector: false,
  monthSelector: false,
  seperator: '/',
  dateFormat: 'DD/MM/YYYY',
  placeHolder: '',
  disabled: false
};

export default DatePicker;