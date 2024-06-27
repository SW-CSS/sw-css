'use client';

import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const TitleWrapper = styled.div`
  display: flex;
`;

export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font: ${FONT_STYLE.xl.semibold};
  cursor: default;
`;

export const Description = styled.p`
  font: ${FONT_STYLE.sm.normal};
  color: ${COLOR.comment};
  cursor: default;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font: ${FONT_STYLE.sm.semibold};
  color: ${COLOR.black_text};
`;

export const Input = styled.input`
  border: 1px solid ${COLOR.border};
  border-radius: ${BORDER_RADIUS.sm};
  padding: 8px;
  font: ${FONT_STYLE.base.normal};
  color: ${COLOR.black_text};
  outline: none;
  &::placeholder {
    color: ${COLOR.border};
    font-style: italic;
  }
`;

export const InputFixedText = styled.div`
  position: absolute;
  color: ${COLOR.comment};
  right: 10px;
  bottom: calc(50% - 10px);
  transform: translate(0, 50%);
  font: ${FONT_STYLE.sm.normal};
`;

export const SignButton = styled.button`
  width: 100%;
  border: none;
  border-radius: ${BORDER_RADIUS.sm};
  padding: 8px;
  background-color: ${COLOR.primary.main};
  color: ${COLOR.white};
  font: ${FONT_STYLE.base.normal};
`;
