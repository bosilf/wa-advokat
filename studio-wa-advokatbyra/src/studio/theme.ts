import {buildTheme} from "@sanity/themer";

export const waStudioTheme = buildTheme({
  accent: "#1A1A1A",
  text: "#1A1A1A",
  background: {
    light: "#F3F5F7",
    dark: "#111513",
  },
  contrast: 0,
});
const lightColors = waStudioTheme.v2?.color.light

if (lightColors) {
  for (const surface of Object.values(lightColors)) {
    for (const tone of ['default', 'neutral', 'primary'] as const) {
      const hover = {
        bg: '#e7e7e7',
        fg: '#1A1A1A',
        icon: '#1A1A1A',
      }

      Object.assign(surface.selectable[tone].hovered, hover)
      Object.assign(surface.button.bleed[tone].hovered, hover)
      Object.assign(surface.button.ghost[tone].hovered, hover)
    }
  }
}