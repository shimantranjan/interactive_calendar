import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth, getDay } from 'date-fns';
import { cn } from '../lib/utils';

interface MiniCalendarProps {
  date: Date;
  label: string;
}

export function MiniCalendar({ date, label }: MiniCalendarProps) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  
  // Need to pad start to Monday (or Sunday). Let's use Monday as start of week for consistency or Sunday.
  const startDate = monthStart;
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startDayPadding = startDate.getDay() === 0 ? 6 : startDate.getDay() - 1; // Mon-Sun

  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-slate-800 font-bold">{format(date, 'MMM yyyy')}</span>
      </h4>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 font-medium mb-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {Array.from({ length: startDayPadding }).map((_, i) => (
          <div key={`empty-${i}`} className="text-transparent">.</div>
        ))}
        {days.map((day, i) => (
          <div key={i} className="py-1 text-slate-600">
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}
