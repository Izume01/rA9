import { create } from 'zustand';
import { ToastType, Toast } from './type';

export interface ActiveToast extends Toast {
    id: string;
    duration: number;
}

interface ToastStoreState {
    toasts: ActiveToast[];
    addToast: (toast: Toast) => string;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStoreState>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const duration = toast.duration ?? 3000;
        
        set((state) => ({
            toasts: [...state.toasts, { ...toast, id, duration }]
        }));
        
        return id;
    },
    removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
    }))
}));

export const toast = {
    show: (message: string, variant: ToastType = 'info', duration?: number) => {
        return useToastStore.getState().addToast({ message, variant, duration });
    },
    success: (message: string, duration?: number) => {
        return useToastStore.getState().addToast({ message, variant: 'success', duration });
    },
    error: (message: string, duration?: number) => {
        return useToastStore.getState().addToast({ message, variant: 'error', duration });
    },
    info: (message: string, duration?: number) => {
        return useToastStore.getState().addToast({ message, variant: 'info', duration });
    },
    dismiss: (id: string) => {
        useToastStore.getState().removeToast(id);
    }
};
