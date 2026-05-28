import { useRef } from "react";
import type { TextareaRenderable } from "@opentui/core";
import { useTerminalDimensions } from "@opentui/react";

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

function InputPrompt() {
    const textareaRef = useRef<TextareaRenderable>(null);
    const { height } = useTerminalDimensions();

    const inputHeight = height <= 26 ? 2 : 4;

    const handleSubmit = () => {
        const text = textareaRef.current?.plainText;
        if (text && text.trim()) {
            // Process submission
            textareaRef.current?.clear();
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
        />
    );
}

export default InputPrompt;