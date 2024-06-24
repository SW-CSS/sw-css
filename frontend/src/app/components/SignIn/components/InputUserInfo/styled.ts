import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const Input = styled.input`
  border: 1px solid ${COLOR.border};
  border-radius: ${BORDER_RADIUS.sm};
  padding: 8px;
  font: ${FONT_STYLE.base.normal};
  outline: none;
  &::placeholder {
    color: ${COLOR.border};
    font-style: italic;
  }
`;

export const InputID = styled(Input)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const InputPW = styled(Input)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const SignInButton = styled.button`
  border: none;
  border-radius: ${BORDER_RADIUS.sm};
  padding: 20px;
  background-color: ${COLOR.primary.main};
  color: white;
  font: ${FONT_STYLE.base.normal};
`;
