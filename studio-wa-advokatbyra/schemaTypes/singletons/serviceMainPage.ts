import {CaseIcon} from '@sanity/icons'

import {defineField, defineType, defineArrayMember} from 'sanity'

export const serviceMainPage = defineType({
  name: 'serviceMainPage',
  title: 'Rättsområden',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'content', title: 'Innehåll'},
    {name: 'seo', title: 'Global SEO'},
  ],
  fields: [
    defineField({
      type: 'image', 
      name: 'image', 
      title: 'Bild',
      group: 'hero',
        options: {
          hotspot: true,
        },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'title',
      group: 'hero',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      group: 'hero',
      title: 'Ögonbryn',
      type: 'string',
    }),
    defineField({
      name: "introSection",
      title: "Intro",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "eyebrow",
        }),

        defineField({
          name: "title",
          title: "Rubrik",
          type: "string",
        }),

        defineField({
          name: "text",
          title: "Introduktion",
          type: "blockObject",
        }),
      ]
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Rättsområden',
      group: 'content',
      of: [
        { type: 'reference',
          to: [{ type: 'service' }]
        }
      ]
    }),
    defineField({
      group: 'seo',
      name: 'seo',
      type: 'seo',
      title: 'SEO'
    }),
    defineField({
      group: 'seo',
      name: 'redirects',
      type: 'redirects',
    }),
  ],
})