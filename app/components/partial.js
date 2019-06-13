import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  overflow: hidden;
  height: min-content;
  max-height: 30em;
  flex: 1 0 100%;
`;
const Overlay = styled.div`
  position: absolute;
  top: 90%;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 255));
`;

const ReadMore = styled(Link)`
  position: absolute;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Partial = ({ children, href }) => (
  <Container>
    <ContentContainer>
      {children}
    </ContentContainer>
    <Overlay />
    <ReadMore to={href}>
      Read more...
    </ReadMore>
  </Container>
);
export default Partial;
