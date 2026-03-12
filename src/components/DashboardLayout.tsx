import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map, BarChart3, Globe2, AlertTriangle, Brain, Shield,
  FileBarChart, Languages, LayoutDashboard, LogOut, Menu, X, ChevronLeft
} from 'lucide-react';
import LanguageToggle, { Language } from './LanguageToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const navItems = [
  { path: '/', icon: Map, label: 'Risk Map', labelSw: 'Ramani ya Hatari' },
  { path: '/overview', icon: LayoutDashboard, label: 'National Overview', labelSw: 'Muhtasari wa Kitaifa' },
  { path: '/sentiment', icon: BarChart3, label: 'Sentiment Analysis', labelSw: 'Uchambuzi wa Hisia' },
  { path: '/county-drilldown', icon: Globe2, label: 'County Drill-Down', labelSw: 'Kaunti Kwa Undani' },
  { path: '/alerts', icon: AlertTriangle, label: 'Alerts & Warnings', labelSw: 'Tahadhari' },
  { path: '/ai-insights', icon: Brain, label: 'AI Insights', labelSw: 'Maarifa ya AI' },
  { path: '/risk-index', icon: Shield, label: 'Risk Index', labelSw: 'Fahirisi ya Hatari' },
  { path: '/policy-impact', icon: FileBarChart, label: 'Policy Impact', labelSw: 'Athari za Sera' },
  { path: '/language-insights', icon: Languages, label: 'Language Insights', labelSw: 'Maarifa ya Lugha' },
];

const DashboardLayout = ({ children, language, onLanguageChange }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen z-50
        ${collapsed ? 'w-16' : 'w-64'}
        bg-sidebar border-r border-sidebar-border
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-foreground">PeaceGuard</span>
            </div>
          )}
          {collapsed && <Shield className="w-6 h-6 text-primary mx-auto" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 text-muted-foreground transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-auto">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                  ${isActive
                    ? 'bg-sidebar-accent text-primary font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? (language === 'sw' ? item.labelSw : item.label) : undefined}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                {!collapsed && (
                  <span className="truncate">{language === 'sw' ? item.labelSw : item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <Link
              to="/login"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>{language === 'sw' ? 'Ingia / Jisajili' : 'Login / Sign Up'}</span>
            </Link>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="font-display font-semibold text-foreground text-sm md:text-base">
              {navItems.find(n => n.path === location.pathname)?.[language === 'sw' ? 'labelSw' : 'label'] || 'PeaceGuard AI'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-risk-low animate-pulse" />
              Live
            </div>
            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 md:p-5 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
