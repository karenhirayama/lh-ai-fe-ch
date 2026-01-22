import { Severity } from '../types';

export const getBadgeLabel = (severity: Severity): string => {
  switch (severity) {
    case 'critical':
      return 'CRITICAL';
    case 'warning':
      return 'WARNING';
    default:
      return 'VALID';
  }
};

export const getBadgeClass = (severity: Severity, isSelected: boolean): string => {
  const base = 'citation-badge';
  const severityClass =
    severity === 'critical'
      ? 'citation-badge-critical'
      : severity === 'warning'
        ? 'citation-badge-warning'
        : 'citation-badge-valid';
  const selectedClass = isSelected ? 'citation-badge-selected' : '';
  return `${base} ${severityClass} ${selectedClass}`.trim();
};
