import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { useRef, useEffect } from "react";
import Header from "./components/Header";
import Statusbar from "./components/Statusbar";
import InputPrompt from "./components/InputPrompt";
import { useCommandMenu } from "./command/index";
import { ToastProvider, toast } from "./providers/toast";

function App() {
    const scrollRef = useRef<any>(null);

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
            backgroundColor={"#0D0D12"}
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
                    backgroundColor="#1A1A24"
                    padding={1}
                    paddingLeft={2}
                    border={["left"]}
                    borderColor="#90e0ef"
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
    await cleanup();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await cleanup();
    process.exit(0);
});

root.render(<App />);
