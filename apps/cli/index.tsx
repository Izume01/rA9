import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import Header from "./components/Header";
import Statusbar from "./components/Statusbar";
import InputPrompt from "./components/InputPrompt";

function App() {
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
            <box
                backgroundColor="#1A1A24"
                padding={1}
                paddingLeft={2}
                border = {["left"]}
                borderColor="#90e0ef"
                width={80}
                flexDirection="column"
                alignItems="flex-start"
                gap={1}
            >
                <InputPrompt />
                <Statusbar />
            </box>
        </box>
    );
}
const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
