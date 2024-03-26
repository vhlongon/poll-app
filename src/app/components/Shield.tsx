import { ReactNode } from 'react';

type ShieldProps = {
  children: ReactNode;
};

export const Shield = ({ children }: ShieldProps) => {
  return (
    <div className="flex justify-center items-center w-8 h-8 mask mask-hexagon bg-neutral">
      <span className="text text-xs font-bold tracking-wider">{children}</span>
    </div>
  );
};
