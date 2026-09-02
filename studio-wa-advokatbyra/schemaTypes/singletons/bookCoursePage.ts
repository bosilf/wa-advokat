import { defineType, defineField } from 'sanity'

export const bookCoursePage = defineType({
  name: 'bookCoursePage',
  title: 'Om oss sida',
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
      of: [
        { type: 'reference', 
          to: [
            { type: 'section'}
          ]
        },
      ],
    }),
    defineField({
      name: "bookCourselink",
      title: "Länk",
      type: "navigationItem",
      description:
        "Valfri länk, exempelvis Boka kurs. Länken väljs bland befintliga länkar.",
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

        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'bookCoursePage',
    },
  },
})