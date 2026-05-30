import { create } from 'zustand';
import type { Toast, ToastType } from './type';
import { defaultDuration } from './type';

export interface ToastStore {
    currentToast: Toast | null;
    show: (options: Toast) => void;
    hide: () => void;
}

let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastStore>((set) => ({
    currentToast: null,
    show: (options: Toast) => {
        const duration = options.duration ?? defaultDuration;

        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }

        set({ currentToast: options });

        const handle = setTimeout(() => {
            set({ currentToast: null });
            timeoutHandle = null;
        }, duration);

        (handle as unknown as { unref?: () => void }).unref?.();
        timeoutHandle = handle;
    },
    hide: () => {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }
        set({ currentToast: null });
    }
}))