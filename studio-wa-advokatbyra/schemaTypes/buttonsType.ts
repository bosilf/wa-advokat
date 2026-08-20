import {defineField, defineType} from 'sanity'

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),

    defineField({
      name: 'variant',
      title: 'Button style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Text länk', value: 'simple'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'icon',
      title: 'Har ikon',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'label',
      subtitle: 'variant',
    },
  },
})