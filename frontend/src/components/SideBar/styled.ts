'use client';

import styled from 'styled-components';
import { COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';
import Link from 'next/link';

interface SidebarCategoryProps {
  isCurrentCategory: boolean;
}

export const SidebarWrapper = styled.div`
  width: 290px;
  height: 100%;
  min-height: calc(100vh - 280px);
  display: block;
  padding: 40px 20px 0px 20px;
  border-right: 1px solid ${COLOR.border};
  background-color: ${COLOR.white};

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    width: 100%;
    background-color: ${COLOR.mobile_sidebar}
    border-right: none;
  }
`;

export const SidebarCategoryTitle = styled.p`
  font: ${FONT_STYLE.xl.semibold};
`;

export const SidebarCategoryDescription = styled.p`
  font: ${FONT_STYLE.sm};
  color: ${COLOR.comment};
  margin-top: 30px;
  word-break: keep-all;
`;

export const SidebarCategoryList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 30px;
  flex-direction: column;
`;

export const SidebarCategory = styled(Link)<SidebarCategoryProps>`
  font: ${FONT_STYLE.lg.semibold};
  margin-bottom: 20px;
  color: ${COLOR.comment};
  line-height: 40px;

  ${(props) =>
    props.isCurrentCategory &&
    `
  color: ${COLOR.black_text};
  text-decoration: underline;
    text-underline-offset: 12px;
  `}
`;
