import { motion } from 'framer-motion';
import { Shield, Activity, RefreshCw } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 border-b border-border bg-card/50 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative">
          <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-2 md:w-3 h-2 md:h-3 bg-primary rounded-full"
          />
        </div>
        <div>
          <h1 className="font-display font-bold text-base md:text-xl text-foreground tracking-tight">
            PeaceGuard AI
          </h1>
          <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">
            Kenya Conflict Early Warning System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Live Status */}
        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-success/10 border border-success/20">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-success"
          />
          <span className="text-[10px] md:text-xs font-medium text-success">Live</span>
        </div>

        {/* Last Update - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="w-3 h-3" />
          <span>Updated: Just now</span>
        </div>

        {/* System Status - hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-secondary/50">
          <Activity className="w-3 md:w-4 h-3 md:h-4 text-primary" />
          <span className="text-[10px] md:text-xs font-medium text-foreground">47 Counties</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
