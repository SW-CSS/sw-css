'use client';

import styled from 'styled-components';

import { COLOR, FONT_STYLE } from '@/constants';

interface ChartProps {
  size: number;
}

interface ChartBarProps {
  start: number;
  score: number;
  color: string;
}

interface SquareProps {
  size: number;
  color: string;
}

export const ChartWrapper = styled.div`
  margin: 12px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-around;
`;

export const Chart = styled.div<ChartProps>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 100%;
  background: ${COLOR.milestone.gray};
`;

export const ChartBar = styled.div<ChartBarProps>`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background: conic-gradient(
    transparent ${(props) => (props.start / 1000.0) * 360}deg,
    ${(props) => props.color} ${(props) => (props.start / 1000.0) * 360}deg,
    ${(props) => props.color} ${(props) => ((props.start + props.score) / 1000.0) * 360}deg,
    transparent ${(props) => ((props.start + props.score) / 1000.0) * 360}deg
  );
`;

export const ChartHole = styled.div<ChartProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.size / 1.7}px;
  height: ${(props) => props.size / 1.7}px;
  border-radius: 100%;
  background: ${COLOR.white};
`;

export const ChartTextWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ChartText = styled.p`
  color: ${COLOR.comment};
  font: ${FONT_STYLE.xs.normal};
`;

export const ChartScoreText = styled(ChartText)`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.base.bold};
`;

export const TableWrapper = styled.div`
  flex-grow: 1;
  max-width: 300px;
  display: grid;
  grid-template-columns: 70% 30%;
  color: ${COLOR.comment};
  text-align: center;
  align-content: center;
`;

export const TableTopBorderContent = styled.div`
  padding: 4px;
  border-top: 1px solid ${COLOR.black_text};
  font: ${FONT_STYLE.xs.normal};
`;

export const TableBottomBorderContent = styled.div`
  padding: 4px;
  border-bottom: 1px solid ${COLOR.border};
  font: ${FONT_STYLE.xs.normal};
`;

export const TableTitle = styled(TableBottomBorderContent)`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.xs.semibold};
`;

export const ScoreContent = styled(TableBottomBorderContent)`
  display: flex;
  padding-left: 14px;
  align-items: center;
  gap: 4px;
`;

export const Square = styled.div<SquareProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${(props) => props.color};
`;
