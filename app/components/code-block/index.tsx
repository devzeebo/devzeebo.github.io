import React, {
  ReactNode
} from 'react';
import HighlightCode from '../highlight-js/code';
import MermaidCode, {
  MermaidCodeProps
} from './renderers/mermaid';

const langRenderers = {
  mermaid: MermaidCode,
  code: HighlightCode
};

export type CodeProps<T extends keyof typeof langRenderers> = {
  language: T,
} & Parameters<(typeof langRenderers)[T]>[0];

const Code = <T extends keyof typeof langRenderers>(props: CodeProps<T>) => {
  const Renderer: any = langRenderers[props.language];

  return <Renderer {...props} />;
};
export default Code;
