import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const course = defineType({
  name: 'course',
  title: 'Kurser',
  type: 'document',
  groups: [
    { title: 'Innehåll',
      name: 'content'
    },
    { title: 'Global SEO',
      name: 'seo'
    }
  ],

  fields: [
    defineField({
      name: 'courseName',
      title: 'Namn Utbildning',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'aimCourse',
      title: 'Inriktning Utbilnding',
      type: 'array',
      group: 'content',

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
      group: 'content',
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
      group: 'content',
      type: "array",
      of: [
        { type: "section", title: 'Text-sektion' },
        { type: "image", title: 'Bild-avdelare' },
      ]
    }),
    
    defineField({
      name: 'length',
      title: 'Längd på Utbildning',
      group: 'content',
      type: 'string',
    }),
    defineField({
      name: 'conditionsCourse',
      title: 'Förutsättningar Utbilnding',
      group: 'content',
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
      group: 'content',
      title: 'Föreläsare',
      type: 'reference',
      to: [{ type: 'employee' }],
    }),
    defineField({
      name: "slug",
      title: "Länk till kursen",
      group: "content",
      description:
        'Klicka på "Generate" för att skapa länken till kursen.',
      type: "slug",
      icon: LinkIcon,
      options: {
        source: "courseName",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category', 
      group: 'content',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'courseCategory' }],
    }),
    defineField({
      type: 'seo',
      name: 'seo',
      group: 'seo',
      title: 'SEO'
    })
  ],
  
  preview: {
    select: {
      title: "courseName",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title ?? "Namnlös kurs",
        subtitle: slug
          ? `/juridikkurser/${slug}`
          : "Slug saknas",
      };
    },
  },
})