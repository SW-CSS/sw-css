'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { SIGN_WIDTH, RESPONSIVE_WIDTH, FONT_STYLE, COLOR } from '@/constants';

export const SignInPageWrapper = styled.div`
  max-width: ${SIGN_WIDTH};
  margin: auto;
  padding: 80px 0 40px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    padding-top: 50px;
  }
`;

export const SignInContentWrapper = styled.div`
  padding: 70px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.mobile}) {
    padding: 20px;
  }
`;

export const SuggestionComment = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  color: ${COLOR.comment};
`;

export const Divisor = styled.div`
  position: relative;
  font: ${FONT_STYLE.xs.normal};
  z-index: 0;

  &::after {
  content: '';
  position: absolute;
  bottom: 25%;
  right: 0;
  height: 50%;
  border-right: 1px solid ${COLOR.comment};
`;

export const FindLink = styled(Link)`
  font: ${FONT_STYLE.xs.normal};
  color: ${COLOR.comment};
`;

export const SignUpLink = styled(Link)`
  font: ${FONT_STYLE.xs.normal};
  color: ${COLOR.comment};
  text-decoration: underline;
`;
