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

export const Chart = styled.div<ChartProps>`
  margin: 0 auto;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 100%;
  background: ${COLOR.milestone.gray.light};
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

interface ChartTextProps {
  fontSize: 'sm' | 'lg';
}

export const ChartText = styled.p<ChartTextProps>`
  color: ${COLOR.comment};
  font: ${({ fontSize }) => {
    switch (fontSize) {
      case 'sm':
        return FONT_STYLE.xs.normal;
      case 'lg':
        return FONT_STYLE.base.normal;
      default:
        return FONT_STYLE.sm.normal;
    }
  }};
`;

export const ChartScoreText = styled(ChartText)<ChartTextProps>`
  color: ${COLOR.black_text};
  font: ${({ fontSize }) => {
    switch (fontSize) {
      case 'sm':
        return FONT_STYLE.base.normal;
      case 'lg':
        return FONT_STYLE.xl.normal;
      default:
        return FONT_STYLE.lg.normal;
    }
  }};
`;
