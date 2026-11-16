'use client';

import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Search, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Clock, 
  Tag,
  ArrowRight
} from 'lucide-react';
import { RESEARCH_ARTICLES, IMPACT_STORIES } from '@/data/news-research';
import { ResearchArticle, ImpactStory } from '@/types';

export const ResearchFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  const categories = ['All', 'Epidemiology', 'Clinical Trials', 'Prevention', 'AI & Tech', 'Policy'];

  const filteredArticles = useMemo(() => {
    return RESEARCH_ARTICLES.filter((article) => {
      const matchesCat = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.aiSummary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Newspaper className="w-5 h-5 text-sky-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight heading-rounded">
              LATEST STROKE RESEARCH & CLINICAL DISCOVERIES
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/80 text-sky-800 border border-sky-200/80 font-semibold shadow-sm">
              PEER-REVIEWED FEED
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Curated breakthroughs from <em>The Lancet Neurology</em>, <em>New England Journal of Medicine</em>, <em>Stroke</em>, and the <em>ICMR-NCDIR</em>.
            Includes educational golden-hour clinical scenarios.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search papers by keyword or journal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl reflective-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-60 sm:w-72 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                isSelected
                  ? 'reflective-pill-active font-bold shadow-sm'
                  : 'reflective-pill text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Research Articles List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredArticles.map((article: ResearchArticle) => (
          <div
            key={article.id}
            className="group glass-panel reflective-glint rounded-2xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-mono text-sky-600 uppercase text-[10px] font-bold">
                  {article.category}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{article.publishedDate}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug heading-rounded">
                {article.title}
              </h3>

              <div className="text-[11px] font-mono text-slate-500 mt-1">
                {article.journal} • {article.publisher}
              </div>

              {/* AI-Generated Summary */}
              <div className="mt-3 p-3.5 rounded-xl reflective-subcard space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-sky-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-600" />
                  <span>AI Clinical Synthesis:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {article.aiSummary}
                </p>
              </div>

              {/* Key Takeaway */}
              <div className="mt-2.5 text-xs text-slate-600 leading-snug">
                <strong className="text-slate-800">Key Finding:</strong> {article.keyTakeaway}
              </div>
            </div>

            {/* Source DOI Link */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                Impact Score: <strong className="text-sky-600 font-mono">{article.impactScore}/100</strong>
              </span>

              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-semibold transition-colors"
              >
                <span>Read Original Publication</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Stories Section (Educational Recovery Scenarios) */}
      <div className="p-6 rounded-2xl glass-panel reflective-glint shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900 heading-rounded">
                EDUCATIONAL CASE LOGS & GOLDEN HOUR INTERVENTIONS
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Fictional educational clinical scenarios based on real hospital emergency workflows.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium shadow-2xs">
            EDUCATIONAL SCENARIOS (NON-REAL PATIENT NAMES)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {IMPACT_STORIES.map((story) => (
            <div
              key={story.id}
              className="p-4 rounded-xl reflective-subcard flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="text-[10px] font-mono uppercase text-sky-700 font-semibold">
                  {story.patientArchetype} (Age {story.age})
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug heading-rounded">
                  {story.headline}
                </h4>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  <strong className="text-slate-800">Onset:</strong> {story.initialSymptoms}
                </p>

                <div className="mt-2 text-xs text-slate-600">
                  <strong className="text-slate-800">Arrival:</strong> {story.hospitalArrivalMinutes} min to stroke center.
                </div>

                <div className="mt-1 text-xs text-emerald-700 font-medium">
                  <strong className="text-slate-800">Outcome:</strong> {story.clinicalOutcome}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-sky-800 font-medium">
                💡 <em>{story.educationalTakeaway}</em>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
