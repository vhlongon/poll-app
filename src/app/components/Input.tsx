import React, { InputHTMLAttributes, PropsWithChildren } from 'react';

type InputProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>;

export const Input = ({ children }: InputProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{children}</span>
      </div>
      <input
        required
        type="text"
        id="name"
        name="name"
        placeholder="Event name"
        className="input input-bordered w-full"
      />
    </label>
  );
};
