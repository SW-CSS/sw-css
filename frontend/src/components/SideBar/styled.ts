'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';

export const FooterWrapper = styled.div`
  width: 100vw;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.border};
`;
