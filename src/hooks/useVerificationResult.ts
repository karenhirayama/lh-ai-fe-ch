import { useCallback } from 'react';
import { VerificationResult } from '../types';

export const useVerificationResult = (verificationResults: VerificationResult[]) => {
  const getResultForCitation = useCallback(
    (citationId: string): VerificationResult | undefined => {
      return verificationResults.find((r) => r.citationId === citationId);
    },
    [verificationResults]
  );

  return { getResultForCitation };
};
