'use client';

import styled from 'styled-components';

import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR } from '@/adminConstants';
import { RESPONSIVE_WIDTH } from '@/constants';

export const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const FlexContentWrapper = styled(ContentWrapper)`
  width: 800px;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    width: 100%;
  }
`;

<<<<<<< Feature/#24-카테고리별_하위경로에_대한_네비게이션바_제작
export const PageLayout = styled.div`
  overflow: hidden;
=======
export const AnnouncementContent = styled(ContentWrapper)`
  flex-grow: 1;
>>>>>>> main
`;
