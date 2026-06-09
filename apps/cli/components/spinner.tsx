import "opentui-spinner/react";
import { useTheme } from "../providers/theme";
export function Spinner() {
  const { colorTheme: colors } = useTheme();
  return <spinner name="aesthetic" color={colors.primary} />;
};
