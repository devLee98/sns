import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = CloseState | OpenState;

type CloseState = {
  isOpen: false;
};

type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive: () => void;
  onNegative?: () => void;
};

const initialState = {
  isOpen: false,
} as State;

const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (params: Omit<OpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "alertmodalstore" },
  ),
);

export const useOpenAlertModal = () => {
  const open = useAlertModalStore((state) => state.actions.open);
  return open;
};

export const useCloseAlertModal = () => {
  const close = useAlertModalStore((state) => state.actions.close);
  return close;
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  return store as typeof store & State;
};
