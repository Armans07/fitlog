import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/data";
import DetailActions from "@/components/DetailActions";

const SPEC_ROWS = [
  { label: "Equipment", key: "equipment" },
  { label: "Difficulty", key: "difficulty" },
  { label: "Sets", key: "sets" },
  { label: "Reps", key: "reps" },
  { label: "Duration", key: "duration", suffix: " min" },
  { label: "Calories", key: "caloriesBurned", suffix: " kcal" },
  { label: "Rating", key: "rating" },
];

export default async function WorkoutDetailPage({ params }) {
  const workout = await getWorkoutById(params.id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-white/5 sm:h-96 lg:h-full lg:min-h-[480px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-4 text-white/60">{workout.description}</p>

          <div className="card mt-8 overflow-hidden">
            {SPEC_ROWS.map((row, index) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-3 text-sm ${
                  index % 2 === 1 ? "bg-white/[0.03]" : ""
                }`}
              >
                <span className="font-semibold uppercase tracking-wide text-white/50">
                  {row.label}
                </span>
                <span className="font-semibold text-white">
                  {workout[row.key]}
                  {row.suffix || ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-4 flex flex-col gap-4">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">
                    {index + 1}
                  </span>
                  <span className="text-white/80">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
