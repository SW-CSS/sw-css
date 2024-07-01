'use client';

import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';
import { MilestoneGroup } from '@/data/milestoneGroup';

export const Content = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: ${BORDER_RADIUS.sm};
`;

export const Title = styled.div`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.xl.bold};
  margin-bottom: 25px;
`;

export const SubTitle = styled.div`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.lg.bold};
  margin-bottom: 25px;
`;

export const MilestoneWrapper = styled.div`
  min-width: 330px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TableBody = styled.tbody`
  border-top: 2px solid ${COLOR.black_text};
  border-bottom: 2px solid ${COLOR.black_text};
  font: ${FONT_STYLE.sm.normal};
  > :last-child {
    border-bottom: 0px solid;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${COLOR.border};
  text-align: center;
  > td,
  > th {
    padding: 10px;
  }

  > td:first-child {
    text-align: left;
  }
`;

export const HistoryDescription = styled.td`
  width: 540px;
`;

interface GroupLabelProps {
  group: MilestoneGroup;
}

export const GroupLabel = styled.span<GroupLabelProps>`
  ${({ group }) => {
    switch (group) {
      case MilestoneGroup.ACTIVITY:
        return `background-color: ${COLOR.milestone.blue.light}; color:${COLOR.milestone.blue.dark};`;
      case MilestoneGroup.GLOBAL:
        return `background-color: ${COLOR.milestone.green.light}; color:${COLOR.milestone.green.dark};`;
      case MilestoneGroup.COMMUNITY:
        return `background-color: ${COLOR.milestone.purple.light}; color:${COLOR.milestone.purple.dark};`;
      default:
        return COLOR.milestone.gray.light;
    }
  }};
  font: ${FONT_STYLE.xs.normal};
  padding: 2px 8px;
  border-radius: ${BORDER_RADIUS.sm};
`;
