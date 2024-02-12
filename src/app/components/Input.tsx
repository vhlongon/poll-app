import clsx from 'clsx';
import React, { InputHTMLAttributes, PropsWithChildren } from 'react';

type InputProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>;

export const Input = ({ children, className, ...props }: InputProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{children}</span>
      </div>
      <input
        className={clsx('input input-bordered w-full', className)}
        {...props}
      />
    </label>
  );
};
