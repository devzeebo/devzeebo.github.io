import HighlightCode from '../highlight-js/code';
import MermaidCode from './mermaid';

const langRenderers = {
  mermaid: MermaidCode,
};

const defaultRenderer = HighlightCode;

const Code = props => langRenderers[props.language] || defaultRenderer;
export default Code;
