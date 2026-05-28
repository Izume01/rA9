
function Header() {
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
                <ascii-font font="block" text="RA9 CODE" color="#90e0ef" />
            </box>
        </box>
    )
}

export default Header;