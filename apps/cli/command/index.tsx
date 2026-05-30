import { useRef } from "react";
import { ScrollBox, type TextareaRenderable } from "@opentui/core";
import { getFilteredCommands } from "./filterCommand";
import { COMMANDS } from "./commands";
import type { TypeCommand } from "./type";

import { useCliStore } from "../store/cliStore";

const MAX_VISIBLE_COMMANDS = 5;

const MAX_COMMANDS_COL_SPACE =  Math.max(...COMMANDS.map(cmd => cmd.value.length)) + 4;

interface UseCommandMenuProps {
    onSelect : (command : TypeCommand | null) => void;
    onExecute : (command : TypeCommand) => void;
    scrollRef : React.RefObject<any>;
}

export const useCommandMenu = ({
    onSelect, 
    onExecute, 
    scrollRef
} : UseCommandMenuProps) => {
    const inputValue = useCliStore((state) => state.inputValue);
    const currentIndex = useCliStore((state) => state.currentIndex);

    if (!inputValue.startsWith("/")) {
        return null;
    }

    const filteredCommands = getFilteredCommands(inputValue);

    if (filteredCommands.length === 0) {
        return (
            <box paddingLeft={1}>
                <text fg="#ff5555">No commands found for "{inputValue.slice(1)}"</text>
            </box>
        );
    }

    const height = Math.min(filteredCommands.length, MAX_VISIBLE_COMMANDS);

    return (
        <scrollbox ref={scrollRef} height={height} border={["left"]} borderColor="#90e0ef">
            {filteredCommands.map((cmd, idx) => {
                const isSelected = idx === currentIndex;
                return (
                    <box 
                        id={"cmd-" + cmd.name}
                        key={cmd.name}
                        flexDirection="row"
                        backgroundColor={isSelected ? "#1D2C3F" : undefined}
                        paddingLeft={1}
                        paddingRight={1}
                    >
                        <text fg={isSelected ? "#90e0ef" : "#ffffff"}>
                            {cmd.value.padEnd(MAX_COMMANDS_COL_SPACE)}
                        </text>
                        <text fg={isSelected ? "#ffffff" : "#888888"}>
                            {cmd.description}
                        </text>
                    </box>
                );
            })}
        </scrollbox>
    );
};