import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const AdminButton = styled.button`
  padding: 4px 8px;
  border-radius: ${BORDER_RADIUS.sm};
  border: none;
  font: ${FONT_STYLE.base.normal};
  cursor: pointer;
`;

export const AdminBlueButton = styled(AdminButton)`
  background-color: ${COLOR.admin_point};
  color: white;
`;

export const AdminRedButton = styled(AdminButton)`
  background-color: ${COLOR.admin_red};
  color: white;
`;

export const AdminBlackButton = styled(AdminButton)`
  background-color: black;
  color: white;
`;

export const AdminGrayButton = styled(AdminButton)`
  background-color: ${COLOR.admin_sub_point_light};
  border: 1px solid ${COLOR.admin_sub_point};
  color: ${COLOR.comment};
`;
