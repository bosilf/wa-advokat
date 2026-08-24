import {defineField, defineType} from 'sanity'

export const mainPages = defineType({
  name: 'mainPage',
  title: 'Huvudsida',
  type: 'document',

  groups: [
    {
      name: 'content',
      title: 'Innehåll',
    },
    {
      name: 'seo',
      title: 'Global SEO',
    }
  ],

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Intro',
      group: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'contents',
      type: 'array',
      title: 'Lägg till/ändra sektioner',
      group: 'content',
      of: [
        { type: 'section'},
      ]
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      title: 'SEO',
    })
  ],
})