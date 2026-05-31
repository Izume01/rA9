import type { TypeCommand } from "./type";
import { toast } from "../providers/toast";
import { useDialogStore } from "../providers/dialog";
import { useThemeStore } from "../providers/theme/theme-store";
import { THEMES } from "../theme";
import React, { useState } from "react";
import { TextAttributes } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useKeyboardLayoutStore } from "../providers/keyboard-layout";

// Theme Selector Component inside the Dialog
function ThemeSelector() {
  const currentTheme = useThemeStore((state) => state.currentThemeName);
  const setTheme = useThemeStore((state) => state.setTheme);
  const close = useDialogStore((state) => state.close);
  const isTopLayer = useKeyboardLayoutStore((state) => {
    const stack = state.stack;
    return stack.length > 0 && stack[stack.length - 1] === "dialog";
  });

  // Find the index of the current theme to start with
  const initialIndex = THEMES.findIndex((t) => t.name === currentTheme.name);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useKeyboard((key) => {
    if (!isTopLayer) return;

    if (key.name === "up") {
      key.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + THEMES.length) % THEMES.length);
    } else if (key.name === "down") {
      key.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % THEMES.length);
    } else if (key.name === "return" || key.name === "enter") {
      key.preventDefault();
      const theme = THEMES[selectedIndex];
      if (theme) {
        setTheme(theme);
        toast.success(`Theme changed to ${theme.name}`);
        close();
      }
    }
  });

  return (
    <box flexDirection="column" gap={0} width="100%">
      {THEMES.map((theme, idx) => {
        const isCurrent = theme.name === currentTheme.name;
        const isSelected = idx === selectedIndex;
        return (
          <box
            key={theme.name}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingX={1}
            paddingY={0}
            backgroundColor={isSelected ? "#1D2C3F" : isCurrent ? "#141C24" : "#1C1F21"}
            onMouseDown={() => {
              setTheme(theme);
              toast.success(`Theme changed to ${theme.name}`);
              close();
            }}
          >
            <text fg={isSelected ? "#00FF9D" : isCurrent ? "#90e0ef" : "#ffffff"} attributes={isSelected || isCurrent ? TextAttributes.BOLD : undefined}>
              {theme.name} {isSelected ? "◀" : ""}
            </text>
            {isCurrent && (
              <text fg={isSelected ? "#00FF9D" : "#90e0ef"} attributes={TextAttributes.BOLD}>
                * active
              </text>
            )}
          </box>
        );
      })}
    </box>
  );
}

// Help Dialog Component
function HelpDialog() {
  const close = useDialogStore((state) => state.close);
  return (
    <box flexDirection="column" gap={1} width="100%">
      <text attributes={TextAttributes.DIM}>Available Commands:</text>
      <box flexDirection="column" gap={0} marginTop={1}>
        {COMMANDS.map((cmd) => (
          <box key={cmd.name} flexDirection="row" gap={2} paddingY={0}>
            <text fg="#00FF9D" width={12} attributes={TextAttributes.BOLD}>
              {cmd.value}
            </text>
            <text fg="#ffffff">{cmd.description}</text>
          </box>
        ))}
      </box>
      <box marginTop={2} alignSelf="flex-end">
        <text fg="#888888" onMouseDown={() => close()}>
          [ Close ]
        </text>
      </box>
    </box>
  );
}

export const COMMANDS: TypeCommand[] = [
  {
    name: "new",
    description: "Create a new conversation",
    value: "/new",
    action: () => {
      toast.success("New conversation started!");
    },
  },
  {
    name: "exit",
    description: "Exit the application",
    value: "/exit",
    action: (ctx) => {
      toast.info("Exiting application...");
      setTimeout(() => {
        ctx.exit();
      }, 1000);
    },
  },
  {
    name: "help",
    description: "Show this help message",
    value: "/help",
    action: () => {
      useDialogStore.getState().open({
        title: "Help & Commands",
        children: <HelpDialog />,
      });
    },
  },
  {
    name: "models",
    description: "List available models",
    value: "/models",
    action: () => {
      toast.info("Models loaded: Gemini 1.5 Pro, Gemini 1.5 Flash.", 4000);
    },
  },
  {
    name: "logout",
    description: "Logout from your account",
    value: "/logout",
    action: (ctx) => {
      toast.success("Logged out successfully.");
      setTimeout(() => {
        ctx.exit();
      }, 1000);
    },
  },
  {
    name: "agent",
    description: "Start an agent with a specified goal",
    value: "/agent",
    action: () => {
      toast.info("Initializing agent with specified goal...");
    },
  },
  {
    name: "sessions",
    description: "List all sessions",
    value: "/sessions",
    action: () => {
      toast.info("Found 3 active workspace sessions.");
    },
  },
  {
    name: "theme",
    description: "Change the terminal theme",
    value: "/theme",
    action: () => {
      useDialogStore.getState().open({
        title: "Select Terminal Theme",
        children: <ThemeSelector />,
      });
    },
  },
  {
    name: "usage",
    description: "Show API usage statistics",
    value: "/usage",
    action: () => {
      toast.success("Usage: 1,420 / 10,000 requests used (14.2%).");
    },
  },
];
