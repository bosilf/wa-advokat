import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const employee = defineType({
  name: 'employee',
  title: 'Medarbetare',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'firstName',
      title: 'Förnamn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Efternamn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Länk (Slug)',
      type: 'slug',
      description: 'Klicka på "Generate" för att skapa länken baserat på för- och efternamn.',
      options: {
        // Genererar länken automatiskt baserat på båda fälten (t.ex. johan-persson)
        source: (doc) => `${doc.firstName} ${doc.lastName}`,
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
      description: 'Använd bara siffror, inga specialtecken',

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
        
          options: {
            collapsible: true,
            collapsed: false,
          },
        
          fields: [
            { name: 'school', title: 'Skola', type: 'string' },
            { name: 'education', title: 'Utbildning', type: 'string' },
        
            {
              name: 'yearStart',
              title: 'År Start',
              type: 'date',
              options: { dateFormat: 'YYYY' },
            },
        
            {
              name: 'yearEnd',
              title: 'År Avklarat',
              type: 'date',
              options: { dateFormat: 'YYYY' },
            },
          ],
        
          preview: {
            select: {
              school: 'school',
              education: 'education',
              yearStart: 'yearStart',
              yearEnd: 'yearEnd',
            },
        
            prepare({ school, education, yearStart, yearEnd }) {
              return {
                title: education || 'Utbildning',
                subtitle: `${school || ''} (${yearStart?.slice(0,4) || '?'}–${yearEnd?.slice(0,4) || 'Pågående'})`,
              }
            },
          },
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
          description: 'Beskriv bilden för SEO och tillgänglighet. Exempel: "Porträtt av Anna Svensson, advokat på WA Advokatbyrå".',
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
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      // 🟢 FIXAT: Denna pil (->) följer referensen till 'role' och plockar ut dess titel automatiskt för förhandsvisningen!
      media: 'image',
    },
    prepare(selection) {
      const { firstName, lastName, media } = selection
      return {
        title: `${firstName || ''} ${lastName || ''}`.trim() || 'Namnlös medarbetare',
        media: media,
      }
    },
  },
})
