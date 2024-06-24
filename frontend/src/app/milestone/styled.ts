'use client';

import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';

interface ResponsiveImageProps {
  maxHeight: string;
  maxWidth: string;
  backgroundImage?: string;
}

export const ContentWrapper = styled.div`
  background-color: ${COLOR.border};
`;

export const Content = styled.div`
  width: 100%;
  background-color: white;
  padding: 60px 20px 20px 20px;
  border-radius: ${BORDER_RADIUS.sm};
`;

export const Title = styled.div`
  color: ${COLOR.malibu_text};
  font: ${FONT_STYLE.xl.bold};
  margin: 20px auto;
`;

export const Description = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

export const InformationList = styled.ul`
  margin-top: 70px;
`;

export const Information = styled.li`
  display: flex;
  margin-bottom: 40px;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.mobile}) {
    display: block;
  }
`;

export const InformationTitle = styled.div`
  color: ${COLOR.malibu_text};
  font: ${FONT_STYLE.lg.semibold};
  width: 220px;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.mobile}) {
    margin-bottom: 10px;
  }
`;
export const ImageWrapper = styled.div<ResponsiveImageProps>`
  display: flex;
  justify-content: center;
  ${({ backgroundImage }) => backgroundImage && `background-image: url(${backgroundImage});`}
  background-position: center;
  img {
    position: relative !important;
    height: 100%;
    width: 100%;
    max-height: ${(props) => props.maxHeight};
    max-width: ${(props) => props.maxWidth};
    object-fit: cover;
  }
`;
