import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface NotesPanelProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
}

type TabType = 'month' | 'range';

export function NotesPanel({ currentMonth, startDate, endDate }: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('month');
  const [monthNote, setMonthNote] = useState('');
  const [rangeNote, setRangeNote] = useState('');

  const monthKey = `note-month-${format(currentMonth, 'yyyy-MM')}`;
  const rangeKey = startDate && endDate 
    ? `note-range-${format(startDate, 'yyyy-MM-dd')}-${format(endDate, 'yyyy-MM-dd')}` 
    : null;

  useEffect(() => {
    // Load month note
    const savedMonth = localStorage.getItem(monthKey) || '';
    setMonthNote(savedMonth);
  }, [monthKey]);

  useEffect(() => {
    // Load range note
    if (rangeKey) {
      const savedRange = localStorage.getItem(rangeKey) || '';
      setRangeNote(savedRange);
    } else {
      setRangeNote('');
    }
  }, [rangeKey]);

  const handleMonthNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 500) {
      setMonthNote(val);
      localStorage.setItem(monthKey, val);
    }
  };

  const handleRangeNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 500 && rangeKey) {
      setRangeNote(val);
      localStorage.setItem(rangeKey, val);
    }
  };

  return (
    <div className="mt-8 border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'month' 
              ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)] bg-white' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
          onClick={() => setActiveTab('month')}
        >
          Month Notes
        </button>
        <button
          disabled={!rangeKey}
          className={`px-4 py-3 text-sm font-medium transition-colors ${!rangeKey ? 'opacity-50 cursor-not-allowed' : ''} ${
            activeTab === 'range' 
              ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)] bg-white' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
          onClick={() => {
            if (rangeKey) setActiveTab('range');
          }}
        >
          Range Notes
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'month' ? (
          <div className="relative">
            <textarea
              className="w-full h-32 p-3 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-y text-sm"
              placeholder={`Notes for ${format(currentMonth, 'MMMM yyyy')}...`}
              value={monthNote}
              onChange={handleMonthNoteChange}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
              {monthNote.length} / 500 chars
            </div>
          </div>
        ) : (
          <div className="relative">
             <textarea
              className="w-full h-32 p-3 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-y text-sm"
              placeholder={startDate && endDate ? `Notes for ${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}...` : 'Select a date range first...'}
              value={rangeNote}
              onChange={handleRangeNoteChange}
              disabled={!rangeKey}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
              {rangeNote.length} / 500 chars
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
