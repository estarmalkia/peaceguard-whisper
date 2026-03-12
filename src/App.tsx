import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import NationalOverview from "./pages/NationalOverview";
import SentimentDashboard from "./pages/SentimentDashboard";
import CountyDrillDown from "./pages/CountyDrillDown";
import AlertsDashboard from "./pages/AlertsDashboard";
import AIInsights from "./pages/AIInsights";
import RiskIndex from "./pages/RiskIndex";
import PolicyImpact from "./pages/PolicyImpact";
import LanguageInsights from "./pages/LanguageInsights";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Language } from "./components/LanguageToggle";

const queryClient = new QueryClient();

const AppContent = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={
        <DashboardLayout language={language} onLanguageChange={setLanguage}>
          <Routes>
            <Route path="/" element={<DashboardHome language={language} />} />
            <Route path="/overview" element={<NationalOverview />} />
            <Route path="/sentiment" element={<SentimentDashboard />} />
            <Route path="/county-drilldown" element={<CountyDrillDown />} />
            <Route path="/alerts" element={<AlertsDashboard />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/risk-index" element={<RiskIndex />} />
            <Route path="/policy-impact" element={<PolicyImpact />} />
            <Route path="/language-insights" element={<LanguageInsights />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
