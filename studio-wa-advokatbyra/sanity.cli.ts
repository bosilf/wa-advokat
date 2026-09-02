import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9pn4td6w',
    dataset: 'production'
  },
  deployment: {
    appId: 'fbmanqevyzvrciv2okor5aep',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: '../nextjs-wa-advokatbyra/src/**/*.{ts,tsx}',
    generates: '../nextjs-wa-advokatbyra/src/sanity/sanity.types.ts',
  }
})
