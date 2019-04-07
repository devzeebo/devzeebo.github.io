import React from 'react';
import Mermaid from 'react-mermaid';

import styled from 'styled-components';

const CenteredMermaid = styled(Mermaid)`
svg {
  text-align: center;
}
`;

const MermaidCode = ({ value }) => (
  <CenteredMermaid>
    {value}
  </CenteredMermaid>
);
export default MermaidCode;
