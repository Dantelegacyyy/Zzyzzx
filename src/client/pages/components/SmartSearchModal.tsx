import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  FileText,
  BookOpen,
  Brain,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Check,
} from 'lucide-react';
import { api } from '../../lib/api';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  course: string;
  snippet: string;
  relevance: number;
  tags: string[];
}

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: (result: SearchResult) => void;
}

export function SmartSearchModal({ isOpen, onClose, onSelectResult }: SmartSearchModalProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'courses' | 'notes' | 'concepts'>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      handleSearch(query, filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSearch = async (searchTerm: string, activeFilter: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/workspace/smart-search?q=${encodeURIComponent(searchTerm)}&filter=${activeFilter}`);
      if (res.results) {
        setResults(res.results);
      }
    } catch (err) {
      console.error('Failed to run smart search:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    handleSearch(val, filter);
  };

  const handleFilterChange = (newFilter: 'all' | 'courses' | 'notes' | 'concepts') => {
    setFilter(newFilter);
    handleSearch(query, newFilter);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-[#090E1F] border border-cyan-500/30 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Search size={18} />
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search across courses, smart notes, syllabus, and concepts..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Pills Ribbon */}
        <div className="px-5 py-2.5 bg-zinc-950/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          <span className="text-slate-500 mr-2 flex items-center gap-1 shrink-0">
            <Filter size={12} /> Filter:
          </span>
          {(['all', 'courses', 'notes', 'concepts'] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-3 py-1 rounded-lg capitalize transition-all ${
                filter === f
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono text-slate-500 hidden sm:inline">
            {results.length} results found
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono">Indexing academic assets...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Brain size={36} className="mx-auto text-slate-600 opacity-60" />
              <p className="text-sm font-semibold text-slate-300">No matching resources found</p>
              <p className="text-xs text-slate-500">
                Try searching for "Binary Search Trees", "Fourier", "Notes", or a course title.
              </p>
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectResult) onSelectResult(item);
                  onClose();
                }}
                className="glass-card rounded-2xl p-4 hover:border-cyan-500/40 cursor-pointer transition-all group flex flex-col gap-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs">
                      {item.category === 'Course' && <BookOpen size={14} />}
                      {item.category === 'Note' && <FileText size={14} />}
                      {item.category !== 'Course' && item.category !== 'Note' && <Brain size={14} />}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {item.relevance}% Match
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.snippet}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                  <span className="text-slate-400 font-medium">{item.course}</span>
                  <div className="flex items-center gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                    <ArrowRight
                      size={14}
                      className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 bg-zinc-950/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 px-5">
          <span>Tip: Press ESC to exit smart search</span>
          <span className="text-cyan-400 font-semibold">Cerebro Smart Semantic Index v2.5</span>
        </div>
      </div>
    </div>
  );
}
