"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";

export default function PlanWorkoutCard({
  workout,
  onRemove,
  onToggleDone,
  showDoneButton,
}) {
  return (
    <div
      className={`card flex flex-col gap-4 p-4 sm:flex-row sm:items-center ${
        workout.done ? "opacity-50" : ""
      }`}
    >
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-white/5 sm:w-28">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wide">
          {workout.name}
          {workout.done && (
            <span className="ml-2 text-xs font-semibold text-accent">
              DONE
            </span>
          )}
        </h3>
        <p className="text-sm text-white/50">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4">
          <span className="stat-icon">
            <Clock size={13} /> {workout.duration} min
          </span>
          <span className="stat-icon">
            <Flame size={13} /> {workout.caloriesBurned} kcal
          </span>
          <span className="stat-icon">
            <Star size={13} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-white/10"
        >
          View Details
        </Link>

        {showDoneButton && (
          <button
            type="button"
            onClick={() => onToggleDone(workout.id)}
            className="flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-black hover:brightness-110"
          >
            <Check size={14} />
            Mark As Done
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          aria-label="Remove"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
