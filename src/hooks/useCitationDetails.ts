import { useMemo } from 'react';
import { VerificationResult } from '../types';
import { SEVERITY_CONFIGS, STATUS_LABELS } from '../helpers';

export type { SeverityConfig } from '../helpers';

export const useCitationDetails = (result: VerificationResult | null) => {
  const severityConfig = useMemo(() => {
    if (!result) return SEVERITY_CONFIGS.none;
    return SEVERITY_CONFIGS[result.severity] || SEVERITY_CONFIGS.none;
  }, [result]);

  const statusLabel = useMemo(() => {
    if (!result) return "";
    return STATUS_LABELS[result.status] || result.status;
  }, [result]);

  const severityLabel = useMemo(() => {
    if (!result) return "Valid";
    if (result.severity === "none") return "Valid";
    if (result.severity === "warning") return "Warning";
    return "Critical";
  }, [result]);

  return {
    severityConfig,
    statusLabel,
    severityLabel,
    Icon: severityConfig.icon,
  };
};
