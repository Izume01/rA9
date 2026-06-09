import { useRef, useEffect } from "react";
import Header from "./components/Header";
import Statusbar from "./components/Statusbar";
import InputPrompt from "./components/InputPrompt";
import { useCommandMenu } from "./command/index";
import { toast } from "./providers/toast";
import { useKeyboardLayoutStore } from "./providers/keyboard-layout";
import { useDialogStore } from "./providers/dialog";
import { useTheme } from "./providers/theme";
import { ExitConfirmDialog } from "./components/ExitConfirmDialog";

interface AppProps {
    onExit: () => Promise<void> | void;
}

export default function App({ onExit }: AppProps) {
    const scrollRef = useRef<any>(null);
    const { colorTheme: colors } = useTheme();

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
                        onExit={onExit}
                    />
                    <Statusbar />
                </box>
            </box>
        </box>
    );
}
