'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  User, 
  RefreshCw
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
    <div className="flex flex-col h-[700px] rounded-2xl glass-panel border border-slate-200 overflow-hidden shadow-sm">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 heading-rounded tracking-tight">
                StrokeSense AI Assistant
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                EVIDENCE RETRIEVAL
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Verified clinical literature synthesis • Non-diagnostic medical guidance
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompt Bar */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-[10px] font-semibold uppercase text-slate-500 flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-sky-600" />
          <span>Quick Prompts:</span>
        </span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 text-slate-700 transition-colors font-medium shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : ''}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-sky-600 text-white font-medium rounded-tr-none'
                    : msg.isEmergencyAlert
                    ? 'bg-red-50 border border-red-200 text-red-950 rounded-tl-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                }`}
              >
                {/* Emergency banner inside bubble if triggered */}
                {msg.isEmergencyAlert && (
                  <div className="flex items-center gap-2 pb-2 mb-2 border-b border-red-200 text-red-800 font-bold uppercase tracking-wider text-xs">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>EMERGENCY PROTOCOL ACTIVATION</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap space-y-2">
                  {msg.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph.split('**').map((chunk, cIdx) =>
                        cIdx % 2 === 1 ? (
                          <strong key={cIdx} className={isUser ? 'font-bold text-white' : 'font-bold text-slate-950'}>
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
                  <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                    <div className="font-semibold text-slate-700 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-sky-600" />
                      <span>Citations & References:</span>
                    </div>
                    {msg.citations.map((cite, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5 text-slate-600">
                        <span className="w-1 h-1 rounded-full bg-sky-500 inline-block" />
                        <span className="font-medium text-slate-800">{cite.title}</span>
                        <span className="text-slate-500">— {cite.source}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`mt-2 text-[10px] text-right font-mono ${isUser ? 'text-sky-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-md">
            <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 flex-shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
              <span>Consulting WSO & GBD clinical literature...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask StrokeSense AI about stroke statistics, risk factors, or FAST protocols..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputQuery.trim()}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-bold transition-all flex items-center justify-center shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Guardrail Notice */}
      <div className="px-4 py-1.5 bg-slate-50 text-[10px] text-slate-500 text-center border-t border-slate-200">
        StrokeSense AI cannot diagnose medical conditions. In an emergency, immediately call 911 / 112 / 108.
      </div>
    </div>
  );
};
