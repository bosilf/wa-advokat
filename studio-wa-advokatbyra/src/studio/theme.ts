import {buildTheme} from "@sanity/themer";

export const waStudioTheme = buildTheme({
  // Replace these example values with your real WA colors
  accent: "#9AABB5",
  text: "#1A1A1A",
  background: {
    light: "#F3F5F7",
    dark: "#111513",
  },
  contrast: 90,
});