import { motion } from "framer-motion";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  stats: {
    total: number;
    valid: number;
    warning: number;
    critical: number;
  };
}

export const Header = ({
  title = "Document Review",
  subtitle = "Citation Verification",
  stats,
}: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200"
    >
      <div className="max-w-3xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center mb-3">
          <div className="text-center">
            <h1 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              {title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-600 whitespace-nowrap">
            {stats.total} Citations
          </span>

          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full flex">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.valid / stats.total) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full bg-emerald-400"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.warning / stats.total) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-full bg-amber-400"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.critical / stats.total) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="h-full bg-rose-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-600">{stats.valid}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs text-slate-600">{stats.warning}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <span className="text-xs text-slate-600">{stats.critical}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
