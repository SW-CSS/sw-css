import React from 'react';
import Link from 'next/link';

export interface IconButtonProps {
  icon: React.ReactElement;
  title: string;
  link: string;
}

export default function IconButton({ icon, title, link }: IconButtonProps) {
  const width = '24px';
  const height = '24px';

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
      <span className="text-xs">{title}</span>
    </Link>
  );
}
