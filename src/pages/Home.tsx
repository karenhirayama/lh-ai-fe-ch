import { useBrief } from '../context';
import { BriefViewer, DetailPanel, EmptyState, ErrorState, Header, LoadingState } from '../components';

export const Home = () => {
  const {
    brief,
    isLoading,
    error,
    selectedCitation,
    selectedResult,
    citationStats,
    currentIndex,
    handleCitationClick,
    handleClosePanel,
    retryLoading,
  } = useBrief();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={retryLoading} />;
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
