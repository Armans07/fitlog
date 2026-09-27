import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card group flex flex-col transition hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="relative h-44 w-full overflow-hidden bg-white/5">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-wide">
          {workout.name}
        </h3>

        <p className="text-sm text-white/60">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 border-t border-line pt-3">
          <span className="stat-icon">
            <Clock size={14} /> {workout.duration} min
          </span>
          <span className="stat-icon">
            <Flame size={14} /> {workout.caloriesBurned} kcal
          </span>
          <span className="stat-icon">
            <Star size={14} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
