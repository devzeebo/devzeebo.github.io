import React from 'react';
import Mermaid from 'react-mermaid';

import styled from 'styled-components';

const CenteredMermaid = styled(Mermaid)`
svg {
  text-align: center;
}
`;

export type MermaidCodeProps = {
  value: string,
  someThing: boolean,
}

const MermaidCode = ({
  value,
}: MermaidCodeProps) => (
  <CenteredMermaid>
    {value}
  </CenteredMermaid>
);
export default MermaidCode;
