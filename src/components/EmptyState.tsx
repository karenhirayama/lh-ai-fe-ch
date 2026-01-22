import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="relative mb-8">
          <div className="w-24 h-32 mx-auto bg-white rounded-lg shadow-soft border border-slate-200 flex items-center justify-center">
            <FileText size={40} className="text-slate-300" />
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center"
          >
            <span className="text-amber-600 text-sm font-bold">?</span>
          </motion.div>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          No Brief Loaded
        </h2>
      </motion.div>
    </div>
  );
};
