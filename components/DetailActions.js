"use client";

import { Plus, Bookmark } from "lucide-react";
import { usePlan } from "./PlanProvider";

export default function DetailActions({ workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, plan, PLAN_LIMIT } =
    usePlan();

  const alreadyPlanned = isInPlan(workout.id);
  const planFull = plan.length >= PLAN_LIMIT && !alreadyPlanned;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={alreadyPlanned || planFull}
        className="btn-primary"
      >
        <Plus size={18} />
        {alreadyPlanned ? "Already In Plan" : "Add To Today's Plan"}
      </button>

      <button
        type="button"
        onClick={() => addToSaved(workout)}
        disabled={isSaved(workout.id)}
        className="btn-secondary"
      >
        <Bookmark size={18} />
        {isSaved(workout.id) ? "Saved" : "Save For Later"}
      </button>
    </div>
  );
}
