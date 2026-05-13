import { defineType, defineField } from 'sanity'

export const roleType = defineType({
  name: 'role',
  title: 'Yrkestitlar',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Yrkestitel',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
    }),
  ],
})