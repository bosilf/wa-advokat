import { defineType, defineField } from 'sanity'
import { ListIcon } from '@sanity/icons'
import { title } from 'process'

const TITLE = 'Menyer & Kurshantering'
const HEADERTITLE = 'Huvudmeny'

export const menu = defineType({
  name: 'menu',
  title: TITLE,
  type: 'document',
  icon: ListIcon,

  groups: [
    {
      default: true,
      name: 'headerMenu',
      title: HEADERTITLE,
    },
    {
      name: 'footerMenu',
      title: 'Footer meny',
    },
  ],
  fields: [
    defineField({
      name: 'menuLinks',
      title: 'Sidor i huvudmenyn',
      type: 'array',
      group: 'headerMenu',
      of: [
        {
          type: 'object',
          name: 'menuLinkItem',
          title: 'Länk',
          fields: [
            { name: 'pageName', title: 'Namn på sida (t.ex. Kontakt)', type: 'string' },
            { 
              name: 'path', 
              title: 'Generera slug', 
              type: 'slug', 
              options: {
                source: (doc, options) => {
                  const parent = options.parent as { pageName?: string }
                  return parent?.pageName || ''
                },
                maxLength: 96,
              },
            } 
          ],
          preview: {
            select: { title: 'pageName', subtitle: 'path.current' }
          }
        },
      ]
    }),

    defineField({
      name: 'headerMenuItems',
      type: 'string',
      group: 'headerMenu',
    }),
    
    defineField({
      name: 'menuItem',
      title: 'Inriktning Utbildning',
      type: 'object',
      fields: [
        {
          name: 'employeeList',
          title: 'Medarbetaransvariga (Alla valda syns samtidigt)',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'employee' }],
              preview: {
                select: {
                  fName: 'firstName',
                  lName: 'lastName',
                  slugCurrent: 'slug.current',
                  image: 'image'
                },
                prepare(selection) {
                  const { fName, lName, slugCurrent, image } = selection
                  return {
                    title: `${fName || ''} ${lName || ''}`.trim() || 'Namnlös medarbetare',
                    subtitle: slugCurrent ? `Länk: /${slugCurrent}` : 'Saknar länk (slug)',
                    media: image
                  }
                }
              }
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'footerMenuItems',
      type: 'array',
      group: 'footerMenu',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }]
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
            {
              name: 'sectionTitle',
              title: 'Rubrik',
              type: 'string',
            },
            {
              name: 'sectionText',
              title: 'Text',
              type: 'array',
              of: [{
                type: 'block',
                styles: [{ title: 'Normal', value: 'normal' }]
              }]
            }
          ],
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
      title: 'Förutsättningar Utbildning',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }]
        }
      ]
    }),

    defineField({
      name: 'employees',
      title: 'Medarbetare',
      type: 'reference',
      to: [{ type: 'employee' }],
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'employees' }, // Ändrat från 'employee' till 'employees' för att matcha fältnamnet ovanför!
    }),

    defineField({
      name: 'category',
      title: 'Kategori / Inriktning',
      type: 'string',
      options: {
        list: [
          { title: 'Entreprenadrätt', value: 'entreprenad' },
          { title: 'Offentlig upphandling', value: 'upphandling' }
        ]
      }
    }),
  ]
})