import { useCallback, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Header from "../components/Header";
import Statusbar from "../components/Statusbar";
import InputPrompt from "../components/InputPrompt";
import { useCommandMenu } from "../command/index";
import { useTheme } from "../providers/theme";

export function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef<any>(null);
  const { colorTheme: colors } = useTheme();
  const { onExit } = useOutletContext<{ onExit: () => void }>();

  const handleSubmit = useCallback(
    (text: string) => {
      navigate("/sessions/new", { state: { message: text } });
    },
    [navigate],
  );



  const commandMenu = useCommandMenu({
    onSelect: () => {},
    onExecute: () => {},
    scrollRef
  });

  return (
    <box
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      gap={2}
      position="relative"
      width="100%"
      height="100%"
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
            onSubmit={handleSubmit}
          />
          <Statusbar />
        </box>
      </box>
    </box>
  );
};
