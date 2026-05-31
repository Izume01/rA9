import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { useRef, useEffect } from "react";
import Header from "./components/Header";
import Statusbar from "./components/Statusbar";
import InputPrompt from "./components/InputPrompt";
import { useCommandMenu } from "./command/index";
import { ToastProvider, toast } from "./providers/toast";
import { KeyboardLayoutProvider, useKeyboardLayoutStore } from "./providers/keyboard-layout";
import { DialogProvider } from "./providers/dialog";
import { useTheme } from "./providers/theme/theme-store";

function App() {
    const scrollRef = useRef<any>(null);
    const { colorTheme: colors } = useTheme();

    useEffect(() => {
        // Trigger a beautiful success toast on startup to verify it works
        toast.success("RA9 Code Terminal ready!");
    }, []);

    const cleanExit = async () => {
        await cleanup();
        process.exit(0);
    };

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

const renderer = await createCliRenderer();
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

// Handle Ctrl+C and other termination signals
process.on('SIGINT', async () => {
    const { stack, responders } = useKeyboardLayoutStore.getState();
    for (let i = stack.length - 1; i >= 0; i--) {
        const id = stack[i];
        const responder = responders.get(id);
        if (responder && responder()) {
            return;
        }
    }
    await cleanup();
    process.exit(0);
});

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
