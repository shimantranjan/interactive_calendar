import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HOLIDAYS: Record<string, string> = {
  // Month-Day format
  "01-01": "New Year's Day",
  "02-14": "Valentine's Day",
  "03-17": "St. Patrick's Day",
  "04-01": "April Fools' Day",
  "05-01": "Labor Day",
  "07-04": "Independence Day",
  "10-31": "Halloween",
  "12-25": "Christmas Day",
  "12-31": "New Year's Eve",
};

// Map each month (0-11) to a thematic unsplash topic or keyword
export const MONTH_THEMES = [
  "snow,winter,frost",           // Jan
  "cozy,coffee,indoor,winter",   // Feb
  "spring,green,sprout",         // Mar
  "blossom,flower,rain",         // Apr
  "nature,bloom,sunny",          // May
  "beach,summer,ocean",          // Jun
  "sunset,warm,vacation",        // Jul
  "camping,forest,lake",         // Aug
  "autumn,fall,leaves,orange",   // Sep
  "pumpkin,spooky,fall",         // Oct
  "thanksgiving,harvest,brown",  // Nov
  "christmas,holiday,snow"       // Dec
];

export function getHeroImageUrl(month: number): string {
  // Using unspash source with standard keywords
  // As a reliable fallback, we can use images.unsplash.com or source.unsplash.com
  // source.unsplash is deprecated but images.unsplash.com needs IDs.
  // We'll use a reliable fallback using hardcoded IDs for stability, 
  // since random source.unsplash often breaks or hangs.
  
  const hqImages = [
    "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&q=80&w=1000", // Jan: Snow
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000", // Feb: Cozy/Coffee
    "https://images.unsplash.com/photo-1462275646964-a0e052f05658?auto=format&fit=crop&q=80&w=1000", // Mar: Sprout
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000", // Apr: Blossom
    "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=1000", // May: Bloom
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000", // Jun: Beach
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000", // Jul: Vacation
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1000", // Aug: Camping
    "https://images.unsplash.com/photo-1444465693019-aa0b6392460d?auto=format&fit=crop&q=80&w=1000", // Sep: Autumn
    "https://images.unsplash.com/photo-1505327191481-d3525d0da4ed?auto=format&fit=crop&q=80&w=1000", // Oct: Pumpkin
    "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&q=80&w=1000", // Nov: Thanksgiving
    "https://images.unsplash.com/photo-1543589077-47d81606c1df?auto=format&fit=crop&q=80&w=1000"  // Dec: Christmas
  ];
  return hqImages[month % 12];
}
