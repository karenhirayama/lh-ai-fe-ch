import { useBrief } from '../context';
import { BriefViewer, DetailPanel, EmptyState, Header, LoadingState } from '../components';

export const Home = () => {
  const {
    brief,
    isLoading,
    selectedCitation,
    selectedResult,
    citationStats,
    currentIndex,
    handleCitationClick,
    handleClosePanel,
  } = useBrief();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!brief) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header stats={citationStats} />

      <main className="relative">
        <div className="max-w-3xl mx-auto px-6 py-8 pb-32">
          <BriefViewer
            brief={brief}
            onCitationClick={handleCitationClick}
            selectedCitationId={selectedCitation?.id || null}
          />
        </div>
      </main>

      {selectedCitation && selectedResult && (
        <DetailPanel
          citation={selectedCitation}
          result={selectedResult}
          onClose={handleClosePanel}
          currentIndex={currentIndex}
          totalCitations={brief.citations.length}
        />
      )}
    </div>
  );
}
