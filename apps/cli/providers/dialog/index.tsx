import { create } from "zustand";
import React from "react";
import type { ReactNode } from "react";
import { TextAttributes, RGBA } from "@opentui/core";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";
import type { DialogConfig } from "./type";
import { useKeyboardLayoutStore } from "../keyboard-layout";
import { useTheme } from "../theme/theme-store";

export type DialogContextValue = {
  open: (config: DialogConfig) => void;
  close: () => void;
};

interface DialogState {
  currentDialog: DialogConfig | null;
  open: (config: DialogConfig) => void;
  close: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  currentDialog: null,
  open: (config) => {
    set({ currentDialog: config });
    
    // Register the dialog to the keyboard layer stack
    useKeyboardLayoutStore.getState().push("dialog", () => {
      useDialogStore.getState().close();
      return true;
    });
  },
  close: () => {
    set({ currentDialog: null });
    
    // Remove the dialog from the keyboard layer stack
    useKeyboardLayoutStore.getState().pop("dialog");
  },
}));

export function useDialog(): DialogContextValue {
  const open = useDialogStore((state) => state.open);
  const close = useDialogStore((state) => state.close);

  return {
    open,
    close,
  };
}

type DialogProviderProps = {
  children: ReactNode;
};

export function DialogProvider({ children }: DialogProviderProps) {
  return (
    <>
      {children}
      <Dialog />
    </>
  );
}

function Dialog() {
  const currentDialog = useDialogStore((state) => state.currentDialog);
  const close = useDialogStore((state) => state.close);
  
  // Reactively track if the dialog is the top active keyboard layer
  const isTopLayer = useKeyboardLayoutStore((state) => {
    const stack = state.stack;
    return stack.length === 0 || stack[stack.length - 1] === "dialog";
  });
  
  const dimensions = useTerminalDimensions();
  const { colorTheme: colors } = useTheme();

  useKeyboard((key) => {
    if (!currentDialog || !isTopLayer) return;

    if (key.name === "escape") {
      close();
    }
  });

  if (!currentDialog) {
    return null;
  }

  const { title, children } = currentDialog;

  return (
    <box
      position="absolute"
      left={0}
      top={0}
      width={dimensions.width}
      height={dimensions.height}
      justifyContent="center"
      alignItems="center"
      backgroundColor={RGBA.fromInts(0, 0, 0, 150)}
      zIndex={100}
      onMouseDown={() => close()}
    >
      <box
        width={Math.min(60, dimensions.width - 4)}
        height="auto"
        backgroundColor={colors.dialogSurface}
        paddingX={4}
        paddingY={1}
        flexDirection="column"
        gap={1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <box
          paddingBottom={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <text attributes={TextAttributes.BOLD}>{title}</text>
          <text attributes={TextAttributes.DIM} onMouseDown={() => close()}>
            esc
          </text>
        </box>
        <box flexGrow={1}>{children}</box>
      </box>
    </box>
  );
}
