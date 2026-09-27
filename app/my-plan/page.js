"use client";

import { useState } from "react";
import { usePlan } from "@/components/PlanProvider";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import EmptyState from "@/components/EmptyState";

export default function MyPlanPage() {
  const [tab, setTab] = useState("plan");
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, toggleDone } =
    usePlan();

  const list = tab === "plan" ? plan : saved;

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

      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatCard label="Exercises" value={plan.length} />
        <StatCard label="Minutes" value={totals.minutes} />
        <StatCard label="Calories" value={totals.calories} />
      </div>

      <div className="mt-10 flex gap-2 border-b border-line">
        <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
          Today&apos;s Plan
        </TabButton>
        <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
          Saved
        </TabButton>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {!loaded ? (
          <p className="py-16 text-center text-sm font-semibold uppercase tracking-wide text-white/50">
            Loading workouts…
          </p>
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          list.map((workout) => (
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

function StatCard({ label, value }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-1 py-6">
      <span className="font-display text-3xl font-bold text-accent">
        {value}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
        {label}
      </span>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
        active
          ? "border-b-2 border-accent text-accent"
          : "text-white/50 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
