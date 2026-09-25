import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kontaktsida',
  type: 'document',

  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "heroRegular",
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
    })
  ],
})