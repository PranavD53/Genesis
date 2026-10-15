import React, { useMemo } from 'react';
import { marked } from 'marked';

interface ChatMessageRendererProps {
  content: string;
  isUser: boolean;
}

export const ChatMessageRenderer: React.FC<ChatMessageRendererProps> = ({ content, isUser }) => {
  const htmlContent = useMemo(() => {
    if (!content) return '';
    try {
      // Configure marked for clean chat formatting
      const rawHtml = marked.parse(content, {
        breaks: true,
        gfm: true
      }) as string;

      return rawHtml;
    } catch (e) {
      return content;
    }
  }, [content]);

  if (isUser) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  return (
    <div
      className="chat-markdown-content leading-relaxed space-y-2.5 text-xs"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
