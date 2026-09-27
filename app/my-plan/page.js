"use client";

import { useMemo, useState } from "react";
import { usePlan } from "@/components/PlanProvider";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import EmptyState from "@/components/EmptyState";
import SortDropdown from "@/components/SortDropdown";

const SORT_KEYS = {
  duration: "duration",
  calories: "caloriesBurned",
  rating: "rating",
};

export default function MyPlanPage() {
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, toggleDone } =
    usePlan();

  const list = tab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    const key = SORT_KEYS[sortBy];
    return [...list].sort((a, b) => b[key] - a[key]);
  }, [list, sortBy]);

  const totals = plan.reduce(
    (acc, w) => {
      acc.minutes += w.duration;
      acc.calories += w.caloriesBurned;
      return acc;
    },
    { minutes: 0, calories: 0 }
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-white/60">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="card mt-8 grid grid-cols-3 divide-x divide-line">
        <Stat label="Exercises" value={plan.length} highlight />
        <Stat label="Minutes" value={totals.minutes} />
        <Stat label="Calories" value={totals.calories} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="seg-tabs">
          <button
            type="button"
            onClick={() => setTab("plan")}
            className={tab === "plan" ? "seg-tab-active" : "seg-tab-inactive"}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setTab("saved")}
            className={tab === "saved" ? "seg-tab-active" : "seg-tab-inactive"}
          >
            Saved
          </button>
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {!loaded ? (
          <p className="py-16 text-center text-sm font-semibold uppercase tracking-wide text-white/50">
            Loading workouts…
          </p>
        ) : sortedList.length === 0 ? (
          <EmptyState />
        ) : (
          sortedList.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              showDoneButton={tab === "plan"}
              onToggleDone={toggleDone}
              onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className="flex flex-col items-start gap-1 px-6 py-5">
      <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
        {label}
      </span>
      <span
        className={`font-display text-2xl font-bold sm:text-3xl ${
          highlight ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
