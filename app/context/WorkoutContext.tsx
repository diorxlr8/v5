import React, { createContext, useContext, useState } from "react";

export type SelectedWorkout = {
  id: string;
  name: string;
  parts: string[];
  progress: number;
  dateAdded: string;
};

type WorkoutContextType = {
  selectedWorkouts: SelectedWorkout[];
  addWorkout: (
    workout: Omit<SelectedWorkout, "progress" | "dateAdded">,
  ) => void;
  removeWorkout: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [selectedWorkouts, setSelectedWorkouts] = useState<SelectedWorkout[]>(
    [],
  );

  const addWorkout = (
    workout: Omit<SelectedWorkout, "progress" | "dateAdded">,
  ) => {
    // Avoid duplicates
    if (selectedWorkouts.some((w) => w.id === workout.id)) {
      return;
    }
    setSelectedWorkouts((prev) => [
      ...prev,
      {
        ...workout,
        progress: 0,
        dateAdded: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const removeWorkout = (id: string) => {
    setSelectedWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const updateProgress = (id: string, progress: number) => {
    setSelectedWorkouts((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, progress: Math.min(100, progress) } : w,
      ),
    );
  };

  return (
    <WorkoutContext.Provider
      value={{ selectedWorkouts, addWorkout, removeWorkout, updateProgress }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within WorkoutProvider");
  }
  return context;
}
