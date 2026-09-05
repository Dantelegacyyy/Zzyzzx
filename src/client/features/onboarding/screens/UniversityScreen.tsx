import React, { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';

interface SchoolItem {
  id: string;
  name: string;
  campus?: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
}

const POPULAR_SCHOOLS: SchoolItem[] = [
  {
    id: 'asu-tempe',
    name: 'Arizona State University',
    campus: 'Tempe Campus',
    badge: 'ASU',
    badgeBg: 'bg-[#8C1D40]',
    badgeText: 'text-[#FFC627]',
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    badge: 'S',
    badgeBg: 'bg-red-700',
    badgeText: 'text-white',
  },
  {
    id: 'mit',
    name: 'MIT',
    badge: 'MIT',
    badgeBg: 'bg-purple-900',
    badgeText: 'text-white',
  },
  {
    id: 'berkeley',
    name: 'UC Berkeley',
    badge: 'Cal',
    badgeBg: 'bg-blue-800',
    badgeText: 'text-yellow-300',
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    badge: 'M',
    badgeBg: 'bg-blue-900',
    badgeText: 'text-yellow-400',
  },
];

export function UniversityScreen({
  onNext,
  onBack,
}: {
  onNext: (school: string) => void;
  onBack: () => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('Arizona State University — Tempe Campus');
  const [catalogResults, setCatalogResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setCatalogResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/institutions/search?q=${encodeURIComponent(search.trim())}&limit=20`);
        if (res.ok) {
          const data = await res.json();
          setCatalogResults(data.institutions || []);
        }
      } catch (err) {
        console.error('Institution search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSelect = (fullName: string) => {
    setSelectedSchool(fullName);
  };

  const handleContinue = () => {
    onNext(selectedSchool || search || 'Arizona State University — Tempe Campus');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-slate-900 bg-[#EBF5FB] rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#007AFF] uppercase mb-2">
        <span>06 UNIVERSITY</span>
      </div>

      {/* Center Content */}
      <div className="my-auto flex flex-col items-center py-2 max-w-sm mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
          Where do you study?
        </h2>

        {/* Search Box */}
        <div className="relative w-full mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your institution (e.g. ASU Tempe)..."
            className="w-full py-2.5 pl-10 pr-4 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#007AFF] shadow-sm"
          />
        </div>

        {/* Popular / Catalog Schools List */}
        <div className="w-full text-left">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            {search.trim() ? 'Search Results' : 'Popular Schools (Full USA Catalog)'}
          </p>

          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {search.trim() && catalogResults.length > 0 ? (
              catalogResults.map((item) => {
                const label = item.campus ? `${item.name} — ${item.campus}` : item.name;
                const isSelected = selectedSchool === label;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(label)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-blue-100/90 border-[#007AFF] text-blue-950 font-bold shadow-sm'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-800 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#8C1D40] text-[#FFC627] font-bold text-[10px] flex items-center justify-center shrink-0">
                        {item.name.slice(0, 3).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="truncate font-semibold">{item.name}</div>
                        {item.campus && <div className="text-[10px] text-slate-500">{item.campus} • {item.city}, {item.state}</div>}
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 shrink-0" />
                  </button>
                );
              })
            ) : search.trim() && loading ? (
              <div className="p-4 text-center text-xs text-slate-500">Searching USA campus database...</div>
            ) : (
              POPULAR_SCHOOLS.map((school) => {
                const label = school.campus ? `${school.name} — ${school.campus}` : school.name;
                const isSelected = selectedSchool === label;
                return (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => handleSelect(label)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-blue-100/90 border-[#007AFF] text-blue-950 font-bold shadow-sm'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-800 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-lg ${school.badgeBg} ${school.badgeText} font-bold text-[10px] flex items-center justify-center shrink-0 shadow-sm`}>
                        {school.badge}
                      </div>
                      <div className="truncate">
                        <div className="truncate font-semibold">{school.name}</div>
                        {school.campus && <div className="text-[10px] text-slate-500 font-normal">{school.campus}</div>}
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 shrink-0" />
                  </button>
                );
              })
            )}

            {/* Other / Not Listed option */}
            <button
              type="button"
              onClick={() => handleSelect(search.trim() || 'Custom Collegiate Campus')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs ${
                selectedSchool === 'Custom Collegiate Campus'
                  ? 'bg-blue-100/90 border-[#007AFF] text-blue-950 font-bold shadow-sm'
                  : 'bg-white/80 border-dashed border-slate-300 hover:bg-white text-slate-700 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                  @
                </div>
                <span>Other / Not Listed</span>
              </div>
              <ChevronRight size={14} className="text-slate-400 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-3">
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold text-xs shadow-[0_4px_20px_rgba(99,102,241,0.4)] transition-all"
          >
            Next
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 0 ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
