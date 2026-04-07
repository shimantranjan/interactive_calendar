import React from 'react';
import { format } from 'date-fns';
import { getHeroImageUrl } from '../lib/utils';
import { cn } from '../lib/utils';

interface MonthHeroProps {
  currentDate: Date;
  className?: string;
}

export function MonthHero({ currentDate, className }: MonthHeroProps) {
  const month = currentDate.getMonth();
  const imageUrl = getHeroImageUrl(month);

  return (
    <div className={cn("relative w-full h-[300px] lg:h-full overflow-hidden flex items-end p-8 shadow-inner", className)}>
      <img
        src={imageUrl}
        alt={`Theme for ${format(currentDate, 'MMMM')}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
      <div className="relative text-white z-10 bottom-0 text-left">
        <h1 className="text-6xl font-black tracking-tight" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          {format(currentDate, 'MMMM')}
        </h1>
        <p className="text-2xl font-light opacity-90 mt-1 uppercase tracking-widest">{format(currentDate, 'yyyy')}</p>
      </div>
    </div>
  );
}
