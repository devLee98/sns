import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CreateMode = {
  type: "CREATE";
  isOpen: true;
};

type EditMode = {
  type: "EDIT";
  isOpen: true;
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type CloseState = {
  isOpen: false;
};

type OpenState = CreateMode | EditMode;

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const usePostEditModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => set({ type: "CREATE", isOpen: true }),
        openEdit: (params: Omit<EditMode, "isOpen" | "type">) =>
          set({ type: "EDIT", isOpen: true, ...params }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "posteditmodalstore" },
  ),
);

export const useOpenCreatePostEditModal = () => {
  const openCreate = usePostEditModalStore((state) => state.actions.openCreate);
  return openCreate;
};

export const useOpenEditPostEditModal = () => {
  const openEdit = usePostEditModalStore((state) => state.actions.openEdit);
  return openEdit;
};

export const useClosePostEditModal = () => {
  const close = usePostEditModalStore((state) => state.actions.close);
  return close;
};

// export const usePostEditModal = () => {
//   const {
//     isOpen,
//     actions: { openCreate, openEdit, close },
//   } = usePostEditModalStore();
//   return { isOpen, openCreate, openEdit, close };
// };

export const usePostEditModal = () => {
  const store = usePostEditModalStore();
  return store as typeof store & State;
};
