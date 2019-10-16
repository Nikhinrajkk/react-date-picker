import React from 'react';
import { render } from 'react-dom';
import DatePicker from './js/date-picker';

const dateSelect = (date) => {
  debugger
}

render(<DatePicker onDateSelect={dateSelect}/>, document.getElementById('root'));
