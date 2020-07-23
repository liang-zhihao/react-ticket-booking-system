import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "rsuite-table/dist/css/rsuite-table.css";
import { dateFormat } from 'utils/timeFormat';
//  const MyDatePicker
export default ({ date, itemId, onChange, ...props }) => {
    const [startDate, setStartDate] = useState(new Date(date));
  
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        //   onChange(dateFormat(date), itemId);
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    );
  };