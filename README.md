# Wall Calendar Component 🗓️

A polished, interactive, responsive Wall Calendar React component built as part of an assessment. This project includes an aesthetically pleasing visual design reminiscent of a physical calendar with dynamic monthly themes, smooth page-flip animations, multi-range selection, note-taking capabilities, and keyboard accessibility.

## 🌟 Features

*   **Aesthetic "Wall Calendar" UI**: A beautiful two-panel design featuring a month-specific theme hero image, clean white and slate calendar grid, and simulated spiral binding.
*   **Day Range Selection**: Interactively select start and end dates with soft colored range fills, visually linking endpoints. Features dynamic summaries of your selection.
*   **Smart Notes System**: Multi-tab panel to take both general month notes and range-specific notes. Persists to local storage instantly.
*   **Theme Switching Engine**: Instantly switch accent colors between Blue, Emerald, Rose, and Purple.
*   **Holiday Integration**: Public US holidays recognized and highlighted with small dot indicators and hover tooltips.
*   **Micro-interactions & Animations**: Page curl animations when changing months, transform hovers, and clean transition states.
*   **Mini Month Summaries**: See full read-only previous/next months at a glance at the bottom of the grid.
*   **Fully Accessible**: ARIA labels, semantic markup, and comprehensive keyboard support (Arrow keys for routing, Esc to clear range).
*   **Responsive**: Stacked vertically on mobile, side-by-side gracefully opening on desktop.

## 🛠️ Technology Stack

*   **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Date Formatting**: [date-fns](https://date-fns.org/)
*   **State Management**: React Hooks (`useState`, `useCallback`, `useMemo`, `useEffect`)
*   **Storage**: Browser `localStorage` API (Zero backend coupling)

## 📁 Architectural Decisions

1.  **Component Modularity**: Separated responsibilities into focused child components (`DayCell`, `NotesPanel`, `MonthHero`, etc.) to keep the main `CalendarGrid` orchestrator clean.
2.  **Date Maths Delegate**: Relied heavily on `date-fns` for accurate math surrounding overlaps, next/prev month jumps, offsets, and string formatting, preventing manual timestamp calculations.
3.  **Local Storage Sync**: `useEffect` synchronization pattern used to seamlessly bind text areas to browser storage using predictable `note-month-{yyyy-MM}` and `note-range-{date}-{date}` keys.
4.  **CSS v4 Features**: Embraced Tailwind v4 `@theme` block in `index.css` over extensive `tailwind.config.ts`, directly binding data-attributes to CSS custom properties for instant context-aware theming.

## 🚀 Setup Instructions

Ensure you have Node.js and npm installed.

1.  Clone this repository or download the ZIP.
2.  Navigate into the project directory:
    ```bash
    cd tuf-frontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

Navigate to `http://localhost:5173/` to view the calendar.

## 📝 License
MIT
