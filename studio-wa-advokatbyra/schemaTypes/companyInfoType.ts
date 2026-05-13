import {defineField, defineType} from 'sanity'

export const companyInfoType = defineType({
  name: 'company',
  title: 'WA Advokat Info',
  type: 'document',
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Namn',
      type: 'string', 
    }),
    defineField({ 
      name: 'adress', 
      title: 'Företagsadress',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'adressDetails',
          title: 'Adress Detaljer',
          fields: [
            {
              name: 'street', 
              title: 'gatuadress',
              type: 'string',
            },
            {
              name: 'postAdress', 
              title: 'postadress',
              type: 'string',
            },
            {
              name: 'postNumber', 
              title: 'postnummer',
              type: 'number',
            },
            {
              name: 'country', 
              title: 'Land',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({ 
      name: 'orgNumber', 
      type: 'string', 
      title: 'Organisationsnummer'
    }),
    defineField({ 
      name: 'phone', 
      type: 'number',
      title: 'Företag Telefon' 
    }),
    defineField({ 
      name: 'email', 
      type: 'email',
      title: 'Företagsemail' 
    }),
  ],
})