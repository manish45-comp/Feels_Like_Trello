import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (task) =>
          set((state) => ({ tasks: [...state.tasks, task] }), false, "addTask"),
        removeTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          })),
        setDragTask: (id) => set({ draggedTask: id }),
        moveTask: (id, status) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, status } : task
            ),
          })),
      }),
      {
        name: "tasks-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
