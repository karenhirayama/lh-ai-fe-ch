import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Brief, Citation, VerificationResult } from '../types';
import { sampleBrief } from '../data/sampleBrief';

interface CitationStats {
  total: number;
  valid: number;
  warning: number;
  critical: number;
}

interface BriefContextType {
  brief: Brief | null;
  isLoading: boolean;
  error: string | null;
  selectedCitation: Citation | null;
  selectedResult: VerificationResult | null;
  citationStats: CitationStats;
  currentIndex: number;
  handleCitationClick: (citation: Citation, result: VerificationResult) => void;
  handleClosePanel: () => void;
  navigateToNextCitation: () => void;
  navigateToPrevCitation: () => void;
  navigateToCitation: (index: number) => void;
  retryLoading: () => void;
}

const BriefContext = createContext<BriefContextType | undefined>(undefined);

interface BriefProviderProps {
  children: ReactNode;
}

export const BriefProvider = ({ children }: BriefProviderProps) => {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [selectedResult, setSelectedResult] = useState<VerificationResult | null>(null);

  const loadBrief = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate loading state with potential error
    const timer = setTimeout(() => {
      // Simulate success (change to test error state)
      const simulateError = false;
      
      if (simulateError) {
        setError('Failed to connect to the verification service. Please check your connection and try again.');
        setIsLoading(false);
      } else {
        setBrief(sampleBrief);
        setIsLoading(false);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Initial load
  useEffect(() => {
    const cleanup = loadBrief();
    return cleanup;
  }, [loadBrief]);

  const retryLoading = useCallback(() => {
    loadBrief();
  }, [loadBrief]);

  const handleCitationClick = useCallback((citation: Citation, result: VerificationResult) => {
    setSelectedCitation(citation);
    setSelectedResult(result);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedCitation(null);
    setSelectedResult(null);
  }, []);

  const navigateToNextCitation = useCallback(() => {
    if (!brief || !selectedCitation) return;
    
    const currentIndex = brief.citations.findIndex(c => c.id === selectedCitation.id);
    const nextIndex = currentIndex < brief.citations.length - 1 ? currentIndex + 1 : 0;
    
    const nextCitation = brief.citations[nextIndex];
    const nextResult = brief.verificationResults.find(r => r.citationId === nextCitation.id);
    
    if (nextResult) {
      handleCitationClick(nextCitation, nextResult);
    }
  }, [brief, selectedCitation, handleCitationClick]);

  const navigateToPrevCitation = useCallback(() => {
    if (!brief || !selectedCitation) return;
    
    const currentIndex = brief.citations.findIndex(c => c.id === selectedCitation.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : brief.citations.length - 1;
    
    const prevCitation = brief.citations[prevIndex];
    const prevResult = brief.verificationResults.find(r => r.citationId === prevCitation.id);
    
    if (prevResult) {
      handleCitationClick(prevCitation, prevResult);
    }
  }, [brief, selectedCitation, handleCitationClick]);

  const navigateToCitation = useCallback((index: number) => {
    if (!brief || index < 0 || index >= brief.citations.length) return;
    
    const citation = brief.citations[index];
    const result = brief.verificationResults.find(r => r.citationId === citation.id);
    
    if (result) {
      handleCitationClick(citation, result);
    }
  }, [brief, handleCitationClick]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!brief) return;

      // Close panel with Escape
      if (e.key === 'Escape' && selectedCitation) {
        handleClosePanel();
        return;
      }

      // Navigate citations with arrow keys when panel is open
      if (selectedCitation && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'j' || e.key === 'k')) {
        e.preventDefault();
        if (e.key === 'ArrowDown' || e.key === 'j') {
          navigateToNextCitation();
        } else {
          navigateToPrevCitation();
        }
      }

      // Quick navigation with number keys (1-6 for citations)
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= brief.citations.length) {
          navigateToCitation(num - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [brief, selectedCitation, handleClosePanel, navigateToNextCitation, navigateToPrevCitation, navigateToCitation]);

  const citationStats: CitationStats = brief ? {
    total: brief.citations.length,
    valid: brief.verificationResults.filter(r => r.severity === 'none').length,
    warning: brief.verificationResults.filter(r => r.severity === 'warning').length,
    critical: brief.verificationResults.filter(r => r.severity === 'critical').length,
  } : { total: 0, valid: 0, warning: 0, critical: 0 };

  const currentIndex = brief && selectedCitation 
    ? brief.citations.findIndex(c => c.id === selectedCitation.id) + 1 
    : 0;

  const value: BriefContextType = {
    brief,
    isLoading,
    error,
    selectedCitation,
    selectedResult,
    citationStats,
    currentIndex,
    handleCitationClick,
    handleClosePanel,
    navigateToNextCitation,
    navigateToPrevCitation,
    navigateToCitation,
    retryLoading,
  };

  return (
    <BriefContext.Provider value={value}>
      {children}
    </BriefContext.Provider>
  );
}

export const useBrief = () => {
  const context = useContext(BriefContext);
  if (context === undefined) {
    throw new Error('useBrief must be used within a BriefProvider');
  }
  return context;
};
