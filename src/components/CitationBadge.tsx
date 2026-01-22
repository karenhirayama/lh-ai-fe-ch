import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Severity } from '../types';
import { getBadgeLabel, getBadgeClass } from '../helpers';

interface CitationBadgeProps {
  caseName: string;
  severity: Severity;
  isSelected: boolean;
  onClick: () => void;
}

export const CitationBadge = ({ caseName, severity, isSelected, onClick }: CitationBadgeProps) => {
  const getIcon = () => {
    switch (severity) {
      case 'critical':
        return <XCircle size={12} />;
      case 'warning':
        return <AlertTriangle size={12} />;
      default:
        return <CheckCircle size={12} />;
    }
  };

  const label = getBadgeLabel(severity);
  const badgeClass = getBadgeClass(severity, isSelected);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={badgeClass}
      aria-label={`Citation: ${caseName}. Status: ${label}`}
    >
      {getIcon()}
      <span>{label}</span>
    </motion.button>
  );
};
