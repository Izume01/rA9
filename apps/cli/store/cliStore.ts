import {create} from 'zustand'

interface CliStore {
    inputValue : string
    setInputValue : (value: string) => void
    currentIndex : number
    setCurrentIndex : (index: number | ((prev: number) => number)) => void
    reset : () => void
}

const initialState = {
    inputValue: "",
    currentIndex: 0
}

export const useCliStore = create<CliStore>()((set) => ({
    ...initialState,
    setInputValue: (value) => set({ inputValue: value }),
    setCurrentIndex: (index) => set((state) => ({
        currentIndex: typeof index === "function" ? index(state.currentIndex) : index
    })),
    reset: () => set(initialState)
}))
