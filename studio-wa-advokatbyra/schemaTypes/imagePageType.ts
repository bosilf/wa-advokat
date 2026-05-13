import {defineField, defineType} from 'sanity'

export const imagePageType = defineType({
  name: 'pageimage',
  title: 'Bilder till sidorna',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Sida',
      type: 'string',
      description: 'Välj vilken sida denna bild ska tillhöra',
      options: {
        list: [
          {title: 'Medarbetare', value: 'medarbetare'},
          {title: 'Juridikkurser', value: 'juridikkurser'},
          {title: 'Startsida', value: 'home'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageColor',
      title: 'Sidans färg',
      type: 'string',
      options: {
        list: [
          {title: 'Blå (Medarbetare)', value: '#8AA2BD'},
          {title: 'Grön (Kurser)', value: '#2D5A27'},
          {title: 'Mörkgrå', value: '#333333'},
        ],
      },
      initialValue: '#8AA2BD', // Sätter standardfärgen automatiskt
    }),
    defineField({
      name: 'image',
      title: 'Sidobild',
      type: 'image',
      description: 'Bild på hemsidan',
      validation: (rule) => rule.required(),
    }),
  ]
})
