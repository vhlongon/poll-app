'use client';
import './datepicker.css';
import MultiDatePicker from 'react-multi-date-picker';

export const DatePicker = () => {
  return (
    <MultiDatePicker
      multiple
      placeholder="Select dates"
      name="dates"
      format="MM/DD/YY"
      minDate={new Date()}
      inputClass="input input-bordered w-full"
      containerClassName="w-full"
    />
  );
};
