import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/theme/theme-store";

function Statusbar() {
    const { colorTheme: colors } = useTheme();
    return (
        <box 
            flexDirection="row"
            gap={1}
        >
            <text
                fg={colors.primary}
            >
                Build
            </text>
            <text
                attributes={TextAttributes.DIM}
                fg={"gray"}
            >
                &gt;
            </text>
            <text fg={colors.primary}>
                opus-4-6
            </text>
        </box>
    )
}

export default Statusbar;