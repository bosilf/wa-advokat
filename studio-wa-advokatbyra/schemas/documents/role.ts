import { TagIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const role = defineType({
  name: 'role',
  title: 'Yrkestitlar',
  type: 'document',
  icon: TagIcon,

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
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'colorPicker',
      title: 'välj färg',
      type: 'color',
      validation: Rule => Rule.required(),
    }),
  ],
})