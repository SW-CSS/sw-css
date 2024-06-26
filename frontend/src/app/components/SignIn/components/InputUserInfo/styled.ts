import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const Input = styled.input`
  min-width: 232px;
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

export const FixedEmail = styled.div`
  position: absolute;
  color: ${COLOR.comment};
  right: 10px;
  top: 25%;
  transform: translate(0, -50%);
  font: ${FONT_STYLE.xs.normal};
`;

export const SignInButton = styled.button`
  min-width: 70px;
  max-width: 110px;
  border: none;
  border-radius: ${BORDER_RADIUS.sm};
  flex-grow: 1;
  background-color: ${COLOR.primary.main};
  color: ${COLOR.white};
  font: ${FONT_STYLE.base.normal};
`;
