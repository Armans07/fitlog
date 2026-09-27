"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext(null);

const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-plan-data";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load whatever was saved last time, as soon as we're in the browser.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPlan(parsed.plan || []);
        setSaved(parsed.saved || []);
      }
    } catch (err) {
      // if localStorage is broken for some reason, just start fresh
    }
    setLoaded(true);
  }, []);

  // Whenever plan/saved changes, write it back to localStorage.
  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ plan, saved })
    );
  }, [plan, saved, loaded]);

  function isInPlan(id) {
    return plan.some((w) => w.id === id);
  }

  function isSaved(id) {
    return saved.some((w) => w.id === id);
  }

  function addToPlan(workout) {
    if (isInPlan(workout.id)) {
      toast("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      toast.error("Today's plan is full (max 5 lifts)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  }

  function addToSaved(workout) {
    if (isSaved(workout.id)) {
      toast("Already saved");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from plan");
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from saved");
  }

  function toggleDone(id) {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    toast.success("Nice work! Marked as done");
  }

  const value = {
    plan,
    saved,
    loaded,
    isInPlan,
    isSaved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    PLAN_LIMIT,
  };

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used inside a PlanProvider");
  }
  return ctx;
}
