import { TextAttributes } from "@opentui/core";
import { useRef, type ReactNode } from "react";
import InputPrompt from "./InputPrompt";
import { Spinner } from "./spinner";
import { useCommandMenu } from "../command/index";
import { useTheme } from "../providers/theme";
import { useOutletContext } from "react-router";

type Props = {
  children?: ReactNode;
  onSubmit: (text: string) => void;
  inputDisabled?: boolean;
  loading?: boolean;
};

export function SessionShell({
  children,
  onSubmit,
  inputDisabled = false,
  loading = false,
}: Props) {
  const scrollRef = useRef<any>(null);
  const { colorTheme: colors } = useTheme();
  const { onExit } = useOutletContext<{ onExit: () => void }>();



  const commandMenu = useCommandMenu({
      onSelect: () => {},
      onExecute: () => {},
      scrollRef
  });

  return (
    <box
      flexDirection="column"
      flexGrow={1}
      width="100%"
      height="100%"
      paddingY={1}
      paddingX={2}
      gap={1}
    >
      <scrollbox flexGrow={1} width="100%" stickyScroll stickyStart="bottom">
        <box gap={1}>{children}</box>
      </scrollbox>
      
      <box flexShrink={0} flexDirection="column">
        {commandMenu && (
          <box width="100%" paddingBottom={1}>
            {commandMenu}
          </box>
        )}
        <box
          backgroundColor={colors.surface}
          padding={1}
          paddingLeft={2}
          border={["left"]}
          borderColor={colors.primary}
          width="100%"
          flexDirection="column"
          alignItems="flex-start"
        >
            <InputPrompt 
                scrollRef={scrollRef}
                onExit={onExit}
                onSubmit={onSubmit}
                disabled={inputDisabled}
            />
        </box>
      </box>
      <box
        flexShrink={0}
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        height={1}
        gap={2}
        paddingLeft={1}
      >
        <box flexDirection="row" alignItems="center" gap={2}>
          {loading ? <Spinner /> : null}
        </box>
        <box flexDirection="row" gap={1} flexShrink={0} marginLeft="auto">
          <text>tab</text>
          <text attributes={TextAttributes.DIM}>agents</text>
        </box>
      </box>
    </box>
  );
};
