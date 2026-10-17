import {defineType, defineField, defineArrayMember} from 'sanity'

export const futureCourse = defineType({
  name: 'futureCourse',
  title: 'Kurser',
  type: 'document',
  groups: [
    {title: 'Innehåll', name: 'content'},
    {title: 'Global SEO', name: 'seo'},
  ],

  fields: [
    defineField({
      name: 'coursePick',
      title: 'Välj Utbildning',
      type: 'reference',
      to: [{type: 'course'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      group: 'content',
      title: 'Plats',
    }),
    defineField({
      name: 'type',
      title: 'Undervisningsform',
      type: 'string',
      description: 'Välj om kursen är digital eller på plats.',

      options: {
        layout: 'radio',
        list: [
          {
            title: 'Digitalt',
            value: 'digital',
          },
          {
            title: 'På plats',
            value: 'inPerson',
          },
        ],
      },

      initialValue: 'digital',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aim',
      title: 'Inrikting kurs',
      type: 'string',
      description: 'Kurstillfällen erbjuds som öppen utbildning.',

      options: {
        layout: 'radio',
        list: [
          {
            title: 'Öppen utbildning',
            value: 'open',
          },
        ],
      },

      initialValue: 'open',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cost',
      title: 'Kurspris',
      type: 'string',
      description: 'Skriv vad priset kostar i endast siffror utan mellanrum t.ex: "7500". Om det inte finns ett bestämt pris: lämna tomt',
    }),
    defineField({
      name: 'dates',
      type:'array',
      title: 'Kurstillfällen',
      of: [
        defineArrayMember({
          type: 'date'
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'coursePick.courseName',
      type: 'type',
      aim: 'aim',
    },
    prepare({title, type, aim}) {
      const typeLabels: Record<string, string> = {
        digital: 'Digitalt',
        inPerson: 'På plats',
      }
      const aimLabels: Record<string, string> = {
        open: 'Öppen utbildning',
      }

      return {
        title: title ?? 'Namnlös kurs',
        subtitle: [aimLabels[aim], typeLabels[type]].filter(Boolean).join(', ') || 'Info saknas',
      }
    },
  },
})
