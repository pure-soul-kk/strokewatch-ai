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
  CheckCircle2
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
  icon: React.ElementType;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Command Dashboard',
    icon: LayoutDashboard,
    description: 'Executive KPIs, Live Counter & Stroke Clock'
  },
  {
    id: 'map',
    label: 'Global Surveillance Map',
    badge: '3D',
    icon: Globe,
    description: 'Interactive 204-Country Burden Explorer'
  },
  {
    id: 'india',
    label: 'India Stroke Intelligence',
    badge: 'ICMR',
    icon: MapPin,
    description: 'State Registries & Hemorrhagic Distribution'
  },
  {
    id: 'ai-chat',
    label: 'StrokeSense AI',
    badge: 'AI',
    icon: Bot,
    description: 'Evidence-Based Clinical Intelligence'
  },
  {
    id: 'risk-lab',
    label: 'Risk Awareness Lab',
    badge: 'Lab',
    icon: HeartPulse,
    description: 'Personalized Lifestyle Assessment'
  },
  {
    id: 'emergency',
    label: 'FAST Emergency Center',
    badge: '911',
    icon: AlertCircle,
    description: 'Time-is-Brain & Acute Stroke Protocol'
  },
  {
    id: 'analytics',
    label: 'Analytics & Research',
    icon: BarChart3,
    description: 'Historical Trends, Pyramids & Subtypes'
  },
  {
    id: 'prediction',
    label: 'What-If? Simulator',
    badge: 'Model',
    icon: Sliders,
    description: 'PAF Scenario-Based Burden Forecasting'
  },
  {
    id: 'research-feed',
    label: 'News & Impact Stories',
    icon: Newspaper,
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
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation list */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            {!isCollapsed && <span>Surveillance Modules</span>}
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
                    ? 'bg-sky-50 text-sky-900 font-semibold border border-sky-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 group-hover:bg-slate-200 text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold truncate text-slate-800 group-hover:text-slate-900">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                            item.badge === '911'
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : item.badge === 'AI'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-sky-50 text-sky-700 border border-sky-200'
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
        <div className="p-3 border-t border-slate-200 bg-slate-50/70">
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
            className="hidden lg:flex mt-3 w-full items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs transition-colors"
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
