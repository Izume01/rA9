import { useEffect } from "react";
import { Outlet } from "react-router";
import { ToastProvider, toast } from "../providers/toast";
import { DialogProvider, useDialogStore } from "../providers/dialog";
import { KeyboardLayoutProvider, useKeyboardLayoutStore } from "../providers/keyboard-layout";
import { ThemeProvider } from "../providers/theme";
import { ThemedRoot } from "./themed-root";
import { ExitConfirmDialog } from "../components/ExitConfirmDialog";

function GlobalEffects({ onExit }: { onExit: () => void }) {
  useEffect(() => {
    toast.success("RA9 Code Terminal ready!");

    useKeyboardLayoutStore.getState().setResponder("base", () => {
      useDialogStore.getState().open({
        title: "Exit Application",
        children: <ExitConfirmDialog onConfirm={onExit} />,
      });
      return true;
    });
  }, [onExit]);
  return null;
}

export default function RootLayout({ onExit }: { onExit?: () => void }) {
  return (
    <ThemeProvider>
      <KeyboardLayoutProvider>
        <DialogProvider>
          <ToastProvider />
          {onExit && <GlobalEffects onExit={onExit} />}
          <ThemedRoot>
            <Outlet context={{ onExit }} />
          </ThemedRoot>
        </DialogProvider>
      </KeyboardLayoutProvider>
    </ThemeProvider>
  );
}