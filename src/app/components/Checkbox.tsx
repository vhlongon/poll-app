import { clsx } from 'clsx';
import { InputHTMLAttributes, PropsWithChildren } from 'react';

type CheckBoxProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>;

export const Checkbox = ({ children, className, ...rest }: CheckBoxProps) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer label flex gap-2">
        <span className="label-text">{children}</span>
        <input
          type="checkbox"
          className={clsx('checkbox checkbox-secondary', className)}
          {...rest}
        />
      </label>
    </div>
  );
};
