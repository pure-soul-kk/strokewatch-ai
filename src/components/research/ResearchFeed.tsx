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
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Newspaper className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              LATEST STROKE RESEARCH & CLINICAL DISCOVERIES
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">
              PEER-REVIEWED FEED
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
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
            className="pl-9 pr-4 py-2 rounded-xl bg-[#09101d] border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 w-60 sm:w-72"
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
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-[#09101d] text-slate-400 hover:text-white border border-slate-800'
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
            className="group glass-panel rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-cyan-400 uppercase text-[10px] font-bold">
                  {article.category}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{article.publishedDate}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {article.title}
              </h3>

              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {article.journal} • {article.publisher}
              </div>

              {/* AI-Generated Summary */}
              <div className="mt-3 p-3 rounded-xl bg-[#09101d] border border-slate-800/80 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Clinical Synthesis:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {article.aiSummary}
                </p>
              </div>

              {/* Key Takeaway */}
              <div className="mt-2.5 text-xs text-slate-400 leading-snug">
                <strong className="text-slate-200">Key Finding:</strong> {article.keyTakeaway}
              </div>
            </div>

            {/* Source DOI Link */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">
                Impact Score: <strong className="text-cyan-400 font-mono">{article.impactScore}/100</strong>
              </span>

              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                <span>Read Original Publication</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Stories Section (Educational Recovery Scenarios) */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                EDUCATIONAL CASE LOGS & GOLDEN HOUR INTERVENTIONS
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Fictional educational clinical scenarios based on real hospital emergency workflows.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
            EDUCATIONAL SCENARIOS (NON-REAL PATIENT NAMES)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {IMPACT_STORIES.map((story) => (
            <div
              key={story.id}
              className="p-4 rounded-xl bg-[#09101d] border border-slate-800/90 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                  {story.patientArchetype} (Age {story.age})
                </div>
                <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                  {story.headline}
                </h4>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  <strong>Onset:</strong> {story.initialSymptoms}
                </p>

                <div className="mt-2 text-xs text-slate-400">
                  <strong className="text-slate-300">Arrival:</strong> {story.hospitalArrivalMinutes} min to stroke center.
                </div>

                <div className="mt-1 text-xs text-emerald-400">
                  <strong className="text-slate-300">Outcome:</strong> {story.clinicalOutcome}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300/90 font-medium">
                💡 <em>{story.educationalTakeaway}</em>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
