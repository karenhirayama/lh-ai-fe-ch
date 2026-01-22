import ReactMarkdown from "react-markdown";

import { Brief, Citation, VerificationResult } from "../types";
import {
  useVerificationResult,
  useProcessedContent,
  useCitationProcessor,
  useMarkdownComponents,
} from "../hooks";

interface BriefViewerProps {
  brief: Brief;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  selectedCitationId: string | null;
}

export const BriefViewer = ({
  brief,
  onCitationClick,
  selectedCitationId,
}: BriefViewerProps) => {
  const { getResultForCitation } = useVerificationResult(
    brief.verificationResults,
  );

  const processedContent = useProcessedContent(brief.content);

  const { processChildren } = useCitationProcessor({
    citations: brief.citations,
    getResultForCitation,
    selectedCitationId,
    onCitationClick,
  });

  const components = useMarkdownComponents(processChildren);

  return (
    <article className="bg-white rounded-2xl shadow-soft border border-slate-200 p-8 md:p-12">
      <div className="prose-legal">
        <ReactMarkdown components={components as any}>
          {processedContent}
        </ReactMarkdown>
      </div>
    </article>
  );
};
