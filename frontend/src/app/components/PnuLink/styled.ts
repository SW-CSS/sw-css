/* eslint-disable import/no-extraneous-dependencies */
import { VscChevronLeft } from '@react-icons/all-files/vsc/VscChevronLeft';
import { VscChevronRight } from '@react-icons/all-files/vsc/VscChevronRight';
import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PrevButton = styled(VscChevronLeft)`
  font: ${FONT_STYLE.xl.semibold};
  color: ${COLOR.black_text};
  border: 1px solid ${COLOR.comment};
  border-radius: ${BORDER_RADIUS.full};
`;

export const NextButton = styled(VscChevronRight)`
  font: ${FONT_STYLE.xl.semibold};
  color: ${COLOR.black_text};
  border: 1px solid ${COLOR.comment};
  border-radius: ${BORDER_RADIUS.full};
`;

export const PnuLinker = styled(Link)`
  width: 162px;
  height: 52px;
  display: block;
  border: 1px solid ${COLOR.border};
`;
