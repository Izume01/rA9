import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { useRef, useEffect } from "react";
import Header from "./components/Header";
import Statusbar from "./components/Statusbar";
import InputPrompt from "./components/InputPrompt";
import { useCommandMenu } from "./command/index";
import { ToastProvider, toast } from "./providers/toast";
import { KeyboardLayoutProvider, useKeyboardLayoutStore } from "./providers/keyboard-layout";
import { DialogProvider, useDialogStore } from "./providers/dialog";
import { useTheme } from "./providers/theme/theme-store";
import { ExitConfirmDialog } from "./components/ExitConfirmDialog";

function App() {
    const scrollRef = useRef<any>(null);
    const { colorTheme: colors } = useTheme();

    const cleanExit = async () => {
        await cleanup();
        process.exit(0);
    };

    useEffect(() => {
        toast.success("RA9 Code Terminal ready!");

        useKeyboardLayoutStore.getState().setResponder("base", () => {
            useDialogStore.getState().open({
                title: "Exit Application",
                children: <ExitConfirmDialog onConfirm={cleanExit} />,
            });
            return true;
        });
    }, []);

    const commandMenu = useCommandMenu({
        onSelect: () => {},
        onExecute: () => {},
        scrollRef
    });

    return (
        <box
            width="100%"
            height="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors.background}
            gap={2}
        >
            <Header />
            <ToastProvider />
            <box flexDirection="column" alignItems="center">
                {commandMenu && (
                    <box width={80}>
                        {commandMenu}
                    </box>
                )}
                <box
                    backgroundColor={colors.surface}
                    padding={1}
                    paddingLeft={2}
                    border={["left"]}
                    borderColor={colors.primary}
                    width={80}
                    flexDirection="column"
                    alignItems="flex-start"
                >
                    <InputPrompt 
                        scrollRef={scrollRef}
                        onExit={cleanExit}
                    />
                    <Statusbar />
                </box>
            </box>
        </box>
    );
}

const renderer = await createCliRenderer({ exitOnCtrlC: false });
const root = createRoot(renderer);

// Cleanup function for graceful shutdown
const cleanup = async () => {
    try {
        root.unmount();
        renderer.destroy();
    } catch (error) {
        // Ignore cleanup errors
    }
};

process.on('SIGTERM', async () => {
    await cleanup();
    process.exit(0);
});

root.render(
    <KeyboardLayoutProvider>
        <DialogProvider>
            <App />
        </DialogProvider>
    </KeyboardLayoutProvider>
);
