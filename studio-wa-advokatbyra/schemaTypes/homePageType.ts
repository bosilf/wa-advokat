import { defineType, defineField } from 'sanity'

export const homePageType = defineType({
  name: 'homepage',
  title: 'Förstasidan',
  type: 'document',

  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Titel',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Bild',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
    }),

    defineField({
      name: 'content',
      title: 'Innehåll',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'educationList',
      title: 'Utbildningar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'school',
              title: 'Skola/Utbildning',
              type: 'string',
            }),

            defineField({
              name: 'yearStart',
              title: 'År Start',
              type: 'number',
            }),

            defineField({
              name: 'yearEnd',
              title: 'År Avklarat',
              type: 'number',
            }),
          ],

          preview: {
            select: {
              title: 'school',
              subtitle: 'yearStart',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heroTitle', // Här säger vi till Sanity att hämta texten från heroTitle
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Namnlös förstasida', // Visar titeln eller en backup-text
      }
    },
  }
})