const React = require('react');

class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    const cancelToken = setInterval(() => {
      if (this.hljs) {
        clearTimeout(cancelToken);
        this.hljs.highlightBlock(this.codeEl);
      } else {
        this.hljs = window.hljs;
      }
    }, 100);
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

module.exports = CodeBlock;
