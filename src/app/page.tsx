'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar, NavTab } from '@/components/layout/Sidebar';
import { EmergencyBanner } from '@/components/layout/EmergencyBanner';
import { DisclaimerModal } from '@/components/layout/DisclaimerModal';

// Dashboard components
import { LiveStrokeCounter } from '@/components/dashboard/LiveStrokeCounter';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { StrokeClockWidget } from '@/components/dashboard/StrokeClockWidget';
import { DailyInsightCard } from '@/components/dashboard/DailyInsightCard';

// Module components
import { InteractiveWorldMap } from '@/components/map/InteractiveWorldMap';
import { IndiaDashboard } from '@/components/india/IndiaDashboard';
import { StrokeSenseChat } from '@/components/ai/StrokeSenseChat';
import { RiskAssessmentLab } from '@/components/risk-lab/RiskAssessmentLab';
import { FastEmergencyCenter } from '@/components/emergency/FastEmergencyCenter';
import { AnalyticsCenter } from '@/components/analytics/AnalyticsCenter';
import { WhatIfSimulator } from '@/components/prediction/WhatIfSimulator';
import { ResearchFeed } from '@/components/research/ResearchFeed';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleOpenFastCenter = () => {
    setActiveTab('emergency');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Navigation Sidebar (owns left column on desktop: inset-y-0 left-0) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Right Shell (Header + Canvas) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* Top Critical Alert Banner */}
        <EmergencyBanner onOpenFastModal={handleOpenFastCenter} />

        {/* Main Command Header (Sticky Top to the right of the Sidebar) */}
        <Header
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => {
            setSelectedRegion(reg);
            if (reg === 'india') {
              setActiveTab('india');
            }
          }}
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          onOpenFastCenter={handleOpenFastCenter}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* 1. Dashboard View */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Live Estimated Counter */}
                <LiveStrokeCounter
                  currentRegion={selectedRegion}
                  onRegionChange={setSelectedRegion}
                />

                {/* Clock & Daily Insight Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <StrokeClockWidget />
                  <DailyInsightCard />
                </div>

                {/* Executive KPI Metric Cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight heading-rounded">
                        Core Global Stroke Benchmarks
                      </h2>
                      <p className="text-xs text-slate-500">
                        Consolidated epidemiological indicators verified against GBD 2021 & WSO audits.
                      </p>
                    </div>
                  </div>
                  <MetricCards />
                </div>
              </div>
            )}

            {/* 2. Global Map View */}
            {activeTab === 'map' && (
              <div className="animate-in fade-in duration-300">
                <InteractiveWorldMap />
              </div>
            )}

            {/* 3. India Intelligence View */}
            {activeTab === 'india' && (
              <div className="animate-in fade-in duration-300">
                <IndiaDashboard />
              </div>
            )}

            {/* 4. StrokeSense AI Assistant */}
            {activeTab === 'ai-chat' && (
              <div className="animate-in fade-in duration-300">
                <StrokeSenseChat />
              </div>
            )}

            {/* 5. Stroke Risk Awareness Lab */}
            {activeTab === 'risk-lab' && (
              <div className="animate-in fade-in duration-300">
                <RiskAssessmentLab />
              </div>
            )}

            {/* 6. FAST Emergency Center */}
            {activeTab === 'emergency' && (
              <div className="animate-in fade-in duration-300">
                <FastEmergencyCenter />
              </div>
            )}

            {/* 7. Analytics & Research View */}
            {activeTab === 'analytics' && (
              <div className="animate-in fade-in duration-300">
                <AnalyticsCenter />
              </div>
            )}

            {/* 8. What-If? Forecasting Simulator */}
            {activeTab === 'prediction' && (
              <div className="animate-in fade-in duration-300">
                <WhatIfSimulator />
              </div>
            )}

            {/* 9. News & Impact Stories Feed */}
            {activeTab === 'research-feed' && (
              <div className="animate-in fade-in duration-300">
                <ResearchFeed />
              </div>
            )}

            {/* Platform Command Footer */}
            <footer className="pt-8 pb-4 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700">StrokeWatch AI Surveillance Platform • Version 2.4.0</span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <button
                  onClick={() => setIsDisclaimerOpen(true)}
                  className="hover:text-sky-600 underline transition-colors"
                >
                  Clinical & Legal Disclosures
                </button>
                <span>•</span>
                <span>GBD 2021 / WSO 2024 / ICMR-NCDIR</span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Methodology & Disclaimers Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
}
