import { create } from "zustand";

export interface ModalStoreInterface {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const useSettingsModal = create<ModalStoreInterface>((set) => ({
    userId: undefined,
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false })
}))

export default useSettingsModal