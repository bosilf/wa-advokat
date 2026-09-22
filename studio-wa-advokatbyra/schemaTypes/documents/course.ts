import {defineType, defineField, defineArrayMember} from 'sanity'
import {LinkIcon} from '@sanity/icons'
import { text } from 'node:stream/consumers';

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
    { type: 'heroRegular', name: 'hero' },
    defineField({
      name: 'intro',
      type: 'array',
      group: 'content',
      title: 'Introduktion',
      of: [
        defineArrayMember({ type: 'block'})
      ]
    }),
    defineField({
      name: 'aimCourse',
      title: 'Inriktning Utbildning',
      type: 'array',
      group: 'content',
        of: [
          {
            type: 'titleObject',
          },
          {
            type: 'button',
          },
          {
            type: 'block',
          }
        ]
    }),
    defineField({
      name: 'aboutCourse',
      title: 'Om Utbildningen',
      group: 'content',
      type: 'array',
        of: [
          {
            type: 'titleObject',
          },
          {
            type: 'button',
          },
          {
            type: 'block',
          },
        ]
    }),
    defineField({
      name: "courseSections",
      title: "Kursinnehåll (sektioner)",
      group: "content",
      type: "array",
      of: [
        defineArrayMember({
          name: "courseTextSection",
          title: "Textsektion",
          type: "object",
          fields: [
            defineField({
              name: "sectionTitle",
              title: "Titel på sektion",
              description:
                'Till exempel "Kursinnehåll" eller "Kursupplägg". Lämna tomt om du inte vill ha en titel.',
              type: "string",
            }),
            defineField({
              name: "sectionContent",
              title: "Innehåll i sektion",
              type: "array",
              of: [
                defineArrayMember({
                  type: "block",
                }),
              ],
            }),
          ],
        }),
    
        defineArrayMember({
          type: "image",
          title: "Bildavdelare",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternativtext",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
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
      name: 'slugLabel',
      type: 'string',
      title: 'Namn på länk',
      group: 'content',
    }),
    defineField({
      name: 'category', 
      group: 'content',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'courseCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'seo',
      name: 'seo',
      group: 'seo',
      title: 'SEO'
    }),
  ],
  
  preview: {
    select: {
      title: "courseName",
      slug: "slug.current",
      category: "category.slug.current"
    },
    prepare({ title, slug, category }) {
      return {
        title: title ?? "Namnlös kurs",
        subtitle: slug
          ? `/juridikkurser/${category}/${slug}`
          : "Slug saknas",
      };
    },
  },
})