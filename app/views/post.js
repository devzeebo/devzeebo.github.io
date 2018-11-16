import React from 'react';
// eslint-disable-next-line
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class PostView extends React.Component {
  constructor() {
    super();

    this.state = {
      source: '',
    };
  }

  componentDidMount() {
    axios.get('posts/post1.md')
      .then((res) => {
        this.setState({
          source: res.data,
        });
      });
  }

  render() {
    return (
      <ReactMarkdown source={this.state.source} className="markdown-body" />
    );
  }
}
export default PostView;
