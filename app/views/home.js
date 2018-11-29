import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Partial from '../components/partial';
import loadPost from '../actions/loadPost';
import { Post } from './post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
class HomeView extends React.Component {
  componentDidMount() {
    this.props.homePage.forEach((it) => {
      this.props.loadPost(it);
    });
  }

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
const mapDispatchToProps = dispatch => ({
  loadPost: slug => dispatch(loadPost(slug)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
