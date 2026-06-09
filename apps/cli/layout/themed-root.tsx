import type { ReactNode } from "react";
import { useTheme } from "../providers/theme";
type Props = {
  children: ReactNode;
};
export function ThemedRoot({ children }: Props) {
  const { colorTheme: colors } = useTheme();
  return (
    <box 
      backgroundColor={colors.background} 
      width="100%" 
      height="100%" 
      flexGrow={1}
    >
      {children}
    </box>
  );
};
