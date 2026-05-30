import { useRef, useEffect } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useTerminalDimensions } from "@opentui/react";
import { getFilteredCommands } from "../command/filterCommand";
import type { KeyEvent } from "@opentui/core";

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

import { useCliStore } from "../store/cliStore";

interface InputPromptProps {
    scrollRef: React.RefObject<any>;
    onExit: () => void | Promise<void>;
}

function InputPrompt({
    scrollRef,
    onExit
}: InputPromptProps) {
    const inputValue = useCliStore((state) => state.inputValue);
    const setInputValue = useCliStore((state) => state.setInputValue);
    const currentIndex = useCliStore((state) => state.currentIndex);
    const setCurrentIndex = useCliStore((state) => state.setCurrentIndex);
    const textareaRef = useRef<TextareaRenderable>(null);
    const { height } = useTerminalDimensions();

    const inputHeight = height <= 26 ? 3 : 5;
    const filteredCommands = getFilteredCommands(inputValue);

    // Synchronize scroll position of the command menu viewport with the keyboard navigation state
    useEffect(() => {
        if (inputValue.startsWith("/") && filteredCommands.length > 0) {
            const selectedCommand = filteredCommands[currentIndex];
            if (selectedCommand) {
                scrollRef.current?.scrollChildIntoView("cmd-" + selectedCommand.name);
            }
        }
    }, [currentIndex, filteredCommands, inputValue, scrollRef]);

    const handleContentChange = () => {
        const text = textareaRef.current?.plainText || "";
        setInputValue(text);
        
        // Reset selected index if it is out of bounds for the filtered results
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
            } else if (key.name === "tab") {
                const selectedCommand = filteredCommands[currentIndex];
                if (selectedCommand) {
                    key.preventDefault();
                    textareaRef.current?.setText(selectedCommand.value);
                    setInputValue(selectedCommand.value);
                    if (textareaRef.current) {
                        textareaRef.current.cursorOffset = selectedCommand.value.length;
                    }
                }
            } else if (key.name === "return" || key.name === "enter") {
                const selectedCommand = filteredCommands[currentIndex];
                if (selectedCommand) {
                    key.preventDefault();
                    
                    // Clear the textarea and state
                    textareaRef.current?.clear();
                    setInputValue("");
                    setCurrentIndex(0);

                    // Execute action
                    if (selectedCommand.action) {
                        selectedCommand.action({
                            exit: onExit
                        });
                    }
                }
            }
        }
    };

    const handleSubmit = () => {
        const isMenuVisible = inputValue.startsWith("/");
        if (isMenuVisible && filteredCommands.length > 0) {
            const selectedCommand = filteredCommands[currentIndex];
            if (selectedCommand) {
                textareaRef.current?.clear();
                setInputValue("");
                setCurrentIndex(0);
                if (selectedCommand.action) {
                    selectedCommand.action({
                        exit: onExit
                    });
                }
                return;
            }
        }

        const text = textareaRef.current?.plainText;
        if (text && text.trim()) {
            // Process standard text submission
            textareaRef.current?.clear();
            setInputValue("");
        }
    };

    return (
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
    );
}

export default InputPrompt;