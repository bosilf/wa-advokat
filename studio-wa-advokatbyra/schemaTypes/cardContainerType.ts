import { defineField, defineType } from 'sanity'

export const cardContainerType = defineType({
  name: 'cardContainer',
  title: 'Kort-behållare (Card Container)',
  type: 'object',
  fields: [
    defineField({
      name: 'descriptionText',
      title: 'Beskrivningstext',
      type: 'text',
      description: 'Huvudtexten som visas högst upp i kortet.',
    }),

    // 2. Reglage för att dölja/visa delar (Booleans)
    defineField({
      name: 'hideDescription',
      title: 'Dölj beskrivningstexten',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hideAccordion',
      title: 'Dölj alla dragspel (Accordions)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hideImage',
      title: 'Dölj bild (ImageBlurText)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hideCardSmall',
      title: 'Dölj litet medarbetarkort (TeamCardSmall)',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'accordions',
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
              type: 'string',
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
    }),
  ],
})