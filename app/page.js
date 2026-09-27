import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllWorkouts } from "@/lib/data";
import LibrarySection from "@/components/LibrarySection";

export default async function HomePage() {
  const workouts = await getAllWorkouts();

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Workout Library
            </p>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide sm:text-5xl lg:text-6xl">
              Train With Intent.
              <br />
              Log Every Set.
            </h1>
            <p className="mt-6 max-w-md text-white/60">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add
              up.
            </p>
            <a href="#library" className="btn-primary mt-8">
              Browse Workouts
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-white/5 sm:h-80 lg:h-[420px]">
            <Image
              src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
              alt="Athlete training with a barbell"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <LibrarySection workouts={workouts} />
    </>
  );
}
