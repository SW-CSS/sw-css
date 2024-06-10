/* eslint-disable import/prefer-default-export */
import Link from 'next/link';
import styled from 'styled-components';

export const IconButtonWrapper = styled(Link)`
  width: 60px;
  height: 50px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: transparent;
  }
`;
