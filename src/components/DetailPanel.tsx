import { X } from "lucide-react";
import { Citation, VerificationResult } from "../types";
import {
  useResizablePanel,
  useEscapeKey,
  useScrollToCitation,
  useCitationDetails,
} from "../hooks";

interface DetailPanelProps {
  citation: Citation | null;
  result: VerificationResult | null;
  onClose: () => void;
  currentIndex: number;
  totalCitations: number;
}

export const DetailPanel = ({
  citation,
  result,
  onClose,
  currentIndex,
  totalCitations,
}: DetailPanelProps) => {
  const { panelHeight, handleDragStart } = useResizablePanel({
    initialHeight: 320,
    minHeight: 200,
    maxHeightRatio: 0.8,
  });

  const { severityConfig, statusLabel, severityLabel, Icon } =
    useCitationDetails(result);

  useEscapeKey(onClose, !!citation);

  useScrollToCitation(citation?.id);

  if (!citation || !result) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div onClick={onClose} className="fixed inset-0 bg-black/10 -z-10" />
      <div
        className="bg-white rounded-t-3xl shadow-soft-lg max-w-2xl mx-auto overflow-hidden flex flex-col"
        style={{ height: panelHeight }}
      >
        <div
          onMouseDown={handleDragStart}
          className="flex justify-center pt-2 pb-1 cursor-ns-resize hover:bg-slate-50 transition-colors group"
        >
          <div className="w-10 h-1 rounded-full bg-slate-300 group-hover:bg-slate-400 transition-colors" />
        </div>
        <div className="px-6 pb-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-medium uppercase tracking-wide ${severityConfig.color}`}
                >
                  Citation{" "}
                  {result.severity !== "none"
                    ? severityConfig.label
                    : "Verified"}
                </span>
              </div>
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                {citation.caseName}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {citation.reporter}
                {citation.pinCite && `, ${citation.pinCite}`} ({citation.year})
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              aria-label="Close panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <div
            className={`rounded-xl p-4 border ${severityConfig.bg} ${severityConfig.border}`}
          >
            <div className="flex items-start gap-3">
              <Icon
                size={20}
                className={`${severityConfig.color} flex-shrink-0 mt-0.5`}
              />
              <div className="flex-1">
                <h3 className={`font-medium ${severityConfig.color}`}>
                  {statusLabel}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{result.message}</p>
              </div>
            </div>
          </div>

          {result.details?.expectedQuote && result.details?.actualQuote && (
            <QuoteComparison
              expectedQuote={result.details.expectedQuote}
              actualQuote={result.details.actualQuote}
            />
          )}
          {result.details?.treatmentHistory && (
            <TreatmentHistory history={result.details.treatmentHistory} />
          )}
        </div>
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${severityConfig.accent}`}
                />
                <span>{severityLabel}</span>
              </div>
            </div>
            {result.severity !== "none" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 text-sm font-medium rounded-lg
                           hover:bg-slate-100 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-2 bg-slate-100/50 text-center flex-shrink-0">
          <span className="text-xs text-slate-400">
            Citation {currentIndex} of {totalCitations} • Use ↑↓ to navigate •
            esc to close • drag to resize
          </span>
        </div>
      </div>
    </div>
  );
};

interface QuoteComparisonProps {
  expectedQuote: string;
  actualQuote: string;
}

function QuoteComparison({ expectedQuote, actualQuote }: QuoteComparisonProps) {
  return (
    <div className="space-y-4 mt-4">
      <div>
        <h4 className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">
          Brief Text
        </h4>
        <blockquote className="text-sm text-slate-700 bg-slate-50 rounded-lg p-4 border-l-2 border-rose-300 font-serif italic">
          "...
          {highlightDifference(expectedQuote, actualQuote, "expected")}"
        </blockquote>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
          Original Source
        </h4>
        <blockquote className="text-sm text-slate-700 bg-slate-50 rounded-lg p-4 border-l-2 border-emerald-300 font-serif italic">
          "{highlightDifference(actualQuote, expectedQuote, "actual")}"
        </blockquote>
      </div>
    </div>
  );
}

interface TreatmentHistoryProps {
  history: string;
}

function TreatmentHistory({ history }: TreatmentHistoryProps) {
  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Treatment History
      </h4>
      <p className="text-sm text-slate-600 leading-relaxed">{history}</p>
    </div>
  );
}

function highlightDifference(
  text: string,
  compareText: string,
  type: "expected" | "actual",
): React.ReactNode {
  const words2 = compareText.toLowerCase().split(/\s+/);
  const originalWords = text.split(/(\s+)/);

  return originalWords.map((word, index) => {
    const isSpace = /^\s+$/.test(word);
    if (isSpace) return word;

    const lowerWord = word.toLowerCase().replace(/[.,;:'"]/g, "");
    const isInOther = words2.some(
      (w) => w.replace(/[.,;:'"]/g, "") === lowerWord,
    );

    if (!isInOther && word.trim()) {
      return (
        <span
          key={index}
          className={`px-0.5 rounded ${
            type === "expected"
              ? "bg-amber-200 text-amber-900"
              : "bg-emerald-200 text-emerald-900"
          }`}
        >
          {word}
        </span>
      );
    }

    return word;
  });
}
