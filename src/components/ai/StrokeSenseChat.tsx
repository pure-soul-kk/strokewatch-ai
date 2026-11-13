'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  User, 
  ExternalLink, 
  HelpCircle,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { ChatMessage } from '@/types';
import { processStrokeSenseQuery } from '@/lib/stroke-ai-engine';

const QUICK_PROMPTS = [
  'What is a stroke?',
  'Why are stroke cases increasing globally?',
  'Which risk factors contribute most to stroke?',
  'What is the difference between ischemic and hemorrhagic stroke?',
  'What do the latest statistics tell us?',
  'How can stroke risk be reduced?',
  'How do I recognize stroke symptoms (FAST)?',
  'What are the stroke statistics in India?'
];

export const StrokeSenseChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello, I am **StrokeSense AI**, your clinical stroke intelligence assistant.\n\nI provide evidence-based insights retrieved from the **World Stroke Organization (WSO)**, **The Lancet Neurology GBD 2021 study**, and the **ICMR-NCDIR registries**.\n\nAsk me about global statistics, physiological mechanisms, modifiable risk factors, or FAST emergency recognition protocols.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        { title: 'Global Burden of Disease 2021 Stroke Analysis', source: 'The Lancet Neurology 2024' },
        { title: 'World Stroke Organization Clinical Guidelines', source: 'WSO 2023/2024' }
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // First try backend API, fallback to local engine
      let result;
      try {
        const res = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query })
        });
        if (res.ok) {
          result = await res.json();
        } else {
          result = await processStrokeSenseQuery(query);
        }
      } catch (err) {
        result = await processStrokeSenseQuery(query);
      }

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: result.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: result.citations,
        isEmergencyAlert: result.isEmergencyAlert
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[740px] rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 bg-[#0a1120] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                STROKESENSE AI ASSISTANT
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 font-semibold">
                EVIDENCE RETRIEVAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Verified clinical literature synthesis • Non-diagnostic medical guidance
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompt Bar */}
      <div className="px-4 py-2.5 bg-[#080D18]/90 border-b border-slate-800/80 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Quick Prompts:</span>
        </span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/80 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-slate-300 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : ''}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-cyan-600 text-white font-medium rounded-tr-none'
                    : msg.isEmergencyAlert
                    ? 'bg-red-950/80 border border-red-500/60 text-red-100 rounded-tl-none shadow-glow-red'
                    : 'bg-[#111c30] border border-slate-800/90 text-slate-200 rounded-tl-none'
                }`}
              >
                {/* Emergency banner inside bubble if triggered */}
                {msg.isEmergencyAlert && (
                  <div className="flex items-center gap-2 pb-2 mb-2 border-b border-red-500/30 text-red-300 font-bold uppercase tracking-wider text-xs">
                    <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                    <span>EMERGENCY PROTOCOL ACTIVATION</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap space-y-2">
                  {msg.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph.split('**').map((chunk, cIdx) =>
                        cIdx % 2 === 1 ? (
                          <strong key={cIdx} className="font-bold text-white">
                            {chunk}
                          </strong>
                        ) : (
                          chunk
                        )
                      )}
                    </p>
                  ))}
                </div>

                {/* Citations block */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                    <div className="font-mono text-cyan-400 font-semibold flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>Citations & References:</span>
                    </div>
                    {msg.citations.map((cite, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 inline-block" />
                        <span className="font-medium text-white">{cite.title}</span>
                        <span className="text-slate-400">— {cite.source}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-2 text-[10px] text-slate-400 text-right font-mono">
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-md">
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#111c30] border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Consulting WSO & GBD clinical literature...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3.5 bg-[#0a1120] border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask StrokeSense AI about stroke statistics, risk factors, or FAST protocols..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1 bg-[#101b30] border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputQuery.trim()}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold transition-all flex items-center justify-center shadow-glow-cyan"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Medical Guardrail Notice */}
      <div className="px-4 py-1.5 bg-[#060a12] text-[10px] text-slate-400 text-center font-mono border-t border-slate-900">
        STROKESENSE AI CANNOT DIAGNOSE MEDICAL CONDITIONS. IN AN EMERGENCY, IMMEDIATELY CALL 911 / 112 / 108.
      </div>
    </div>
  );
};
