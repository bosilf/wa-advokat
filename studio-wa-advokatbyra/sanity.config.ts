
import {defineConfig, isDev} from 'sanity'

import {schemaTypes} from './schemaTypes'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import { structureTool } from 'sanity/structure'
import { deskStructure } from './desk/deskStructure'
import {waStudioTheme} from "./src/studio/theme";
import WAStudioIcon from "./src/studio/icon";
import { structureHomeLandingPlugin } from 'sanity-plugin-blank-space'
import StudioOverview from './desk/StudioOverview'
import './src/studio/studio.css'

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
      title: 'Webbinnehåll'
    }),
    structureHomeLandingPlugin({
      component: StudioOverview,
      title: 'Översikt',
      paneId: 'overview',
    }),
    colorInput(),
    // customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
    templates: (previous) => [
      ...previous,
      {
        id: 'future-course-for-course',
        title: 'Öppet kurstillfälle för utbildning',
        schemaType: 'futureCourse',
        parameters: [{name: 'courseId', title: 'Utbildning', type: 'string'}],
        value: ({courseId}: {courseId?: string}) => ({
          aim: 'open',
          type: 'digital',
          ...(courseId ? {
            coursePick: {
              _type: 'reference',
              _ref: courseId.replace(/^drafts\./, ''),
              _weak: true,
              _strengthenOnPublish: {type: 'course'},
            },
          } : {}),
        }),
      },
      {
        id: 'service-section-for-service',
        title: 'Fördjupning inom rättsområde',
        schemaType: 'serviceSection',
        parameters: [{name: 'parentServiceId', title: 'Rättsområde', type: 'string'}],
        value: ({parentServiceId}: {parentServiceId?: string}) => parentServiceId ? {
          parentService: {
            _type: 'reference',
            _ref: parentServiceId.replace(/^drafts\./, ''),
          },
        } : {},
      },
      {
        id: 'course-for-category',
        title: 'Kurs inom kategori',
        schemaType: 'course',
        parameters: [{name: 'categoryId', title: 'Kurskategori', type: 'string'}],
        value: ({categoryId}: {categoryId?: string}) => categoryId ? {
          category: {
            _type: 'reference',
            _ref: categoryId.replace(/^drafts\./, ''),
          },
        } : {},
      },
    ],
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
