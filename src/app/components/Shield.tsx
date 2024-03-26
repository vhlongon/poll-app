import { ReactNode } from 'react';
import clsx from 'clsx';

type ShieldProps = {
  children: ReactNode;
  className?: string;
};

export const Shield = ({ children, className }: ShieldProps) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center w-7 h-7 mask mask-hexagon bg-neutral',
        className
      )}
    >
      <span className="text text-[0.625rem] font-bold tracking-wider">
        {children}
      </span>
    </div>
  );
};
