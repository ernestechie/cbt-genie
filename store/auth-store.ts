/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthStep } from "@/constants/auth";
import { create } from "zustand";

type State = {
  userData: any;
  authStep: AuthStep | null;
};

type Action = {
  setAuthStep: (step: AuthStep) => void;
  updateUserData: (user: any) => void;
};

export const useAuthStore = create<State & Action>((set) => ({
  userData: null,
  authStep: null,
  setAuthStep: (step) => set(() => ({ authStep: step })),
  updateUserData: (user) => set(() => ({ userData: user })),
}));
