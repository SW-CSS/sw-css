'use client';

import styled from 'styled-components';
import { COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';
import Link from 'next/link';

interface SidebarCategoryProps {
  isCurrentCategory: boolean;
}

interface SidebarCategoryListProps {
  isOpen: boolean;
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
    display: none;
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

export const SidebarCategoryList = styled.div<SidebarCategoryListProps>`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 30px;
  flex-direction: column;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    transition: height 0.2s ease-in-out;
    position: absolute;
    top: 45px;
    left: 0;
    height: 0;
    overflow: hidden;
    margin-top: 0px;
    background-color: ${COLOR.gray_bg_light};
    ${(props) => props.isOpen && `height: 123px;`}
  }
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

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    margin-bottom: 0px;
    padding: 10px 15px;
    border-bottom: 1px solid ${COLOR.border};
    color: ${COLOR.comment};
    font: ${FONT_STYLE.sm};
    ${(props) =>
      props.isCurrentCategory &&
      `color: ${COLOR.malibu_text};
        text-decoration: none;`};
  }
`;

export const SidebarMobileWrapper = styled.div`
  display: none;
  width: 100%;
  height: inherit;
  position: relative;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: block;
  }
`;

export const SidebarMobileButton = styled.button`
  display: none;
  width: 100%;
  height: 45px;
  background-color: ${COLOR.mobile_sidebar};
  color: ${COLOR.white};
  padding: 0px 15px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
