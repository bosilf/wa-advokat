import {defineType, defineField} from 'sanity'

export const courseType = defineType({
  name: 'course', // VIKTIGT: Detta namn måste användas i din config
  title: 'Kurser',
  type: 'document',
  fields: [
    defineField({
      name: 'courseName',
      title: 'Namn Utbildning',
      type: 'string',
    }),
    defineField({
      name: 'aimCourse',
      title: 'Inriktning Utbilnding',
      type: 'array',
        of: [
          {
            type: 'block',
            styles: [{title: 'Normal', value: 'normal'}] 
          }
        ]
    }),
    defineField({
      name: 'aboutCourse',
      title: 'Om Utbilndingen',
      type: 'array',
        of: [
          {
            type: 'block',
            styles: [{title: 'Normal', value: 'normal'}] 
          }
        ]
    }),
    defineField({
      name: 'courseSections',
      title: 'Kursinnehåll (Sektioner)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Innehållssektion',
          fields: [
            // 1. Titeln för just detta block
            {
              name: 'sectionTitle',
              title: 'Rubrik',
              type: 'string',
            },
            // 2. Själva brödtexten
            {
              name: 'sectionText',
              title: 'Text',
              type: 'array',
              of: [{ 
                type: 'block',
                // Här inaktiverar vi möjligheten att välja olika rubriknivåer (h1, h2 etc)
                styles: [{title: 'Normal', value: 'normal'}] 
              }]
            }
          ],
          // Detta gör att du ser rubriken direkt i listan i Sanity
          preview: {
            select: {
              title: 'sectionTitle'
            }
          }
        }
      ]
    }),
    
    defineField({
      name: 'length',
      title: 'Längd på Utbildning',
      type: 'string',
    }),
    defineField({
      name: 'conditionsCourse',
      title: 'Förutsättningar Utbilnding',
      type: 'array',
        of: [
          {
            type: 'block',
            styles: [{title: 'Normal', value: 'normal'}] 
          }
        ]
    }),
    defineField({
      name: 'lecturer',
      title: 'Föreläsare',
      type: 'reference',
      to: [{ type: 'employee' }],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'courseName' },
    }),
    defineField({
      name: 'category', // Detta fält fylls i automatiskt av din mall
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'courseCategory' }],
    }),
  ]
})
