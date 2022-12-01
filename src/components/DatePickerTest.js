import { DatePicker } from "antd";
import React, { useState } from 'react';
import moment from "moment";
const { RangePicker } = DatePicker;


function DatePickerTest() {

    const [dates, setDates] = useState([]);

    return (
        <div style={{marginTop: "20px", marginLeft: "20px"}}>

            <RangePicker  
             onChange= {(values) => {

                setDates(values.map(item => {
                    return moment(item).format('YYYY-MM-DD')
                }))

             }}
            
            />

        </div>
    );
}

export default DatePickerTest