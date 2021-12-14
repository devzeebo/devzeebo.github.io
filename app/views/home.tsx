import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Partial from '../components/Partial';
import type { ApplicationState } from '../domain/ApplicationState';
import Post from './post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const HomeView = () => {
  const partials = useSelector((state: ApplicationState) => state.homePage);

  return (
    <Container>
      {partials.map(it => (
        <Partial key={it} href={`/post/${it}`}>
          <Post slug={it} />
        </Partial>
      ))}
    </Container>
  );
}

export default HomeView;
