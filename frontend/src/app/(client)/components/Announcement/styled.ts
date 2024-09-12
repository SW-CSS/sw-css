'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const AnnouncementItem = styled(Link)`
  border: 1px solid ${COLOR.border};
  border-radius: ${BORDER_RADIUS.sm};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  &:hover > * {
    color: ${COLOR.primary.main};
  }
`;

export const AnnouncementTitle = styled.span`
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font: ${FONT_STYLE.base.semibold};
  color: ${COLOR.black_text};
`;

export const AnnouncementDate = styled.span`
  width: 90px;
  flex-shirk: 1;
  text-align: right;
  font: ${FONT_STYLE.sm.normal};
  color: ${COLOR.comment};
`;
