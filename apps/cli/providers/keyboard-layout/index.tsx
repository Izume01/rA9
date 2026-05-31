import { create } from "zustand";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef
} from "react";
import { useKeyboard, useRenderer } from "@opentui/react";


type Responder = () => boolean;

type KeyboardLayoutContextValue = {
  stack: string[];
  responders: Map<string, Responder>;
  push: (id: string, responder?: Responder) => void;
  pop: (id: string) => void;
  isTopLayer: (id: string) => boolean;
  setResponder: (id: string, responder: Responder | null) => void;
}

export const useKeyboardLayoutStore = create<KeyboardLayoutContextValue>((set) => ({
  stack: ["base"],
  responders: new Map(),

  push: (id: string, responder?: Responder) => {
    const { stack, responders } = useKeyboardLayoutStore.getState();
    if (responder) {
      responders.set(id, responder);
    }
    if (stack.includes(id)) return;
    set({ stack: [...stack, id] });
  },
  pop: (id: string) => {
    const { stack, responders } = useKeyboardLayoutStore.getState();
    responders.delete(id);
    set({ stack: stack.filter((item) => item !== id) });
  },
  isTopLayer: (id: string) => {
    const { stack } = useKeyboardLayoutStore.getState();

    if (stack.length === 0) return false;

    if (stack[stack.length - 1] === id) {
      return true;
    }
    return false;
  },
  setResponder: (id: string, responder: Responder | null) => {
    const { responders } = useKeyboardLayoutStore.getState();
    if (responder) {
      responders.set(id, responder);
    } else {
      responders.delete(id);
    }
  },
}))

export const KeyboardLayoutProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const renderer = useRenderer();

  useKeyboard((event) => {
    if (!event.ctrl || event.name !== "c") return;

    // Retrieve the absolute latest stack and responders to avoid stale closures
    const { stack, responders } = useKeyboardLayoutStore.getState();

    for (let i = stack.length - 1; i >= 0; i--) {
      const id = stack[i];
      const responder = responders.get(id);

      if (responder && responder()) {
        return;
      }
    }
    renderer.destroy();
  })
  return <>{children}</>;
}

export function useKeyboardLayout() {
  const { push, pop, isTopLayer, setResponder } = useKeyboardLayoutStore();

  return {
    push,
    pop,
    isTopLayer,
    setResponder
  };
}