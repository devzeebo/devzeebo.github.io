import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import useAction from '../hooks/useAction';

import styled from 'styled-components';
import loadPostAction from '../domain/events/loadPost';
import CodeBlock from '../components/code-block';
import { ApplicationState } from '../domain/ApplicationState';
import { useParams } from 'react-router';

const FiraReactMarkdown = styled(ReactMarkdown)`
  code {
    font-family: 'Fira Code';
  }
`;

export type PostComponent = {
  slug: string,
};

const Post = ({
  slug,
}: PostComponent) => {
  const content = useSelector((state: ApplicationState) => state.posts.entities[slug]?.content);

  console.log(content);

  const loadPost = useAction(loadPostAction);
  useEffect(
    () => {
      loadPost(slug);
    },
    []
  );

  return (
    <FiraReactMarkdown
      escapeHtml={false}
      className="markdown-body"
      renderers={{ code: CodeBlock }}>
      {content}
    </FiraReactMarkdown>
  );
};

export default Post;
export const PostView = () => {
  const { slug } = useParams();

  return <Post slug={slug} />;
};
