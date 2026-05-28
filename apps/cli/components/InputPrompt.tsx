import { useRef, useState } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useTerminalDimensions } from "@opentui/react";
import { useCommandMenu } from "../command/index";
import { getFilteredCommands } from "../command/filterCommand";
import type { KeyEvent } from "@opentui/core";
import type { TypeCommand } from "../command/type";

interface Keybinding {
    name: string;
    action: "submit" | "newline";
    shift?: boolean;
}

const KEYBINDINGS_INPUTBOX: Keybinding[] = [
    { name: "enter", action: "submit" },
    { name: "return", action: "submit" },
    { name: "linefeed", action: "newline" },
    { name: "enter", shift: true, action: "newline" },
    { name: "return", shift: true, action: "newline" },
];

const MAX_VISIBLE_COMMANDS = 5;

function InputPrompt() {
    const textareaRef = useRef<TextareaRenderable>(null);
    const scrollRef = useRef(null);
    const { height } = useTerminalDimensions();

    const [inputValue, setInputValue] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const inputHeight = height <= 26 ? 3 : 5;
    const filteredCommands = getFilteredCommands(inputValue);

    const executeCommand = (command: TypeCommand) => {
        textareaRef.current?.clear();
        setInputValue("");
        setCurrentIndex(0);

        if (command.action) {
            try {
                command.action({
                    exit: () => process.exit(0)
                });
            } catch (error) {
                console.error("Command execution failed:", error);
            }
        }
    };

    const handleContentChange = () => {
        const text = textareaRef.current?.plainText || "";
        setInputValue(text);

        setCurrentIndex(prev => {
            const nextFiltered = getFilteredCommands(text);
            if (prev >= nextFiltered.length) {
                return 0;
            }
            return prev;
        });
    };

    const handleKeyDown = (key: KeyEvent) => {
        const isMenuVisible = inputValue.startsWith("/");
        if (isMenuVisible && filteredCommands.length > 0) {
            if (key.name === "up") {
                key.preventDefault();
                setCurrentIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (key.name === "down") {
                key.preventDefault();
                setCurrentIndex(prev => (prev + 1) % filteredCommands.length);
            } else if (key.name === "return" || key.name === "enter") {
                const selectedCommand = filteredCommands[currentIndex];
                if (selectedCommand) {
                    key.preventDefault();
                    executeCommand(selectedCommand);
                }
            }
        }
    };

    const handleSubmit = () => {
        const isMenuVisible = inputValue.startsWith("/");
        if (isMenuVisible && filteredCommands.length > 0) {
            const selectedCommand = filteredCommands[currentIndex];
            if (selectedCommand) {
                executeCommand(selectedCommand);
                return;
            }
        }

        const text = textareaRef.current?.plainText;
        if (text && text.trim()) {
            textareaRef.current?.clear();
            setInputValue("");
        }
    };

    const commandMenu = useCommandMenu({
        inputValue,
        onSelect: () => {},
        onExecute: () => {},
        currentIndex,
        scrollRef
    });

    const menuHeight = Math.min(filteredCommands.length, MAX_VISIBLE_COMMANDS);

    return (
        <box flexDirection="column" width="100%" position="relative">
            {commandMenu && (
                <box
                    position="absolute"
                    top={-(menuHeight + 1)}
                    left={-3}
                    width="100%"
                >
                    {commandMenu}
                </box>
            )}
            <textarea
                ref={textareaRef}
                width="100%"
                height={inputHeight}
                keyBindings={KEYBINDINGS_INPUTBOX}
                focused={true}
                placeholder="Ask anything... 'Fix a bug in the database'"
                onSubmit={handleSubmit}
                onContentChange={handleContentChange}
                onKeyDown={handleKeyDown}
            />
        </box>
    );
}

export default InputPrompt;