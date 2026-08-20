import {defineField, defineType} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "writers",
      title: "Skriven av",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "employee" }],
        },
      ],
    }),
    
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{type: 'button'}],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})