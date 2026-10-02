import { defineArrayMember, defineField, defineType } from "sanity"

export const redirects = defineType({
  name: 'redirects',
  type: 'object',
  fields: [
    defineField({
      name: 'oldLinks',
      title: 'Gamla Länkar',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'redirectItem',
          type: 'string',
          title: 'Gammal länk'
        })
      ]
    })
  ]
})