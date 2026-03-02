import { create } from "zustand";
import { persist } from "zustand/middleware";


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
