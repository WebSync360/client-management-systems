import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UIState {
  // Sidebar State
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebar: (state: boolean) => void;

  // Search/Command Palette State
  isCommandPaletteOpen: boolean;
  setCommandPalette: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Defaults
      isSidebarCollapsed: false,
      isCommandPaletteOpen: false,

      // Actions: Intent-based naming
      toggleSidebar: () => 
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      
      setSidebar: (open: boolean) => 
        set({ isSidebarCollapsed: !open }),

      setCommandPalette: (open: boolean) => 
        set({ isCommandPaletteOpen: open }),
    }),
    {
      name: "ops-system-ui-storage", // Unique key in LocalStorage
      storage: createJSONStorage(() => localStorage),
      // PARTIALIZE: We only want to persist the sidebar state, 
      // not the search palette state (which should reset on refresh).
      partialize: (state) => ({ isSidebarCollapsed: state.isSidebarCollapsed }),
    }
  )
);