// Small helper functions that talk to the FitLog API.
// If the main API ever goes down, we fall back to the alternative one.

const MAIN_API = "https://api.abcz.workers.dev/api/fitlog";
const BACKUP_API = "https://api.api-store.workers.dev/api/fitlog";

export async function getAllWorkouts() {
  try {
    const res = await fetch(MAIN_API, { cache: "no-store" });
    if (!res.ok) throw new Error("main api failed");
    return await res.json();
  } catch (err) {
    const res = await fetch(BACKUP_API, { cache: "no-store" });
    return await res.json();
  }
}

export async function getWorkoutById(id) {
  try {
    const res = await fetch(`${MAIN_API}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("main api failed");
    return await res.json();
  } catch (err) {
    const res = await fetch(`${BACKUP_API}/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  }
}
