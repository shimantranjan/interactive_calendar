import React, { useState, useEffect, useCallback, useRef } from 'react';
import { addMonths, subMonths, isSameDay } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { MonthHero } from './MonthHero';
import { ThemeToggle, type ThemeId } from './ThemeToggle';
import { cn } from '../lib/utils';

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  
  const [theme, setTheme] = useState<ThemeId>('blue');
  const [animating, setAnimating] = useState<'' | 'left' | 'right' | 'flip'>('');
  
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handlePrevMonth = useCallback(() => {
    setAnimating('flip');
    setTimeout(() => {
      setCurrentMonth(prev => subMonths(prev, 1));
      setAnimating('');
    }, 300); // sync with flip animation
  }, []);

  const handleNextMonth = useCallback(() => {
    setAnimating('flip');
    setTimeout(() => {
      setCurrentMonth(prev => addMonths(prev, 1));
      setAnimating('');
    }, 300);
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isSameDay(date, startDate)) {
        // Double click same day clears it
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!calendarRef.current?.contains(document.activeElement) && document.activeElement?.tagName !== 'BODY') {
        return; // Don't steal focus from textareas
      }
      
      switch (e.key) {
        case 'ArrowRight':
          handleNextMonth();
          break;
        case 'ArrowLeft':
          handlePrevMonth();
          break;
        case 'Escape':
          setStartDate(null);
          setEndDate(null);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextMonth, handlePrevMonth]);

  return (
    <div 
      className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 border border-slate-200 focus:outline-none"
      ref={calendarRef}
      tabIndex={0}
    >
      {/* Spiral Binding Top Decoration (Visible mainly on Desktop but present absolute) */}
      <div className="absolute top-0 left-0 right-0 h-4 spiral-binding z-50 rounded-t-3xl shadow-sm" />

      {/* Left Panel: Month Hero */}
      <div className="w-full lg:w-2/5 flex-shrink-0 mt-4 lg:mt-0 relative group">
        <MonthHero currentDate={currentMonth} />
        
        {/* Theme Toggle pinned to hero */}
        <div className="absolute top-8 left-6 z-20">
          <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
        </div>
      </div>

      {/* Right Panel: Calendar Body */}
      <div className={`w-full lg:w-3/5 p-6 lg:p-10 pt-10 flex flex-col bg-white overflow-y-auto max-h-[90vh] custom-scrollbar ${animating === 'flip' ? 'animate-page-curl' : ''}`}>
        <CalendarHeader 
          currentDate={currentMonth} 
          onPrevMonth={handlePrevMonth} 
          onNextMonth={handleNextMonth} 
        />
        
        <div className="flex-1 mt-4">
          <CalendarGrid
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDateClick={handleDateClick}
            onDateHover={setHoverDate}
          />
        </div>
      </div>
    </div>
  );
}
