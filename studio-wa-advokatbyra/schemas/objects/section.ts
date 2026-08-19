import { defineField, defineType } from 'sanity'

export const section = defineType({
  name: 'section',
  title: 'Sektion',
  type: 'document',
  // icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'card',
      title: 'Meny & Footer',
    },
    {
      name: 'seo',
      title: 'Global SEO',
    },
    {
      name: 'titles',
      title: 'Filter färger',
    },
  ],
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      group: 'card',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'descriptionText',
              title: 'Beskrivningstext',
              type: 'text',
              description: 'Huvudtexten som visas högst upp i kortet.', 
            },
            { 
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
             },
            { name: 'url', title: 'Webbadress (t.ex. /integritetspolicy)', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'eyebrow',
      title: 'Beskrivningstext',
      type: 'text',
      description: 'Huvudtexten som visas högst upp i kortet.',
    }),

    // 2. Reglage för att dölja/visa delar (Booleans)
    
  ],
})