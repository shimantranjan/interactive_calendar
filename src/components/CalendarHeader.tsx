import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 px-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold text-slate-800" aria-live="polite">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
