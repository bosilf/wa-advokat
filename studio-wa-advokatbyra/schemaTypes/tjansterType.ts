import {defineField, defineType} from 'sanity'

export const tjansterType = defineType({
  name: 'tjanster',
  title: 'Tjänster',
  type: 'document',

  groups: [
    {
      name: 'seos',
      title: 'SEO',
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
      options: {source: 'eyebrow'},
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
      title: "Experter",
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
      title: "Sektioner",
      type: "array",
      of: [
        { type: "section" },
        { type: "teamSection" },
        { type: "image" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO texter",
      group: 'seos',
      type: "object",
      fields: [
        {
          name: 'small',
          description: 'beskrivning av tjänsten (max 1 mening)',
          title: 'Kort',
          type: 'string',
          validation: Rule => Rule.required(),

        },
        {
          name: 'medium',
          description: 'beskrivning av tjänsten (max 20 ord)',
          title: 'Medium',
          type: 'array',
          of: [{type: 'block'}],
          validation: Rule => Rule.required(),
        },
        {
          name: 'long',
          description: 'beskrivning av tjänsten (max 50 ord)',
          title: 'Längre',
          type: 'array',
          of: [{type: 'block',}],
          validation: Rule => Rule.required(),
        },
      ]
    })
  ],
  preview: {
    select: {
      title: "eyebrow",
      subtitle: "title",
    },
  },
})