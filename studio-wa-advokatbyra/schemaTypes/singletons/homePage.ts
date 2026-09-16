import { defineType, defineField, defineArrayMember } from 'sanity'


export const homePage = defineType({
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
    {
      name: 'seo',
      title: 'Global SEO'
    }
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
          title: 'Rubrik',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'tjansterEyebrow', 
          title: 'ögonbryn',
          type: 'eyebrow',
        },
        {
          name: 'tjansterText',
          title: 'Tjänster Text',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'tjansterCta',
          title: 'Tjänster CTA knapp',
          type: 'button'
        },
        defineField({
          name: "services",
          title: "Utvalda Rättsområden",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "service" }],
              options: {
                disableNew: true,
              },
            },
          ],
          validation: (rule) => rule.unique(),
        }),
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
          title: 'Rubrik',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'employeeEyebrow', 
          title: 'ögonbryn',
          type: 'eyebrow',
        },
        {
          name: 'employeeText', 
          title: 'Medarbetare text',
          type: 'text'
        },
        defineField({
          name: "teamMembers",
          title: "Medarbetare",
          type: "array",
          description:
            "Välj vilka medarbetare som ska visas och dra dem till önskad ordning.",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "employee" }],
              options: {
                disableNew: true,
              },
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).unique(),
        }),
      ],
    }),
    defineField({ 
      name: 'contactSection', 
      title: 'Kontakt',
      group: 'homeContact',
      type: 'object',
      fields: [
        {
          name: 'contactTitle', 
          title: 'Rubrik',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'contactEyebrow', 
          title: 'ögonbryn',
          type: 'eyebrow',
        },
        {
          name: 'contactText', 
          title: 'Kontakt text',
          type: 'text'
        },
        {
          name: 'contactCta',
          title: 'Knappdetaljer',
          type: 'button'
        }
      ],
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
      title: "homeTitle",
    },
  },
})