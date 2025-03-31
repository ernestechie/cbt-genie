import { create } from "zustand";

type State = {
  sidebarCollapsed: boolean;
};

type Action = {
  toggleSidebarCollapse: () => void;
};

export const useDashboardStore = create<State & Action>((set) => ({
  sidebarCollapsed: false,
  toggleSidebarCollapse: () =>
    set(({ sidebarCollapsed }) => ({ sidebarCollapsed: !sidebarCollapsed })),
}));
