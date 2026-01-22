import { useCallback, ReactNode, isValidElement, cloneElement } from 'react';
import { Citation, VerificationResult } from '../types';
import { CitationBadge } from '../components/CitationBadge';

interface UseCitationProcessorProps {
  citations: Citation[];
  getResultForCitation: (citationId: string) => VerificationResult | undefined;
  selectedCitationId: string | null;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
}

export const useCitationProcessor = ({
  citations,
  getResultForCitation,
  selectedCitationId,
  onCitationClick,
}: UseCitationProcessorProps) => {
  const processChildren = useCallback(
    (children: ReactNode, keyPrefix = ''): ReactNode => {
      if (children === null || children === undefined) {
        return children;
      }

      if (typeof children === 'string') {
        const citationPlaceholderRegex = /%%CITE(\d+)%%/g;
        const parts: ReactNode[] = [];
        let lastIndex = 0;
        let match;
        let key = 0;

        while ((match = citationPlaceholderRegex.exec(children)) !== null) {
          if (match.index > lastIndex) {
            parts.push(
              <span key={`${keyPrefix}text-${key++}`}>
                {children.slice(lastIndex, match.index)}
              </span>
            );
          }

          const citationIndex = parseInt(match[1], 10) - 1;
          const citation = citations[citationIndex];

          if (citation) {
            const result = getResultForCitation(citation.id);
            const isSelected = selectedCitationId === citation.id;

            parts.push(
              <span
                key={`${keyPrefix}citation-${key++}`}
                className="citation-inline"
                data-citation-id={citation.id}
              >
                {result && (
                  <CitationBadge
                    caseName={citation.caseName}
                    severity={result.severity}
                    isSelected={isSelected}
                    onClick={() => onCitationClick(citation, result)}
                  />
                )}
                {' '}
                <span className="font-serif italic text-slate-700">
                  {citation.caseName}
                </span>
                {', '}
                <span className="text-slate-600">{citation.reporter}</span>
                {citation.pinCite && (
                  <span className="text-slate-600">, {citation.pinCite}</span>
                )}
                {' '}
                <span className="text-slate-500">({citation.year}).</span>
              </span>
            );
          }

          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < children.length) {
          parts.push(
            <span key={`${keyPrefix}text-${key++}`}>
              {children.slice(lastIndex)}
            </span>
          );
        }

        return parts.length > 0 ? <>{parts}</> : children;
      }

      if (Array.isArray(children)) {
        return children.map((child, index) => {
          const key = `${keyPrefix}${index}`;
          const processed = processChildren(child, `${key}-`);
          
          if (typeof processed === 'string' || typeof processed === 'number') {
            return <span key={key}>{processed}</span>;
          }
          
          if (isValidElement(processed)) {
            return cloneElement(processed, { key: processed.key ?? key });
          }
          
          return processed;
        });
      }

      return children;
    },
    [citations, getResultForCitation, selectedCitationId, onCitationClick]
  );

  return { processChildren };
};
