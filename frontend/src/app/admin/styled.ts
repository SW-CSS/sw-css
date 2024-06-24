'use client';

import styled from 'styled-components';

import { COLOR, FONT_STYLE } from '@/adminConstants';
import { BORDER_RADIUS } from '@/constants';

export const AdminButton = styled.button`
  padding: 4px 8px;
  border-radius: ${BORDER_RADIUS.sm};
  border: none;
  font: ${FONT_STYLE.base.normal};
  cursor: pointer;
`;

export const AdminBlueButton = styled(AdminButton)`
  background-color: ${COLOR.primary.main};
  color: white;
`;

export const AdminRedButton = styled(AdminButton)`
  background-color: ${COLOR.semantic.error};
  color: white;
`;

export const AdminBlackButton = styled(AdminButton)`
  background-color: black;
  color: white;
`;

export const AdminGrayButton = styled(AdminButton)`
  background-color: ${COLOR.secondary.light};
  border: 1px solid ${COLOR.secondary.main};
  color: ${COLOR.comment};
`;

export const AdminLink = styled.a`
  padding: 4px 8px;
  border-radius: ${BORDER_RADIUS.sm};
  border: none;
  font: ${FONT_STYLE.base.normal};
  cursor: pointer;
`;

export const AdminBlueLink = styled(AdminLink)`
  background-color: ${COLOR.primary.main};
  color: white;
`;

export const AdminRedLink = styled(AdminLink)`
  background-color: ${COLOR.semantic.error};
  color: white;
`;

export const AdminBlackLink = styled(AdminLink)`
  background-color: black;
  color: white;
`;

export const AdminGrayLink = styled(AdminLink)`
  background-color: ${COLOR.secondary.light};
  border: 1px solid ${COLOR.secondary.main};
  color: ${COLOR.comment};
`;
