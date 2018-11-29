import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import loadPost from '../actions/loadPost';
import CodeBlock from '../components/highlight-js/code-block';

const FiraReactMarkdown = styled(ReactMarkdown)`
  code {
    font-family: 'Fira Code';
  }
`;

class PostView extends React.Component {
  static propTypes = {
    match: PropTypes.any,
  }

  componentDidMount() {
    this.props.loadPost(this.props.match.params.slug, this.props.filename);
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
  filename: state.postLookup[ownProps.match.params.slug],
  content: state.posts[ownProps.match.params.slug],
});
const mapDispatchToProps = dispatch => ({
  loadPost: (slug, filename) => dispatch(loadPost(slug, filename)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostView);
