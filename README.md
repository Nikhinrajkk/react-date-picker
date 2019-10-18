# react-custom-date-selector

A date selector component for your React app ([Demo](https://nikhinrajkk.github.io/react-date-picker/))

* Select Day, Month and Year
* Can use as Month picker as well
* 15 Date / Month formats available
* Can change date seperator
* Can customize the styles
* No dependencies needed

![calander](https://user-images.githubusercontent.com/22662965/66898189-4d662f80-f016-11e9-837e-ee5f4bf9a9a9.png)


## Installation

This package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-custom-date-selector --save
```

## Getting started

### Compatibility
Your project needs to use React 16 or later

### Installation

Add ReactPicker to your project by executing `npm install react-date-picker`

### Usage

Here's an example of basic usage:

```js
import React, { Component } from 'react';
import DatePicker from 'react-custom-date-selector';

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
```
### Props

|Prop name|Description|Default value|Example values|
|----|----|----|----|
|date|To set custom date as prop|`"current date"`|`"15-08-2019"`|
|dateFormat|To select display `date format`|<ul><li>Date: `"DDMMYYYY"`</li><li>Month: `"MonYYYY"`</li></ul>|For date picker<ul><li>`"YYYYMMDD"`</li><li>`"DDMonYYYY"`</li><li>`"DDMonthYYYY"`</li><li>`"DDMonYYYY"`</li><li>`"YYYYMonthDD"`</li><li>`"DDMMYY"`</li><li>`"YYMMDD"`</li></ul>For month picker<ul><li>`"YYYYMon"`</li><li>`"MMYYYY"`</li><li>`"YYYYMM"`</li><li>`"MM"`</li><li>`"Mon"`</li><li>`"Month"`</li></ul>|
|input|To change selector `Button` to `Input`|`false`|`true`|
|seperator|To change selector date seperator|`"/"`|`"-"`|
|monthSelector|To use as `Month Picker`|`false`|`true`|
|color|To change color of the selected `day` / `month` / `year`|`"#1CA6D9"`|`"#32A852"`|
|selectorStyle|To change the selector `Button / Input` style|`{}`|`{ border: '1px solid gray' }`|
|iconURL|To add `icon` to selector `Button`|`n/a`|`"assets/calander.svg"`|
|iconPosition|To change icon's `position`|`"right"`|`"left"`|


## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/22662965/66898950-c3b76180-f017-11e9-86e6-2634ca04bab5.jpg" width="50">
    </td>
    <td>
      Nikhin Raj<br />
      <a href="mailto:nikhinrajkk@gmail.com">nikhinrajkk@gmail.com</a><br />
    </td>
  </tr>
</table>

## Thank You !
