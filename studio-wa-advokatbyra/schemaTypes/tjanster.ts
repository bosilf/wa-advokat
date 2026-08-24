import {defineField, defineType} from 'sanity'

export const tjanster = defineType({
  name: 'tjanster',
  title: 'Tjänster',
  type: 'document',

  groups: [
    {
      name: 'seos',
      title: 'Global SEO',
    },
  ],

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
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
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: "experts",
      title: "Ansvarig advokat",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "employee" }],
        },
      ],
    }),
    defineField({
      name: "sections",
      title: "Lägg till/ändra sektioner",
      type: "array",
      of: [
        { type: "section" },
        { type: "teamSection" },
        { type: "image" },
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seos',
      title: 'SEO',
    })
  ],
  preview: {
    select: {
      title: "title",
      // subtitle: "title",
    },
  },
})