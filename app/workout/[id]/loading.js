export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
      <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
        Loading workout…
      </p>
    </div>
  );
}
