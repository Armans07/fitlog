import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">
        Nothing Here Yet
      </h3>
      <p className="max-w-xs text-sm text-white/50">
        Browse the library and add a lift to get today moving.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Go To Workouts
      </Link>
    </div>
  );
}
