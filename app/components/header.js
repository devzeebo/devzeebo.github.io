import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mobile, desktop } from './media';

const Container = styled.div`

  display: flex;
  align-items: center;
  padding-left: 1em;

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
    <Title>
      <Link to="/">
        /dev/zeebo
      </Link>
    </Title>
  </Container>
);
export default Header;
