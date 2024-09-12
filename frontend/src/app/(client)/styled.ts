'use client';

import styled from 'styled-components';

import { MAX_WIDTH, RESPONSIVE_WIDTH } from '@/constants';

export const MainPageWrapper = styled.div`
  max-width: ${MAX_WIDTH};
  min-height: calc(100vh - 200px);
  margin: auto;
  padding: 77px 0 40px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    padding-top: 50px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  padding: 10px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.tablet}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const MilestoneWrapper = styled(ContentWrapper)`
  width: 500px;
  flex-shrink: 0;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    width: 380px;
  }

  @media screen and (max-width: ${RESPONSIVE_WIDTH.tablet}) {
    width: 100%;
  }
`;

export const AnnouncementContent = styled(ContentWrapper)`
  flex-grow: 1;
  min-width: 0;
`;
