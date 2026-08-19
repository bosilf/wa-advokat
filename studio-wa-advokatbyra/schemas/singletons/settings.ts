import { CogIcon, CaseIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'
import RolePreview from '../../components/rolePreview'
import {TagPreview, } from '../../components/TagPreview'

const TITLE = 'Inställningar (Settings)'

export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  components: {
    preview: TagPreview,
  },
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Meny & Footer',
    },
    {
      name: 'seo',
      title: 'Global SEO',
    },
    {
      name: 'colors',
      title: 'Filter färger',
    },
  ],
  fields: [
    // === FLIK 1: MENY & FOOTER ===
    defineField({
      name: 'footerText',
      title: 'Footer: Upphovsrätt / Företagsnamn',
      type: 'string',
      initialValue: '© 2026 WA Advokatbyrå. Alla rättigheter förbehållna.',
      group: 'navigation',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer: Snabblänkar',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Länktext (t.ex. Integritetspolicy)', type: 'string' },
            { name: 'url', title: 'Webbadress (t.ex. /integritetspolicy)', type: 'string' }
          ]
        }
      ]
    }),

    // === FLIK 2: FÄRGER PÅ YRKESTITLAR ===


    // === FLIK 3: GLOBAL SEO ===
    defineField({
      name: 'roleTag',
      title: 'Yrkesroller',
      group: 'colors',
      type: 'array',
      description: 'Välj medarbetarens yrkestitlar. Minst en titel, max två titlar!',
      of: [
        {
          type: 'reference',
          to: [{ type: 'role' }]
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'yrkesroller',
      type: 'array',
      group: 'colors',
      of: [
        {
          type: 'object',
          icon: CaseIcon,
          fields: [
            { name: 'tagColor', title: 'välj färg', type: 'color' },
            { name: 'tagName', title: 'Yrkestitel', type: 'string' }
          ],
          // Pass values to the custom preview component
          preview: {
            select: {
              tagColor: 'tagColor',
              tagName: 'tagName',
            },
            prepare({ tagColor, tagName }) {
              return { tagColor, tagName }
            }
          },
          components: {
            preview: TagPreview,
          },
        }
      ]
    }),
    defineField({
      name: 'tagDescription',
      title: 'Global metabeskrivning',
      type: 'text',
      description: 'Standardtexten som visas på Google om en undersida saknar egen beskrivning.',
      group: 'colors',
    }),

    defineField({
      name: 'siteName',
      title: 'Webbplatsens namn',
      type: 'string',
      initialValue: 'WA Advokatbyrå',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Global metabeskrivning',
      type: 'text',
      description: 'Standardtexten som visas på Google om en undersida saknar egen beskrivning.',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})