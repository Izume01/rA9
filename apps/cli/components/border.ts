import type { BorderCharacters } from "@opentui/core";

/**
 * SplitBorderChars defines border characters that render vertical lines
 * on the left and right sides while leaving the top and bottom open.
 * This conforms exactly to the @opentui/core BorderCharacters interface.
 */
export const SplitBorderChars: BorderCharacters = {
  topLeft: "│",
  topRight: "│",
  bottomLeft: "│",
  bottomRight: "│",
  horizontal: " ",
  vertical: "│",
  topT: "┼",
  bottomT: "┼",
  leftT: "├",
  rightT: "┤",
  cross: "┼",
};

/**
 * DoubleSplitBorderChars is an alternative split border style using double-line vertical bars.
 */
export const DoubleSplitBorderChars: BorderCharacters = {
  topLeft: "║",
  topRight: "║",
  bottomLeft: "║",
  bottomRight: "║",
  horizontal: " ",
  vertical: "║",
  topT: "╬",
  bottomT: "╬",
  leftT: "╠",
  rightT: "╣",
  cross: "╬",
};

/**
 * DashedSplitBorderChars uses a double-dashed vertical line for a softer split look.
 */
export const DashedSplitBorderChars: BorderCharacters = {
  topLeft: "╎",
  topRight: "╎",
  bottomLeft: "╎",
  bottomRight: "╎",
  horizontal: " ",
  vertical: "╎",
  topT: "┼",
  bottomT: "┼",
  leftT: "├",
  rightT: "┤",
  cross: "┼",
};
