import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode };

export const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        className={clsx('input input-bordered w-full', className)}
        {...props}
      />
    </label>
  );
};
