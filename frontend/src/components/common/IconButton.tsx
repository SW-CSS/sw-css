import React from 'react';

import { FONT_STYLE } from '@/constants';
import Link from 'next/link';

export interface IconButtonProps {
  icon: React.ReactElement;
  title: string;
  size: 'sm' | 'md' | 'lg';
  link: string;
}

const IconButton = ({ icon, title, size, link }: IconButtonProps) => {
  const width = size === 'sm' ? '24px' : size === 'md' ? '32px' : '80px';
  const height = size === 'sm' ? '24px' : size === 'md' ? '32px' : '80px';

  const Icon = React.createElement(icon.type, {
    ...{
      ...icon.props,
      style: { width, height },
    },
  });

  return (
    <Link
      className="mr-2 flex h-[50px] w-[60px] cursor-pointer flex-col items-center justify-center border-none bg-transparent"
      href={link}
    >
      {Icon}
      <span
        style={{
          font: `${
            size === 'sm' ? FONT_STYLE.xs.normal : size === 'md' ? FONT_STYLE.base.normal : FONT_STYLE.lg.normal
          }`,
        }}
      >
        {title}
      </span>
    </Link>
  );
};

export default IconButton;
