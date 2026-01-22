import { CheckCircle, AlertTriangle, XCircle, LucideIcon } from 'lucide-react';

export interface SeverityConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  label: string;
  accent: string;
}

export const SEVERITY_CONFIGS: Record<string, SeverityConfig> = {
  critical: {
    icon: XCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    label: 'Critical Issue',
    accent: 'bg-rose-500',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    label: 'Warning',
    accent: 'bg-amber-500',
  },
  none: {
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    label: 'Valid',
    accent: 'bg-emerald-500',
  },
};

export const STATUS_LABELS: Record<string, string> = {
  valid: 'Citation Verified',
  quote_mismatch: 'Substantial Quote Mismatch',
  not_found: 'Citation Not Found',
  overruled: 'Authority Overruled',
  superseded: 'Authority Superseded',
};
