import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9pn4td6w',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    // Säg till studion att skanna dina Next.js-filer efter GROQ-queries
    path: '../nextjs-wa-advokatbyra/src/**/*.{ts,tsx}',
    // Säg till vart den färdiga TypeScript-filen ska sparas
    generates: '../nextjs-wa-advokatbyra/sanity.types.ts',
  }
})
