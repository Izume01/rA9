import React, { useState } from "react";
import { TextAttributes } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useDialogStore } from "../providers/dialog";
import { useKeyboardLayoutStore } from "../providers/keyboard-layout";

interface ExitConfirmDialogProps {
  onConfirm: () => void;
}

export function ExitConfirmDialog({ onConfirm }: ExitConfirmDialogProps) {
  const close = useDialogStore((state) => state.close);
  const isTopLayer = useKeyboardLayoutStore((state) => {
    const stack = state.stack;
    return stack.length > 0 && stack[stack.length - 1] === "dialog";
  });

  const [selectedIndex, setSelectedIndex] = useState(1);
  const options = ["Yes", "No"] as const;

  useKeyboard((key) => {
    if (!isTopLayer) return;

    if (key.name === "left" || key.name === "right") {
      key.preventDefault();
      setSelectedIndex((prev) => (prev === 0 ? 1 : 0));
    } else if (key.name === "return" || key.name === "enter") {
      key.preventDefault();
      if (selectedIndex === 0) {
        onConfirm();
      } else {
        close();
      }
    } else if (key.raw === "y" || key.raw === "Y") {
      key.preventDefault();
      onConfirm();
    } else if (key.raw === "n" || key.raw === "N") {
      key.preventDefault();
      close();
    }
  });

  return (
    <box flexDirection="column" gap={1} width="100%">
      <text>Are you sure you want to exit?</text>
      <box flexDirection="row" gap={2} justifyContent="flex-end" marginTop={1}>
        {options.map((label, idx) => (
          <text
            key={label}
            fg={idx === selectedIndex ? "#00FF9D" : "#888888"}
            attributes={idx === selectedIndex ? TextAttributes.BOLD : undefined}
            onMouseDown={() => {
              if (label === "Yes") {
                onConfirm();
              } else {
                close();
              }
            }}
          >
            {idx === selectedIndex ? `[ ${label} ]` : `  ${label}  `}
          </text>
        ))}
      </box>
    </box>
  );
}
