import React, { useState } from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

/*
https://www.cluemediator.com/how-to-add-datetimepicker-in-reactjs#:~:text=Steps%20to%20add%20DateTimePicker%20in%20ReactJS%201%201.,display%20DateTime%20picker%20...%204%204.%20Output%20
npm i moment
npm i react-datetime
 */
function Datetimepicker() {
    console.log("Datetime");
    const [dt, setDt] = useState(moment());
    return (
      <div className="App">
        <h2>Datetime picker in ReactJS - <a href="https://www.cluemediator.com">Clue Mediator</a></h2>
        <DatePicker
          inputProps={{
            style: { width: 250 }
          }}
          value={dt}
          dateFormat="DD-MM-YYYY"
          timeFormat="hh:mm A"
          onChange={val => setDt(val)}
        /> <br />
        <div><b>Date:</b> {dt.format('LLL')}</div>
      </div>
    );
}
export default Datetimepicker