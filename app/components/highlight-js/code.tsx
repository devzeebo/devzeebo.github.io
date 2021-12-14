import React, {
  useEffect,
  useRef,
} from 'react';

declare global {
  interface Window {
    hljs: any
  }
}

export type CodeProps = {
  language: string,
  value: string,
}

const Code = ({
  language,
  value,
}: CodeProps) => {
  const ref = useRef(null);
  useEffect(
    () => {
      const cancelToken = setInterval(() => {
        if (window.hljs) {
          clearTimeout(cancelToken);
          window.hljs.highlightBlock(ref.current);
        }
      }, 100);
    },
    []
  );

  return (
    <pre>
      <code ref={ref} className={`language-${language}`}>
        {value}
      </code>
    </pre>
  );
}
export default Code;