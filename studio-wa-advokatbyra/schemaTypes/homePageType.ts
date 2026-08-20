import { defineType, defineField } from 'sanity'
import { CogIcon, TagIcon, UserIcon, HomeIcon, DocumentIcon } from '@sanity/icons'


export const homePageType = defineType({
  name: 'home',
  title: 'Förstasidan',
  type: 'document',
  

  groups: [
    {
      name: 'homeIntros',
      title: 'Intro',
    },
    {
      name: 'homeTjanster',
      title: 'Tjänster',
    },
    {
      name: 'homeEmployees',
      title: 'Medarbetare',
    },
    {
      name: 'homeContact',
      title: 'Kontakt',
    },
  ],

  fields: [
    defineField({
      name: 'homeTitle',
      title: 'Förstasidan huvudtitel',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'homeEyebrow',
      title: 'Förstasidan eyebrow',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({ 
      name: 'introSection', 
      title: 'Intro',
      group: 'homeIntros',
      type: 'object',
      fields: [
        {
          name: 'introTitle', 
          title: 'Titel',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'introText',
          title: 'Intro Text',
          type: 'array',
          of: [{type: 'block'}],
        },
      ],
    }),
    defineField({ 
      name: 'tjansterSection', 
      title: 'Tjänster',
      group: 'homeTjanster',
      type: 'object',
      fields: [
        {
          name: 'tjansterTitle', 
          title: 'Titel',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'tjansterEyebrow', 
          title: 'ögonbryn',
          type: 'string',
        },
        {
          name: 'tjansterText',
          title: 'Tjänster Text',
          type: 'array',
          of: [{type: 'block'}],
        },
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
    defineField({ 
      name: 'employeeSection', 
      title: 'Medarbetare',
      group: 'homeEmployees',
      type: 'object',
      fields: [
        {
          name: 'employeeTitle', 
          title: 'Titel',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'employeeEyebrow', 
          title: 'ögonbryn',
          type: 'string',
        },
        {
          name: 'employeeText', 
          title: 'Tjänster text',
          type: 'text'
        },
      ],
    }),
    defineField({
      name: 'servicesCard',
      title: 'Tjänstekort (Card Container)',
      type: 'cardContainer',
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
  },
})