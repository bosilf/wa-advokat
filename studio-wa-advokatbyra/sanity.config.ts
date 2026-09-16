
import {defineConfig, isDev} from 'sanity'

import {schemaTypes} from './schemaTypes'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'
import { deskStructure } from './desk/deskStructure'
import {waStudioTheme} from "./src/studio/theme";
import WAStudioIcon from "./src/studio/icon";
import "./src/studio/studio.css";

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'WA Advokatbyrå',
  subtitle: "Webbplatsens innehåll",
  theme: waStudioTheme,
  icon: WAStudioIcon,

  projectId: '9pn4td6w',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    colorInput(),
    // customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },
})