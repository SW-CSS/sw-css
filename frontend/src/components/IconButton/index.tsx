/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { FONT_STYLE } from '@/constants';

export interface IconButtonProps {
  icon: React.ReactElement;
  title: string;
  size: 'sm' | 'md' | 'lg';
  link: string;
}

const IconButtonWrapper = styled(Link)`
  width: 60px;
  height: 50px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: transparent;
  }
`;

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
    <IconButtonWrapper href={link}>
      {Icon}
      <span
        style={{
          font: `${size === 'sm' ? FONT_STYLE.xs : size === 'md' ? FONT_STYLE.base.normal : FONT_STYLE.lg.normal}`,
        }}
      >
        {title}
      </span>
    </IconButtonWrapper>
  );
};

export default IconButton;
