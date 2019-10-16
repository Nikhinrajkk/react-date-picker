import React, { Component } from 'react';
import { render } from 'react-dom';
import DatePicker from './js/date-picker';

class MyApp extends Component {
  onDateSelect = (selectedDate) => {
    console.log(selectedDate);
  }

  render() {
    return (
      <div>
        <DatePicker onDateSelect={this.onDateSelect}/>
      </div>
    );
  }
}

render(<MyApp />, document.getElementById('root'));
