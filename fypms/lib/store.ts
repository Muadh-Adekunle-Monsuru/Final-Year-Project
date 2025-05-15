import { create } from 'zustand';

interface cardState {
	isEditable: boolean;
	setEditable: () => void;
}

export const useBearStore = create<cardState>()((set) => ({
	isEditable: false,
	setEditable: () => set((state) => ({ isEditable: !state.isEditable })),
}));
