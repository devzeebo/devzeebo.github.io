import React from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import PropTypes from 'prop-types';

class PostView extends React.Component {
  static propTypes = {
    match: PropTypes.any,
  }

  constructor(props) {
    super(props);

    this.state = {
      source: '',
    };
  }

  componentDidMount() {
    const markdown = `${this.context.posts[this.props.match.params.slug]}.md`;
    axios.get(`posts/${markdown}`)
      .then((res) => {
        this.setState({
          source: res.data,
        });
        document.title = this.props.match.params.slug;
      });
  }

  render() {
    return (
      <ReactMarkdown source={this.state.source} className="markdown-body" />
    );
  }
}
export default PostView;
