import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = "Something went wrong while loading the document.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-20 h-20 mx-auto bg-rose-100 rounded-full flex items-center justify-center"
          >
            <AlertCircle size={40} className="text-rose-500" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-lg font-bold">!</span>
          </motion.div>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Failed to Load Document
        </h2>
        <p className="text-slate-500 mb-6">{message}</p>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium
                       hover:bg-slate-800 transition-colors shadow-soft"
          >
            <RefreshCw size={18} />
            Try Again
          </motion.button>
        )}

        <p className="text-xs text-slate-400 mt-6">
          If the problem persists, please contact support.
        </p>
      </motion.div>
    </div>
  );
};
