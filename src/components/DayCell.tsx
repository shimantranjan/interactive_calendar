import React from 'react';
import { format, isSameDay, isSameMonth, isValid } from 'date-fns';
import { cn, HOLIDAYS } from '../lib/utils';

export interface DayCellProps {
  date: Date;
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

export function DayCell({
  date,
  currentMonth,
  startDate,
  endDate,
  hoverDate,
  onDateClick,
  onDateHover,
}: DayCellProps) {
  const dayName = format(date, 'd');
  const monthDayStr = format(date, 'MM-dd');
  const holiday = HOLIDAYS[monthDayStr];
  
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isToday = isSameDay(date, new Date());
  
  // Selection logic
  const isStart = startDate && isSameDay(date, startDate);
  const isEnd = endDate && isSameDay(date, endDate);
  const isSelected = isStart || isEnd;
  
  const isBetween = React.useMemo(() => {
    if (!startDate) return false;
    // If we have end date, check strict between
    if (endDate) {
      const min = startDate < endDate ? startDate : endDate;
      const max = startDate > endDate ? startDate : endDate;
      return date > min && date < max;
    }
    // Hover preview
    if (hoverDate) {
      const min = startDate < hoverDate ? startDate : hoverDate;
      const max = startDate > hoverDate ? startDate : hoverDate;
      return date > min && date < max;
    }
    return false;
  }, [date, startDate, endDate, hoverDate]);

  return (
    <button
      onClick={() => onDateClick(date)}
      onMouseEnter={() => onDateHover(date)}
      onMouseLeave={() => onDateHover(null)}
      aria-label={`${format(date, 'MMMM d, yyyy')}${holiday ? ` - ${holiday}` : ''}`}
      className={cn(
        "relative py-1 md:py-2 focus:outline-none group",
        !isCurrentMonth && "opacity-30",
        isBetween && "bg-[var(--primary-light-color)]",
        isStart && endDate && "rounded-l-full bg-[var(--primary-light-color)]",
        isEnd && startDate && "rounded-r-full bg-[var(--primary-light-color)]"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 mx-auto flex flex-col items-center justify-center rounded-full transition-all text-sm relative z-10",
          "hover:bg-slate-100",
          isToday && !isSelected && "ring-2 ring-[var(--primary-color)] font-bold",
          isSelected && "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)] font-bold shadow-md transform scale-105",
          (date.getDay() === 0 || date.getDay() === 6) && !isSelected && "text-[var(--primary-color)] font-medium"
        )}
      >
        <span>{dayName}</span>
        {isToday && !isSelected && (
          <span className="absolute bottom-1 w-1 h-1 bg-[var(--primary-color)] rounded-full" />
        )}
      </div>
      
      {holiday && isCurrentMonth && (
        <div className="absolute bottom-[2px] left-1/2 transform -translate-x-1/2 group-hover:scale-125 transition-transform">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" title={holiday}></div>
          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-slate-800 text-white text-[10px] whitespace-nowrap rounded shadow-lg z-50">
            {holiday}
          </div>
        </div>
      )}
    </button>
  );
}
