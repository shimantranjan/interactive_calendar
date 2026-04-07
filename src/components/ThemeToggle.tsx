import React from 'react';
import { Palette } from 'lucide-react';

const THEMES = [
  { id: 'blue', color: 'bg-blue-600' },
  { id: 'emerald', color: 'bg-emerald-600' },
  { id: 'rose', color: 'bg-rose-600' },
  { id: 'purple', color: 'bg-purple-600' }
] as const;

export type ThemeId = typeof THEMES[number]['id'];

interface ThemeToggleProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export function ThemeToggle({ currentTheme, onThemeChange }: ThemeToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1.5 shadow-sm border border-slate-200">
      <Palette className="w-4 h-4 text-slate-400" />
      <div className="w-px h-4 bg-slate-200 mx-1" />
      <div className="flex space-x-1.5">
        {THEMES.map((theme) => (
           <button
             key={theme.id}
             aria-label={`Set theme to ${theme.id}`}
             onClick={() => onThemeChange(theme.id)}
             className={`w-5 h-5 rounded-full ${theme.color} transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400 ${
               currentTheme === theme.id ? 'ring-2 ring-offset-1 ring-slate-800 scale-110' : ''
             }`}
           />
        ))}
      </div>
    </div>
  );
}
