'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  MapPin, 
  Bot, 
  HeartPulse, 
  AlertCircle, 
  BarChart3, 
  Sliders, 
  Newspaper, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2,
  Activity,
  X
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'map'
  | 'india'
  | 'ai-chat'
  | 'risk-lab'
  | 'emergency'
  | 'analytics'
  | 'prediction'
  | 'research-feed';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  badge?: string;
  badgeClass?: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  activeBg: string;
  activeText: string;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Command Dashboard',
    icon: LayoutDashboard,
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-50/80 border-sky-200/60',
    activeBg: 'bg-sky-600',
    activeText: 'text-sky-950',
    description: 'Executive KPIs, Live Counter & Stroke Clock'
  },
  {
    id: 'map',
    label: 'Global Surveillance Map',
    badge: '3D',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
    icon: Globe,
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-50/80 border-teal-200/60',
    activeBg: 'bg-teal-600',
    activeText: 'text-teal-950',
    description: 'Interactive 204-Country Burden Explorer'
  },
  {
    id: 'india',
    label: 'India Stroke Intelligence',
    badge: 'ICMR',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: MapPin,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50/80 border-amber-200/60',
    activeBg: 'bg-amber-600',
    activeText: 'text-amber-950',
    description: 'State Registries & Hemorrhagic Distribution'
  },
  {
    id: 'ai-chat',
    label: 'StrokeSense AI',
    badge: 'AI',
    badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    icon: Bot,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50/80 border-indigo-200/60',
    activeBg: 'bg-indigo-600',
    activeText: 'text-indigo-950',
    description: 'Evidence-Based Clinical Intelligence'
  },
  {
    id: 'risk-lab',
    label: 'ML Stroke Predictor',
    badge: 'Gist ML',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    icon: HeartPulse,
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50/80 border-rose-200/60',
    activeBg: 'bg-rose-600',
    activeText: 'text-rose-950',
    description: 'Trained Models (Logistic Regression, RF, MLP)'
  },
  {
    id: 'emergency',
    label: 'FAST Emergency Center',
    badge: '911',
    badgeClass: 'bg-red-50 text-red-700 border-red-200 animate-pulse',
    icon: AlertCircle,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50/80 border-red-200/60',
    activeBg: 'bg-red-600',
    activeText: 'text-red-950',
    description: 'Time-is-Brain & Acute Stroke Protocol'
  },
  {
    id: 'analytics',
    label: 'Analytics & Research',
    icon: BarChart3,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50/80 border-blue-200/60',
    activeBg: 'bg-blue-600',
    activeText: 'text-blue-950',
    description: 'Historical Trends, Pyramids & Subtypes'
  },
  {
    id: 'prediction',
    label: 'What-If? Simulator',
    badge: 'Model',
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
    icon: Sliders,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50/80 border-purple-200/60',
    activeBg: 'bg-purple-600',
    activeText: 'text-purple-950',
    description: 'PAF Scenario-Based Burden Forecasting'
  },
  {
    id: 'research-feed',
    label: 'News & Impact Stories',
    icon: Newspaper,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50/80 border-emerald-200/60',
    activeBg: 'bg-emerald-600',
    activeText: 'text-emerald-950',
    description: 'Lancet / WHO Discoveries & Recovery Case Logs'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:z-40 glass-sidebar flex flex-col transition-all duration-300 ease-in-out bg-white/95 lg:bg-white/80 border-r border-slate-200/80 ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header & Brand Anchor */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80 bg-white/70 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 font-bold shadow-2xs flex-shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 heading-rounded truncate">
                    Stroke<span className="text-sky-600">Watch</span> AI
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 font-mono">
                    v2.4
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">GBD 2021 & WSO</div>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            {!isCollapsed && <span>Surveillance Modules</span>}
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ACTIVE</span>
            </span>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  isActive
                    ? 'reflective-subcard bg-white/95 font-bold border-sky-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors border ${
                    isActive
                      ? `${item.activeBg} text-white shadow-xs border-transparent`
                      : `${item.iconBg} ${item.iconColor} group-hover:scale-105`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold truncate ${isActive ? item.activeText : 'text-slate-800 group-hover:text-slate-900'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border font-mono ${
                            item.badgeClass || 'bg-sky-50 text-sky-700 border-sky-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer command stats */}
        <div className="p-3 border-t border-slate-200/80 bg-white/40 backdrop-blur-md">
          {!isCollapsed ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Surveillance</span>
                </span>
                <span className="font-bold text-slate-900">204 Nations</span>
              </div>
              <div className="text-[10px] text-slate-500 leading-tight">
                Calibrated from WHO, GBD 2021 & ICMR-NCDIR registries.
              </div>
            </div>
          ) : (
            <div className="flex justify-center text-emerald-600" title="Surveillance Active">
              <ShieldCheck className="w-4 h-4" />
            </div>
          )}

          {/* Desktop collapse toggle button */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex mt-3 w-full items-center justify-center gap-1.5 py-1.5 rounded-xl reflective-pill text-slate-600 text-xs transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[11px] font-medium">Collapse Menu</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
