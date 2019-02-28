import React from 'react';
import HighlightCode from '../highlight-js/code';
import MermaidCode from './mermaid';

const langRenderers = {
  mermaid: MermaidCode,
};

const defaultRenderer = HighlightCode;

const Code = (props) => {
  const Renderer = (langRenderers[props.language] || defaultRenderer);

  return <Renderer {...props} />;
};
export default Code;
