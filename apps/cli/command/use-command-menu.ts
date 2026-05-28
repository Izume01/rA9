import { useRef, useState, useCallback } from "react";
import type { KeyEvent, TextareaRenderable } from "@opentui/core";
import { getFilteredCommands } from "./filterCommand";
import type { TypeCommand } from "./type";

interface UseCommandMenuOptions {
    textareaRef: React.RefObject<TextareaRenderable | null>;
    onCommandExecute?: (command: TypeCommand, args?: string) => void;
}

export function useCommandMenuLogic({ textareaRef, onCommandExecute }: UseCommandMenuOptions) {
    const scrollRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const getCommandAndArgs = (text: string): { command: string; args: string } => {
        const trimmed = text.trim();
        const spaceIndex = trimmed.indexOf(" ");

        if (spaceIndex === -1) {
            return { command: trimmed, args: "" };
        }

        return {
            command: trimmed.substring(0, spaceIndex),
            args: trimmed.substring(spaceIndex + 1).trim()
        };
    };

    const { command: currentCommand, args: currentArgs } = getCommandAndArgs(inputValue);
    const filteredCommands = getFilteredCommands(currentCommand);
    const isMenuVisible = currentCommand.startsWith("/");

    const executeCommand = useCallback((command: TypeCommand, args?: string) => {
        textareaRef.current?.clear();
        setInputValue("");
        setCurrentIndex(0);

        if (command.action) {
            try {
                command.action({
                    exit: async () => {
                        // Give the UI time to update before exiting
                        await new Promise(resolve => setTimeout(resolve, 100));
                        process.exit(0);
                    },
                    args
                });
            } catch (error) {
                console.error("Command execution failed:", error);
            }
        }

        onCommandExecute?.(command, args);
    }, [textareaRef, onCommandExecute]);

    const handleContentChange = useCallback(() => {
        const text = textareaRef.current?.plainText || "";
        setInputValue(text);

        setCurrentIndex(prev => {
            const { command } = getCommandAndArgs(text);
            const nextFiltered = getFilteredCommands(command);
            if (prev >= nextFiltered.length) {
                return 0;
            }
            return prev;
        });
    }, [textareaRef]);

    const handleKeyDown = useCallback((key: KeyEvent) => {
        if (!isMenuVisible) return;

        // Handle navigation keys when menu is visible
        if (key.name === "up" || key.name === "down") {
            key.preventDefault();
            if (filteredCommands.length === 0) return;

            if (key.name === "up") {
                setCurrentIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else {
                setCurrentIndex(prev => (prev + 1) % filteredCommands.length);
            }
        } else if (key.name === "return" || key.name === "enter") {
            if (filteredCommands.length === 0) return;

            const selectedCommand = filteredCommands[currentIndex];
            if (selectedCommand) {
                key.preventDefault();
                executeCommand(selectedCommand, currentArgs);
            }
        } else if (key.name === "escape") {
            key.preventDefault();
            textareaRef.current?.clear();
            setInputValue("");
            setCurrentIndex(0);
        } else if (key.name === "tab") {
            if (filteredCommands.length === 0) return;

            key.preventDefault();
            const selectedCommand = filteredCommands[currentIndex];
            if (selectedCommand && textareaRef.current) {
                const newValue = selectedCommand.value + " ";
                textareaRef.current.clear();
                textareaRef.current.insertText(newValue);
                setInputValue(newValue);
            }
        }
    }, [isMenuVisible, filteredCommands, currentIndex, currentArgs, executeCommand, textareaRef]);

    const handleSubmit = useCallback(() => {
        if (isMenuVisible) {
            const selectedCommand = filteredCommands[currentIndex];
            if (selectedCommand) {
                executeCommand(selectedCommand, currentArgs);
                return;
            }
        }

        const text = textareaRef.current?.plainText;
        if (text && text.trim()) {
            textareaRef.current?.clear();
            setInputValue("");
        }
    }, [isMenuVisible, filteredCommands, currentIndex, currentArgs, executeCommand, textareaRef]);

    return {
        inputValue,
        currentIndex,
        filteredCommands,
        isMenuVisible,
        scrollRef,
        handleContentChange,
        handleKeyDown,
        handleSubmit,
    };
}
