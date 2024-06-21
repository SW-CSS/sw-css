import Link from 'next/link';
import styled from 'styled-components';

import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR } from '@/constants';

export const SidebarWrapper = styled.div`
  position: fixed;
  width: ${ADMIN_SIDEBAR_WIDTH};
  height: calc(100vh - ${ADMIN_HEADER_HEIGHT});
  margin-top: calc(${ADMIN_HEADER_HEIGHT} + 2px);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.3);
  background-color: white;
`;

export const SidebarLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const SidebarContentLayout = styled.div`
  overflow: hidden;
  transition: max-height 0.6s ease-in-out;
`;

export const SidebarContentTitle = styled.div`
  display: block;
  max-height: 42px;
  padding: 10px 20px;
  border-bottom: 1px solid ${COLOR.border};
  cursor: default;
  overflow: hidden;
`;

export const SidebarContentPointTitle = styled(SidebarContentTitle)`
  background-color: ${COLOR.admin_sub_point};
  color: white;
`;

export const SidebarContentSubTitle = styled(Link)`
  display: block;
  padding: 10px 30px;
  border-bottom: 1px solid ${COLOR.border};
  background-color: ${COLOR.gray_bg};
  cursor: default;
  color: ${COLOR.comment};
`;
