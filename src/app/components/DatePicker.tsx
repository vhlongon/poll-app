'use client';
import { ComponentProps } from 'react';
import MultiDatePicker from 'react-multi-date-picker';
import './datepicker.css';

type DatePickerProps = Omit<
  ComponentProps<typeof MultiDatePicker>,
  'className' | 'containerClassName' | 'inputClass'
>;
export const DatePicker = ({ ...props }: DatePickerProps) => {
  return (
    <MultiDatePicker
      inputClass="input input-bordered w-full"
      containerClassName="w-full"
      {...props}
    />
  );
};
