import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Global organization state.
 * Persists selected organization across page reloads.
 */
export const useOrganizationStore = create(
  persist(
    (set) => ({
      organizationId: null,

      setOrganizationId: (id) => set({ organizationId: id }),

      clearOrganizationId: () => set({ organizationId: null }),
    }),
    {
      name: "organization-storage", // localStorage key
    },
  ),
);
