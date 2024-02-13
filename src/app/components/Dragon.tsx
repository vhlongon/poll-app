import Image from 'next/image';
import React from 'react';

export const Dragon = () => {
  return (
    <Image
      className="rounded-full animate-ping"
      src="/dragon.webp"
      alt="dragon"
      width={200}
      height={200}
    />
  );
};
