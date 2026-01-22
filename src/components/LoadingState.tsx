import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white mb-6"
        >
          <Scale size={32} />
        </motion.div>
        
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Verifying Citations
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Analyzing document and checking sources...
        </p>
        <div className="w-64 mx-auto space-y-3">
          <div className="flex items-center gap-3">
            <div className="skeleton h-4 w-4 rounded-full" />
            <div className="skeleton h-3 flex-1 rounded" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="skeleton h-4 w-4 rounded-full" />
            <div className="skeleton h-3 flex-1 rounded" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-2 h-2 rounded-full bg-amber-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="skeleton h-4 w-4 rounded-full" />
            <div className="skeleton h-3 flex-1 rounded" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="w-2 h-2 rounded-full bg-rose-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="skeleton h-4 w-4 rounded-full" />
            <div className="skeleton h-3 flex-1 rounded" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
