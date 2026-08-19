
import {defineConfig, isDev} from 'sanity'

import {schemaTypes} from './schemaTypes'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'
import { deskStructure } from './desk/deskStructure'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'WA Advokatbyrå',

  projectId: '9pn4td6w',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure
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