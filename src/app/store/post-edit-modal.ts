import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const usePostEditModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "posteditmodalstore" },
  ),
);

export const useOpenPostEditModal = () => {
  const open = usePostEditModalStore((state) => state.actions.open);
  return open;
};

export const useClosePostEditModal = () => {
  const close = usePostEditModalStore((state) => state.actions.close);
  return close;
};

export const usePostEditModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditModalStore();
  return { isOpen, open, close };
};
