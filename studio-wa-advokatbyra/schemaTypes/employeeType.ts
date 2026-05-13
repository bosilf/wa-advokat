import {defineField, defineType} from 'sanity'

export const employeeType = defineType({
  name: 'employee',
  title: 'Medarbetare',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Namn',
      type: 'string',
      description: 'För- och Efternamn',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Länk',
      type: 'slug',
      description: 'Klicka på "Generate" knappen till höger. Det skapar automatiskt en länk till medarbetarens personliga sida.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Yrkestitel',
      type: 'array',
      description: 'Välj medarbetarens yrkestitlar. Minst en titel, max två titlar!',
      of: [
        {
          type: 'reference',
          to: [{ type: 'role' }],
          options: {
            disableNew: true
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(2),
    }),
    defineField({
      name: 'number',
      title: 'Mobilnummer',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'email',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'educationList',
      title: 'Utbildningar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'school', title: 'Skola/Utbildning', type: 'string' },
            { 
              name: 'yearStart', 
              title: 'År Start', 
              type: 'date', 
              options: { dateFormat: 'YYYY' } 
            },
            { 
              name: 'yearEnd', 
              title: 'År Avklarat', 
              type: 'date', 
              options: { dateFormat: 'YYYY' } 
            },
          ],
          preview: {
            select: {
              title: 'school',
              subtitle: 'year start',
            }
          }
        }
      ]
    }),
    defineField({
      name: 'image',
      title: 'Porträtt',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativ text',
        }
      ]
    }),
    defineField({
      name: 'bio',
      title: 'Om mig',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
