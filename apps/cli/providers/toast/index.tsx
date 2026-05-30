import { useToastStore } from './toast-store';
import type { ToastType } from './type';
import { defaultDuration } from './type';
import { useTerminalDimensions } from '@opentui/react';
import { SplitBorderChars } from '../../components/border';

export const toast = {
    show: (message: string, variant: ToastType = 'info', duration?: number) => {
        useToastStore.getState().show({
            message,
            variant,
            duration: duration ?? defaultDuration
        });
    },
    success: (message: string, duration?: number) => {
        toast.show(message, 'success', duration);
    },
    error: (message: string, duration?: number) => {
        toast.show(message, 'error', duration);
    },
    info: (message: string, duration?: number) => {
        toast.show(message, 'info', duration);
    },
    hide: () => {
        useToastStore.getState().hide();
    }
};

export function ToastProvider() {
    const currentToast = useToastStore((state) => state.currentToast);
    const { width } = useTerminalDimensions();

    if (!currentToast) return null;

    const colorVariant = {
        success: "#4CAF50",
        error: "#F44336",
        info: "#2196F3"
    };

    const borderColor = colorVariant[currentToast.variant] || colorVariant.info;

    return (
        <box                                                                                                 
          position="absolute"                                                                                
          justifyContent="center"                                                                            
          alignItems="flex-start"                                                                            
          top={2}                                                                                            
          right={2}                                                                                          
          width={Math.max(1, Math.min(60, width - 6))}                                                       
          paddingLeft={2}                                                                                    
          paddingRight={2}                                                                                   
          paddingTop={1}                                                                                     
          paddingBottom={1}                                                                                  
          backgroundColor="#1A1A24"                                                                   
          borderColor={borderColor}                                                                          
          border={["left", "right"]}                                                                         
          customBorderChars={SplitBorderChars}                                                               
        >                                                                                                    
          <box flexDirection="column" gap={1} width="100%">                                                  
            <text fg="#E1E1E1" wrapMode="word" width="100%">                                                 
              {currentToast.message}                                                                         
            </text>                                                                                          
          </box>                                                                                             
        </box>  
    );
}
