'use client';
import { ComponentProps } from 'react';
import MultiDatePicker from 'react-multi-date-picker';
import './datepicker.css';

type DatePickerProps = Omit<
  ComponentProps<typeof MultiDatePicker>,
  'className' | 'containerClassName' | 'inputClass'
> & { label?: string };
export const DatePicker = ({ label, ...props }: DatePickerProps) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <MultiDatePicker
        inputClass="input input-bordered w-full"
        containerClassName="w-full"
        {...props}
      />
    </label>
  );
};
