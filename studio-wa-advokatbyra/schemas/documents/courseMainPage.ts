import {CaseIcon} from '@sanity/icons'

import {defineField, defineType} from 'sanity'

export const courseMainPage = defineType({
  name: 'courseMainPage',
  title: 'Kurser',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Hero bild',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Ögonbryn',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: "experts",
      title: "Experter",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "employee" }],
        },
      ],
    })
  ],
})