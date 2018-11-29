import React from 'react';
import styled from 'styled-components';

import { mobile, desktop } from './media';

const Container = styled.div`

  display: flex;
  align-items: center;

  ${mobile} {

  }

  ${desktop} {
    height: 100px;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: 'VT323';
`;

const Header = () => (
  <Container>
    <Title>/dev/zeebo</Title>
  </Container>
);
export default Header;
