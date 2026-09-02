import {CaseIcon} from '@sanity/icons'

import {defineField, defineType} from 'sanity'

export const articleMainPage = defineType({
  name: 'articleMainPage',
  title: 'Artiklar Samlingssida',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'content', title: 'Innehåll'},
    { name: 'seo', title: 'Global SEO'},
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Hero bild',
      group: "content",
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      group: "content",
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Ögonbryn',
      group: "content",
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      group: "content",
      type: 'text',
    }),
    defineField({
      name: 'slug',
      group: "content",

      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    {
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo"
    },
  ],
})