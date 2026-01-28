import { motion } from 'framer-motion';
import { Shield, Activity, RefreshCw } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Shield className="w-8 h-8 text-primary" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
          />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-foreground tracking-tight">
            PeaceGuard AI
          </h1>
          <p className="text-xs text-muted-foreground">
            Kenya Conflict Early Warning System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 rounded-full bg-success"
          />
          <span className="text-xs font-medium text-success">Live Monitoring</span>
        </div>

        {/* Last Update */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="w-3 h-3" />
          <span>Updated: Just now</span>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">47 Counties</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
