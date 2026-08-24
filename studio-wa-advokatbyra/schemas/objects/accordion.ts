import { defineField, defineType } from 'sanity'

export const accordion = defineType({
  name: 'accordion',
  title: 'dragspel',
  type: 'object',
  fields: [
  defineField({
    name: 'accordion',
    title: 'Dragspel (Accordions)',
    type: 'array',
    description: 'Lägg till de dragspel som ska visas i botten av kortet.',
    hidden: ({ parent }) => parent?.hideAccordion === true,
    of: [
      {
        type: 'object',
        name: 'accordionItem',
        title: 'Dragspel',
        fields: [
          defineField({
            name: 'title',
            title: 'Titel på dragspelet',
            type: 'string',
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Innehåll/Text inuti dragspelet',
            type: 'text',
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'btnHref',
            title: 'Länk till knapp (Läs mer)',
            type: 'reference',
            to: [{ type: 'linkItem'}],
            description: 'Exempel: /tjanster/entreprenad (Lämna tom om knappen ska döljas)',
          }),

          defineField({
            name: 'icon',
            title: 'Visa ikon i knappen',
            type: 'boolean',
            initialValue: true,
            hidden: ({ parent }) => !parent?.btnHref,
          }),
        ],
      },
    ],
  })
  ]
})