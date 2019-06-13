import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Partial from '../components/partial';
import { Post } from './post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
class HomeView extends React.Component {
  render() {
    return (
      <Container>
        {this.props.homePage.map(it => (
          <Partial key={it} href={`/post/${it}`}>
            <Post slug={it} />
          </Partial>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  homePage: state.homePage,
});
export default connect(mapStateToProps)(HomeView);
