export type ToastType = 'success' | 'error' | 'info' ; 

export interface Toast {
    message: string;
    variant: ToastType;
    duration?: number; 
}

export const defaultDuration = 3000;
