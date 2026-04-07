import React from 'react';
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek, format, isAfter, differenceInDays } from 'date-fns';
import { DayCell } from './DayCell';
import { NotesPanel } from './NotesPanel';
import { MiniCalendar } from './MiniCalendar';
import { subMonths, addMonths } from 'date-fns';

interface CalendarGridProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

export function CalendarGrid({
  currentMonth,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover
}: CalendarGridProps) {
  // We use Monday as start of week
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateOfGrid = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDateOfGrid = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const days = eachDayOfInterval({
    start: startDateOfGrid,
    end: endDateOfGrid
  });

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const rangeSummary = React.useMemo(() => {
    if (startDate && endDate) {
      const min = isAfter(endDate, startDate) ? startDate : endDate;
      const max = isAfter(endDate, startDate) ? endDate : startDate;
      const days = differenceInDays(max, min) + 1;
      return `${format(min, 'MMM d')} – ${format(max, 'MMM d')} · ${days} days`;
    }
    if (startDate) {
      return `Started: ${format(startDate, 'MMM d')} · Select end date`;
    }
    return "Select a range of dates";
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((day, i) => (
          <div key={day} className={`text-center text-xs font-semibold tracking-wider ${i >= 5 ? 'text-[var(--primary-color)]' : 'text-slate-400'}`}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {days.map((day, i) => (
          <DayCell
            key={day.toString()}
            date={day}
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDateClick={onDateClick}
            onDateHover={onDateHover}
          />
        ))}
      </div>

      <div className="mt-8 text-center text-sm font-medium text-[var(--primary-color)] bg-[var(--primary-light-color)] py-2 px-4 rounded-full inline-block mx-auto">
        {rangeSummary}
      </div>

      <NotesPanel 
        currentMonth={currentMonth} 
        startDate={startDate && endDate ? (startDate < endDate ? startDate : endDate) : null} 
        endDate={startDate && endDate ? (startDate > endDate ? startDate : endDate) : null} 
      />

      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
        <MiniCalendar date={subMonths(currentMonth, 1)} label="Prev" />
        <MiniCalendar date={addMonths(currentMonth, 1)} label="Next" />
      </div>
    </div>
  );
}
