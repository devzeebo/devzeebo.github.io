import React, { useEffect } from 'react';

const createStylesheet = (href: string) => {
  const link = document.createElement('link');

  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', href);

  document.head.appendChild(link);
  return link;
};
const createScript = (href: string) => {
  const link = document.createElement('script');

  link.setAttribute('src', href);

  document.head.appendChild(link);
  return link;
};
const languages = [];

const HighlightJs = () => {
  useEffect(
    () => {
      const imports: (HTMLScriptElement | HTMLLinkElement)[] = languages.map(lang => createStylesheet(
        `//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/languages/${lang}.min.js`,
      ));
      imports.push(createStylesheet(
        '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css',
      ));
      imports.push(createScript(
        '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js',
      ));

      return () => {
        imports.forEach(document.removeChild);
      }
    },
    []
  );

  return null;
}

export default HighlightJs;
