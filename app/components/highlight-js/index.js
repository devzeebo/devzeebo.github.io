import React from 'react';

const createStylesheet = (href) => {
  const link = document.createElement('link');

  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', href);

  document.head.appendChild(link);
  return link;
};
const createScript = (href) => {
  const link = document.createElement('script');

  link.setAttribute('src', href);

  document.head.appendChild(link);
  return link;
};
const languages = [];

export default class HighlightJs extends React.Component {
  componentDidMount() {
    this.imports = languages.map(lang => createStylesheet(
      `//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/languages/${lang}.min.js`,
    ));
    this.imports.push(createStylesheet(
      '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css',
    ));
    this.imports.push(createScript(
      '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js',
    ));
  }

  componentWillUnmount() {
    this.imports.forEach(document.removeChild);
  }

  render() { return null; }
}
