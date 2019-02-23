import React from 'react';

import Mermaid from 'react-mermaid-test-fix';

const MermaidCode = ({ value }) => console.log(value) || (
  <Mermaid>
    {value}
  </Mermaid>
);
export default MermaidCode;
