'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, FONT_STYLE, COLOR } from '@/constants';

interface StatusTextProps {
  color: string;
}

export const TeamBuildingWrapper = styled(Link)`
  width: 360px;
  border: 2px solid ${COLOR.border};
  border-radius: ${BORDER_RADIUS.sm};
  overflow: hidden;
`;

export const TeamHeaderWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CategoryText = styled.p`
  border-bottom-right-radius: ${BORDER_RADIUS.sm};
  padding: 6px 12px;
  background-color: ${COLOR.border};
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.base.semibold};
`;

export const StatusText = styled.p<StatusTextProps>`
  border: 1px solid ${(props) => props.color};
  border-radius: ${BORDER_RADIUS.sm};
  padding: 2px 8px;
  color: ${(props) => props.color};
  font: ${FONT_STYLE.sm.normal};
`;

export const TeamBodyWrapper = styled.div`
  margin: 8px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
`;

export const TeamTitle = styled.p`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.base.bold};

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    white-space: wrap;
    word-break: keep-all;
  }
`;

export const RecruitmentWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const RecruitmentItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const RecruitmentItemText = styled.div`
  font: ${FONT_STYLE.sm.semibold};
  color: ${COLOR.comment};
  text-align: center;
`;

export const ViewDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
  color: ${COLOR.comment};
`;
