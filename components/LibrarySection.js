"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";

const SORT_KEYS = {
  duration: "duration",
  calories: "caloriesBurned",
  rating: "rating",
};

export default function LibrarySection({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");

  const sorted = useMemo(() => {
    const key = SORT_KEYS[sortBy];
    return [...workouts].sort((a, b) => b[key] - a[key]);
  }, [workouts, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-white/60">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
