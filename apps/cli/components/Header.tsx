import { useTheme } from "../providers/theme/theme-store";

function Header() {
    const { colorTheme: colors } = useTheme();
    return (
        <box
            justifyContent="center"
            alignItems="center"
        >
            <box
                flexDirection="row"
                justifyContent="center"
                gap={0.5}
                alignItems="center"
            >
                <ascii-font font="block" text="RA9 CODE" color={colors.primary} />
            </box>
        </box>
    )
}

export default Header;