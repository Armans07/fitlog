"use client";

import { ChevronDown } from "lucide-react";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <span className="mr-2 text-sm font-semibold text-white/60">Sort By</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-full border border-line bg-panel py-2 pl-4 pr-9 text-sm font-semibold text-white outline-none focus:border-accent"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
        />
      </div>
    </div>
  );
}
