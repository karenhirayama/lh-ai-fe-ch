import { useMemo } from 'react';

export const useProcessedContent = (content: string) => {
  const processedContent = useMemo(() => {
    const parts: { type: 'text' | 'citation'; content: string; citationIndex?: number }[] = [];
    const citationRegex = /\[\[CITATION:(\d+)\]\]/g;
    let lastIndex = 0;
    let match;

    while ((match = citationRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index),
        });
      }

      parts.push({
        type: 'citation',
        content: `%%CITE${match[1]}%%`,
        citationIndex: parseInt(match[1], 10) - 1,
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex),
      });
    }

    return parts.map((p) => p.content).join('');
  }, [content]);

  return processedContent;
};
