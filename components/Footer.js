import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-base">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black">
            <Dumbbell size={16} strokeWidth={2.5} />
          </span>
          FitLog
        </div>
        <p className="text-center text-sm text-white/50 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
