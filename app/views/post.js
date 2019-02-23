import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';

import styled from 'styled-components';
import loadPost from '../actions/loadPost';
import CodeBlock from '../components/code-block';

const FiraReactMarkdown = styled(ReactMarkdown)`
  code {
    font-family: 'Fira Code';
  }
`;

class PostComponent extends React.Component {
  componentDidMount() {
    this.props.loadPost(this.props.slug);
  }

  render() {
    return (
      <FiraReactMarkdown
        source={this.props.content}
        className="markdown-body"
        renderers={{ code: CodeBlock }} />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  content: state.posts[ownProps.slug].content,
});
const mapDispatchToProps = dispatch => ({
  loadPost: slug => dispatch(loadPost(slug)),
});
export const Post = connect(mapStateToProps, mapDispatchToProps)(PostComponent);
export const PostView = ({ match: { params: { slug } } }) => (
  <Post slug={slug} />
);
